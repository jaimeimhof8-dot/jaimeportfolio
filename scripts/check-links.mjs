// Checks every href/src in dist/: internal targets must exist, external URLs must answer.
// Usage: npm run build && node scripts/check-links.mjs
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const dist = 'dist';
const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (extname(p) === '.html') files.push(p);
  }
};
walk(dist);

const internal = new Map();
const external = new Map();
const special = new Set();

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const [, attr, raw] of html.matchAll(/\s(href|src|srcset|poster|data-src|data-src-large|data-src-small|data-full)="([^"]+)"/g)) {
    const urls = attr === 'srcset' ? raw.split(',').map((s) => s.trim().split(/\s+/)[0]) : [raw];
    for (const url of urls) {
      if (url.startsWith('mailto:') || url.startsWith('tel:')) special.add(url);
      else if (/^https?:\/\//.test(url)) {
        if (!url.startsWith('https://jaimeimhof.pages.dev')) external.set(url, true);
      } else if (url.startsWith('/')) internal.set(url.split(/[?#]/)[0], file);
    }
  }
}

let failures = 0;
for (const [url, from] of internal) {
  const clean = decodeURIComponent(url);
  const target = clean.endsWith('/') ? join(dist, clean, 'index.html') : join(dist, clean);
  if (!existsSync(target)) {
    failures++;
    console.log(`FEHLT  ${url}  (in ${from})`);
  }
}
console.log(`Intern geprüft: ${internal.size}`);

for (const url of external.keys()) {
  let status;
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 link-check' } });
    status = res.status;
  } catch (e) {
    status = `Fehler: ${e.message}`;
  }
  const ok = typeof status === 'number' && status < 400;
  // Instagram and LinkedIn often block bots (429/999); they are listed for a manual check.
  if (!ok) failures++;
  console.log(`${ok ? 'OK    ' : 'PRÜFEN'} ${status}  ${url}`);
}

console.log('\nmailto:/tel: im Quelltext:');
for (const s of special) console.log(`  ${s}`);

process.exitCode = failures ? 1 : 0;
