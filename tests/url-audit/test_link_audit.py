import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('audit', Path(__file__).parents[2] / 'scripts/audit-url-141.py')
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)

class LinkAuditTests(unittest.TestCase):
    def test_directory_in_main_is_not_global_menu(self):
        page = audit.parse_page('<header><nav><a href="/x">X</a></nav></header><main><header><h1>Example</h1></header><nav class="sc-route-directory"><a href="/y">Y</a></nav><p><a href="/z">Z</a></p></main>')
        self.assertEqual(page.links, [('/x', 'chrome'), ('/y', 'directory'), ('/z', 'content')])
        self.assertEqual(page.h1, ['Example'])
    def test_script_markup_is_not_a_link(self):
        page = audit.parse_page('<main><script>const data = \'<a href="/fake">Fake</a>\';</script><style>a{color:red}</style><a href=\'/real\'>Real</a></main>')
        self.assertEqual(page.links, [('/real', 'content')])
        self.assertEqual(''.join(page.text), 'Real')
    def test_breadcrumb_is_separate_from_directory(self):
        page = audit.parse_page('<main><nav aria-label="Breadcrumb"><a href="/">Home</a></nav><nav aria-label="Related scales"><a href="/scales/f-major">F</a></nav></main>')
        self.assertEqual([kind for _, kind in page.links], ['chrome', 'directory'])
    def test_url_resolution(self):
        self.assertEqual(audit.internal_path('g-major#notes', '/scales/f-major'), '/scales/g-major')
        self.assertEqual(audit.internal_path('#notes', '/scales/f-major'), '/scales/f-major')
        self.assertEqual(audit.internal_path('https://www.pianogrid.com/scales/f-major/', '/'), '/scales/f-major')
        self.assertIsNone(audit.internal_path('https://example.com/f-major', '/'))
        self.assertIsNone(audit.internal_path('javascript:alert(1)', '/'))
    def test_bfs_measures_long_paths_and_shortcuts(self):
        graph = {'/': {'/a'}, '/a': {'/b'}, '/b': {'/c'}, '/c': {'/d'}, '/d': {'/e'}}
        self.assertEqual(audit.shortest_paths(graph)['/e'], 5)
        graph['/'].add('/d')
        self.assertEqual(audit.shortest_paths(graph)['/e'], 2)
    def test_source_counts_not_anchor_counts_and_no_self(self):
        pages = {'/': audit.parse_page('<main><a href="/x">X</a><a href="/x#n">X</a></main>'), '/x': audit.parse_page('<main><a href="#n">self</a></main>')}
        row = audit.link_rows(pages, ['/', '/x'])['/x']
        self.assertEqual(row['main_source_count'], 1)
        self.assertEqual(row['click_depth'], 1)
    def test_missing_page_does_not_gain_fabricated_depth(self):
        self.assertIsNone(audit.link_rows({}, ['/', '/missing'])['/missing']['click_depth'])
    def test_sitemap_index_rejected(self):
        with self.assertRaises(ValueError):
            audit.sitemap_paths('<sitemapindex><sitemap><loc>https://pianogrid.com/sitemap.xml</loc></sitemap></sitemapindex>')

if __name__ == '__main__':
    unittest.main()
