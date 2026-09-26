"""Same-snapshot TDH and internal-link audit. Python standard library only.

Live mode fetches every sitemap URL from one base URL. Offline mode inspects
rendered build HTML and reports missing dynamic pages as incomplete, not orphans.
Main-content directory links are kept; global menus and breadcrumbs are separate.
"""
import argparse
from collections import deque
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://pianogrid.com'
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
AUDIT_COPY = re.compile(r'competitor family coverage|source ledger|Source record:|Checked for:|source-scoped|(?:N2[A-D]|AM|AN)-[A-Z0-9-]+|turn\d+(?:view|search)\d+|Preserved approved mapping|original exact-version task|independent fingering dataset is authorized', re.I)


def internal_path(href, source):
    url = urlsplit(urljoin(ORIGIN + source, href))
    if url.scheme not in ('http', 'https') or url.hostname not in ('pianogrid.com', 'www.pianogrid.com'):
        return None
    return url.path.rstrip('/') or '/'


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.links, self.title, self.h1, self.text = [], [], [], []
        self.meta, self.canonical = {}, []
        self.main_seen = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        parents = [name for name, _ in self.stack]
        ignored = any(name in ('script', 'style', 'template') for name in parents)
        in_main = 'main' in parents or tag == 'main'
        if tag == 'main':
            self.main_seen = True
        if not ignored:
            if tag == 'meta' and attrs.get('name'):
                self.meta[attrs['name'].lower()] = attrs.get('content', '')
            if tag == 'link' and 'canonical' in attrs.get('rel', '').split():
                self.canonical.append(attrs.get('href', ''))
            if tag == 'h1':
                self.h1.append('')
            if tag == 'a' and attrs.get('href'):
                breadcrumb = any('breadcrumb' in values.get('aria-label', '').lower() for _, values in self.stack)
                kind = 'chrome' if not in_main or breadcrumb else 'directory' if 'nav' in parents else 'content'
                self.links.append((attrs['href'], kind))
        if tag not in VOID:
            self.stack.append((tag, attrs))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        names = [name for name, _ in self.stack]
        if any(name in ('script', 'style', 'template') for name in names):
            return
        if 'title' in names and 'head' in names:
            self.title.append(data)
        if 'h1' in names and self.h1:
            self.h1[-1] += data
        if 'main' in names:
            self.text.append(data)


def parse_page(html):
    page = PageParser()
    page.feed(html)
    return page


def sitemap_paths(xml):
    root = ET.fromstring(xml)
    if root.tag.rsplit('}', 1)[-1] != 'urlset':
        raise ValueError('Expected a URL sitemap, not a sitemap index. Supply the site URL sitemap.')
    return sorted({internal_path(node.text or '', '/') for node in root.iter()
                   if node.tag.rsplit('}', 1)[-1] == 'loc'} - {None})


def shortest_paths(graph):
    distance, queue = {'/': 0}, deque(['/'])
    while queue:
        source = queue.popleft()
        for target in graph.get(source, set()):
            if target not in distance:
                distance[target] = distance[source] + 1
                queue.append(target)
    return distance


def link_rows(pages, paths):
    inbound = {path: {kind: set() for kind in ('chrome', 'directory', 'content')} for path in paths}
    graphs = [{}, {}]
    for source, page in pages.items():
        for href, kind in page.links:
            target = internal_path(href, source)
            if target not in inbound or target == source:
                continue
            inbound[target][kind].add(source)
            graphs[0].setdefault(source, set()).add(target)
            if kind != 'chrome':
                graphs[1].setdefault(source, set()).add(target)
    all_depth, main_depth = map(shortest_paths, graphs)
    result = {}
    for path, by_kind in inbound.items():
        main = by_kind['content'] | by_kind['directory']
        result[path] = {
            'chrome_source_pages': sorted(by_kind['chrome']),
            'directory_source_pages': sorted(by_kind['directory']),
            'content_source_pages': sorted(by_kind['content']),
            'main_source_count': len(main),
            'click_depth': all_depth.get(path),
            'main_only_depth': main_depth.get(path),
            'link_state': 'HAS_MAIN_LINK' if main else 'CHROME_ONLY' if by_kind['chrome'] else 'NO_OBSERVED_INLINK',
        }
    return result


def fetch_text(url):
    request = Request(url, headers={'User-Agent': 'PianoGrid-Owner-Audit/1.0'})
    with urlopen(request, timeout=25) as response:
        if response.status != 200:
            raise ValueError(f'HTTP {response.status}')
        return response.read().decode('utf-8'), dict(response.headers.items())


