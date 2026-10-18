// Checks the built site in dist/: meta descriptions, absolute URLs and leftovers. Usage: npm run build && npm run check:meta
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ORIGIN = 'https://jaimeimhof.ch';
// Namespace identifiers in the sitemap XML, not links.
const XML_NAMESPACES = /^http:\/\/www\.(sitemaps\.org|w3\.org|google\.com\/schemas)/;
const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (['.html', '.xml', '.txt'].includes(extname(path))) files.push(path);
  }
};
walk('dist');

const errors = [];
const forbidden = [/pages\.dev/i, /framer/i, /localhost/i, /mailto:mailto/i, /Jahre alt/];
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const re of forbidden) if (re.test(text)) errors.push(`${file}: enthält ${re}`);
  if (!file.endsWith('.html')) {
    for (const url of text.match(/https?:\/\/[^\s<"]+/g) ?? []) {
      if (!url.startsWith(ORIGIN) && !XML_NAMESPACES.test(url)) errors.push(`${file}: fremde URL ${url}`);
    }
    continue;
  }
  const meta = (attr, key) => text.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1];
  const description = meta('name', 'description');
  if (!description) errors.push(`${file}: keine Meta-Description`);
  else if (description.length > 155) errors.push(`${file}: Description ${description.length} Zeichen (max. 155)`);
  const canonical = text.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  for (const [label, value] of [['canonical', canonical], ['og:url', meta('property', 'og:url')], ['og:image', meta('property', 'og:image')], ['twitter:image', meta('name', 'twitter:image')]]) {
    if (!value?.startsWith(ORIGIN)) errors.push(`${file}: ${label} beginnt nicht mit ${ORIGIN}: ${value}`);
  }
}

console.log(`${files.length} Dateien geprüft`);
if (errors.length) { console.log(errors.join('\n')); process.exitCode = 1; } else console.log('OK: Descriptions, URLs und Reste in Ordnung');
