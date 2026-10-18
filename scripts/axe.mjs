// Runs axe-core on the main pages (mobile and desktop). Needs `npm run preview` running.
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const pages = ['/', '/projects/', '/projects/ipa-derendinger/', '/projects/event-foto-blessthun/', '/about/', '/contact/', '/datenschutz/', '/404/'];
const browser = await chromium.launch({ channel: 'chrome' });
let total = 0;

for (const width of [390, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
    total += result.violations.length;
    console.log(`${width}px ${path}: ${result.violations.length} Verstösse`);
    for (const v of result.violations) {
      console.log(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length}x)`);
      for (const n of v.nodes.slice(0, 3)) console.log(`      ${n.target.join(' ')}`);
    }
  }
  await context.close();
}

await browser.close();
process.exitCode = total ? 1 : 0;
