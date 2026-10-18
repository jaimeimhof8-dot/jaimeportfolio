# Portfolio Jaime Imhof

Statische Portfolio-Website von Jaime Imhof (Mediamatiker EFZ, Thun), gebaut mit Astro 7. Nachbau der Framer-Seite `jaimeimhof.framer.website`.

Kein Tracking, keine Cookies, keine externen Schriften (alle über `@fontsource` selbst gehostet). YouTube-Videos laden erst nach einem Klick (`youtube-nocookie.com`). Die Seite braucht ausser kleinen Inline-Skripten kein JavaScript-Framework.

## Seiten

| Pfad | Datei | Inhalt |
|---|---|---|
| `/` | `src/pages/index.astro` | Hero (zwei wechselnde Fotos, Scrollen öffnet den grauen Namensblock), «Wer bin ich», vier Arbeiten, Kontakt-Abschluss |
| `/projects/` | `src/pages/projects/index.astro` | alle sechs Arbeiten, eine Karte pro Zeile |
| `/projects/<slug>/` | `src/pages/projects/[slug].astro` | Projektseite: Bildpaar, Meta (Branche, Jahr, Kunde, Rolle), Text, Video oder Galerie, «Weitere Projekte» |
| `/about/` | `src/pages/about.astro` | Über mich mit Bildkomposition |
| `/contact/` | `src/pages/contact.astro` | E-Mail (mit Kopieren-Knopf), Telefon, Ort, Formular |
| `/404` | `src/pages/404.astro` | Fehlerseite (noindex) |
| `/robots.txt`, `/sitemap-index.xml` | `src/pages/robots.txt.ts`, `@astrojs/sitemap` | werden beim Build erzeugt |

## Starten

Voraussetzung: Node.js 22.22 oder neuer (siehe `.node-version`).

```bash
npm install
npm run dev        # Entwicklung, http://localhost:4321 (oder: astro dev --background)
npm run build      # fertige Seite nach dist/
npm run preview    # gebaute Seite lokal ansehen
```

## Prüfungen

Die Skripte laufen gegen `http://localhost:4321` (anderer Port: Umgebungsvariable `BASE_URL`). Sie brauchen einen laufenden Dev- oder Preview-Server und den installierten Google Chrome.

```bash
npm run check          # Typen und Astro-Dateien (astro check)
npm run check:links    # alle Links und Bilder in dist/ (vorher npm run build)
npm run check:a11y     # axe-core, 7 Seiten, 390 und 1440 px
npm run check:smoke    # Interaktionstests (Hero, Menü, YouTube, Kontaktdaten, 404, robots.txt)
npm run screenshots    # Vollseiten-Screenshots (390, 768, 1440 px) nach screenshots/
```

Grenzen: Die Tests laufen in Playwright mit unsichtbarer Scrollleiste und `reducedMotion` bei axe. Probleme, die nur mit klassischer Windows-Scrollleiste oder mit der Hero-Animation auftreten, fangen sie nicht ab. Das bitte von Hand in Chrome prüfen.

## Aufbau

```
material/                 Bildquellen (Kopien, ohne EXIF/GPS), siehe material/INVENTAR.md
  framer/                 Bilder der Seite, nach Bereich sortiert (hero, who, about, strip, ipa, ...)
  projects/               zusätzliche Projektbilder
public/                   favicon.svg, apple-touch-icon.png, og.jpg (1200 × 630)
scripts/                  Prüfskripte (Links, axe, Smoke-Test, Screenshots)
src/
  config.ts               Name, Kontaktdaten, Links, Navigation, Texte, SITE_URL
  data/projects.ts        alle Projekte (Texte, Bilder, YouTube-IDs, Reihenfolge)
  layouts/Base.astro      Grundgerüst: SEO, Open Graph, JSON-LD, Skip-Link, Schrift-Preload
  components/             TopBar, Footer, ProjectGrid, ContactCta, CopyButton, YouTube
  styles/global.css       Farben, Schriften, Textstile, Pill-Knopf
UI_UX_AUDIT.md            letzter Design-Audit mit den umgesetzten Massnahmen
```

Bilder werden beim Build automatisch als AVIF und WebP in passenden Grössen erzeugt (`<Picture>` aus `astro:assets`).

## Gestaltung

