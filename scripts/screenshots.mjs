// Full-page screenshots at 390, 768 and 1440 px. Needs `npm run preview` running.
// Usage: node scripts/screenshots.mjs [outDir]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const out = process.argv[2] ?? 'screenshots';
const pages = ['/', '/projects/', '/projects/ipa-derendinger/', '/projects/tunis-streetlife/', '/about/', '/contact/'];
const widths = [390, 768, 1440];

mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });

for (const width of widths) {
  // Reduced motion shows all reveal-on-scroll content in a full-page shot.
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    // Scroll through the page so lazy images load before the full-page shot.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
    const name = (path === '/' ? 'start' : path.replaceAll('/', '-').replace(/^-|-$/g, '')) + `-${width}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    console.log(name);
  }
  await context.close();
}

await browser.close();