def corrected_description(path, text):
    if re.fullmatch(r'/chords/[a-g](?:-flat|-sharp)?-(?:major|minor)', path):
        return re.sub('compare three inversions', 'compare root position and two inversions', text, flags=re.I)
    return text


def run(args):
    records = json.loads(args.targets.read_text(encoding='utf-8'))
    xml = args.sitemap.read_text(encoding='utf-8') if args.sitemap else fetch_text(args.base_url.rstrip('/') + '/sitemap.xml')[0]
    paths = sitemap_paths(xml)
    pages, failures, headers = {}, {}, {}

    def load(path):
        try:
            if args.html_dir:
                file = args.html_dir / ('index.html' if path == '/' else path[1:] + '.html')
                html, response_headers = file.read_text(encoding='utf-8'), {}
            else:
                html, response_headers = fetch_text(args.base_url.rstrip('/') + path)
            page = parse_page(html)
            if not page.main_seen:
                raise ValueError('No main content landmark in response')
            return path, page, response_headers, None
        except Exception as error:
            return path, None, {}, str(error)

    with ThreadPoolExecutor(max_workers=4) as pool:
        for path, page, response_headers, error in pool.map(load, paths):
            if error:
                failures[path] = error
            else:
                pages[path], headers[path] = page, response_headers
    links = link_rows(pages, paths)
    rows = []
    for record in records:
        path = record['url']
        page = pages.get(path)
        issues = []
        title = ''.join(page.title).strip() if page else None
        description = page.meta.get('description') if page else None
        h1 = [' '.join(text.split()) for text in page.h1] if page else []
        if not page:
            issues.append('HTML_NOT_OBSERVED')
        else:
            if title != record['title_after']:
                issues.append('TITLE_CHANGED')
            if description != corrected_description(path, record['description_after']):
                issues.append('DESCRIPTION_CHANGED_OUTSIDE_APPROVED_CORRECTION')
            if h1 != [record['h1_after']]:
                issues.append('H1_MISMATCH')
            if page.canonical != [ORIGIN + path]:
                issues.append('CANONICAL_MISMATCH')
            robots = page.meta.get('robots', '') + headers[path].get('X-Robots-Tag', '') + page.meta.get('googlebot', '')
            if re.search(r'noindex|none', robots, re.I):
                issues.append('NOINDEX')
            if AUDIT_COPY.search(' '.join(page.text)):
                issues.append('PUBLIC_AUDIT_WORDING')
        rows.append({'id': record['id'], 'path': path, 'title': title, 'description': description,
                     'h1': h1, 'issues': issues, 'links': links.get(path), 'gsc': 'UNKNOWN'})
    report = {
        'observed_at': datetime.now(timezone.utc).isoformat(),
        'scope': 'same-build HTML' if args.html_dir else 'single-run sitemap crawl',
        'base_url': args.base_url,
        'sitemap_urls': len(paths), 'observed_html': len(pages),
        'graph_complete_for_sitemap': not failures,
        'fetch_failures': failures,
        'target_count': len(rows),
        'target_failures': sum(bool(row['issues']) for row in rows),
        'target_main_link_missing': sum(row['links'] is not None and row['links']['main_source_count'] == 0 for row in rows),
        'notes': ['Link counts count source pages, not repeated anchors.',
                  'Directory links inside main are not global navigation and are not claimed to be editorial prose.',
                  'Depth is measured with BFS. Missing paths are unknown/unreachable in this observed graph.',
                  'No fixed inlink-count threshold is a Google indexing requirement.',
                  'HTTP, HTML and internal links do not establish Google indexing or ranking.'],
        'rows': rows,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({key: report[key] for key in ['sitemap_urls', 'observed_html', 'graph_complete_for_sitemap', 'target_count', 'target_failures', 'target_main_link_missing']}, indent=2))
    return 1 if report['target_failures'] or (failures and not args.allow_incomplete) else 0


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url', default='http://localhost:3000')
    parser.add_argument('--targets', type=Path, default=ROOT / 'docs/reviews/url-audit-141/CHANGE_MATRIX.json')
    parser.add_argument('--sitemap', type=Path)
    parser.add_argument('--html-dir', type=Path)
    parser.add_argument('--allow-incomplete', action='store_true')
    parser.add_argument('--output', type=Path, default=ROOT / 'checks/url-audit-final/HTML_AUDIT.json')
    sys.exit(run(parser.parse_args()))