- **Farben:** schwarzer Grund `#000`, helles Zinkgrau `#e4e4e7` für Text und den Hero-Block, gedämpftes Grau `#76767f` für Labels, Linien `#27272a`.
- **Schrift:** JetBrains Mono in Versalien für Titel und Labels, Poppins Light für Fliesstext.
- **Raster:** `--u` ist ein Framer-Pixel bei 1440 px Breite. Desktop-Positionen skalieren damit mit dem Fenster, ab 810 px Breite gilt das Desktop-Layout.
- **Hero:** `src/pages/index.astro`. Die Sektion ist hoch, die Bühne klebt (`position: sticky`). Ein kleines Skript setzt beim Scrollen `--p` (Öffnung des grauen Blocks) und `--q` (Name erscheint). Auf dem Handy ist die Sektion 360svh hoch, damit der Name nach dem Öffnen länger stehen bleibt. Bei `prefers-reduced-motion` gibt es keine Animation.
- **Navigation:** Über dem Hero hat die Leiste keinen Hintergrund. Jedes Element prüft, ob ein Foto oder der graue Block dahinter liegt, und wird weiss oder schwarz.

## Inhalte ändern

### Texte und Kontaktdaten

Alles steht in `src/config.ts`: Name, E-Mail, Telefon, Ort, Instagram, LinkedIn, Navigation, About-Text, Einleitungen. Einige Einträge dort (Werdegang, Tools, Sprachen, Eckdaten, `cvUrl`) werden aktuell noch nicht angezeigt.

- Strasse: erscheint nur, wenn `showStreetAddress: true` und `streetAddress` ausgefüllt ist (Standard: aus).
- Lebenslauf: PDF ohne Geburtsdatum und Strasse nach `public/` legen und `cvUrl` setzen.

### Ein Projekt ergänzen

1. Bilder nach `material/framer/<projekt>/` oder `material/projects/<slug>/` kopieren (lange Kante höchstens 2400 px, EXIF und GPS entfernen).
2. In `src/data/projects.ts` die Bilder importieren und einen Eintrag in `projects` anlegen:

```ts
{
  slug: 'beispiel',
  title: 'Beispiel',
  category: 'Video',            // 'Video' oder 'Fotografie'
  industry: 'Sport',
  year: '2026',
  client: 'Kundenname',
  role: 'Kamera, Schnitt',      // nur, was wirklich stimmt
  text: 'Kurzer Projekttext.',
  cover: { src: beispielCover, alt: 'Was auf dem Bild zu sehen ist' },
  second: { src: beispielZwei, alt: '...' },
  youtube: { id: 'abc123XYZ', poster: beispielPoster },   // optional, Video-Projekte
  gallery: [/* genau 4 Bilder */],                         // optional, Foto-Projekte
}
```

Die Reihenfolge im Array bestimmt die Reihenfolge auf der Arbeiten-Seite. Die Startseite zeigt die ersten vier (`featured`), «Weitere Projekte» die zwei nächsten.

Bilder immer mit Alt-Text beschreiben, ohne Namen von Personen.

## Deployment

Die Seite ist statisch (`dist/`) und läuft auf jedem Static Hosting, z.B. Cloudflare Pages oder Netlify.

1. Repository mit dem Hoster verbinden.
2. Build command: `npm run build`, Output directory: `dist`.
3. Umgebungsvariable `NODE_VERSION` = `22`.
4. Eigene Domain im Hoster eintragen, danach **`SITE_URL` in `src/config.ts` anpassen**, committen und pushen. Die Adresse steckt in Canonical-Links, Sitemap, `robots.txt` und Open-Graph-Bild.

## Offene Punkte

- `SITE_URL` ist noch der Platzhalter `https://jaimeimhof.pages.dev` (diese Domain existiert nicht). Echte Adresse eintragen.
- Kontaktformular öffnet nur das Mailprogramm (`mailto:`). Ein echtes Formular oder dessen Entfernung ist offen.
- Lebenslauf-PDF ohne Geburtsdatum und Strasse fehlt (`cvUrl`).
- Werdegang, Tools und Verfügbarkeit stehen in `src/config.ts`, sind aber nicht auf der Seite.
- Projekttexte sind kurz. Ausgangslage, Vorgehen und Ergebnis fehlen noch (Angaben von Jaime nötig).
- Alte, ungenutzte Dateien in `material/` aufräumen.

Frühere Stände: `SPRINT_LOG.md` beschreibt einen älteren Relaunch (inzwischen ersetzt) und ist nur noch Archiv. Die Version mit scrollgesteuertem Sonnenuntergang liegt im Git-Tag `sonnenuntergang-version`, falls vorhanden.
