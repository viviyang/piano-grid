import { readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { PUBLIC_ROUTES } from './site-routes.mjs';
// Server/build-only source access. Reading a master object never authorizes its route.
export const authorizedURLs = PUBLIC_ROUTES;
export const locallyAvailableURLs = new Set(authorizedURLs);
export function readMaster() { return JSON.parse(readFileSync(resolve('docs/content/site-master/page-content.master.json'), 'utf8')); }
export function readAuthorizedPage(url) {
    if (!authorizedURLs.includes(url))
        throw new Error(`Unauthorized route: ${url}`);
    const master = readMaster(), page = master.pages[url];
    if (!page || !Array.isArray(page.blocks) || !page.data)
        throw new Error(`Missing core page data: ${url}`);
    return { page, master };
}
export function sourceAssetPath(url, relative) {
    const base = resolve('docs/content/site-master', ['/chords', '/chords/a-minor'].includes(url) ? 'preserved-chords' : '');
    if (!relative.startsWith('assets/') || relative.includes('\\') || relative.includes('..') || relative.includes(':'))
        throw new Error('Invalid asset path');
    const target = resolve(base, relative);
    if (!target.startsWith(base + sep))
        throw new Error('Asset escapes source root');
    return target;
}
