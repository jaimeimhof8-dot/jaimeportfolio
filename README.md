# Portfolio Jaime Imhof

Statische Portfolio-Website von Jaime Imhof (Mediamatiker EFZ, Thun), gebaut mit Astro 7.
Gestaltung: Schweizer Editorial-Minimalismus. Kein Tracking, keine Cookies, keine externen Schriften, kein separates JavaScript-Bundle. YouTube lädt erst, wenn jemand ein Video startet (youtube-nocookie.com).

## Gestaltung in Kürze

- **Fläche:** eine dunkle Fläche `#111111`, Haarlinien `#2a2a2a`, 12er-Raster, keine Verläufe.
- **Typografie:** Inter Variable 700 für Titel (Laufweite −0.03em, Zeilenhöhe 0.95, Platz für Ä/Ö/Ü und Unterlängen). JetBrains Mono nur für technische Labels (11–13 px, Grossbuchstaben, +0.08em, tabellarische Ziffern).
- **Hero:** zweizeilige Headline „Jaime Imhof — Moving Image & Visual Design aus Thun.“, darunter drei Projektlinks und Metadaten (Ort, Ortszeit, Status, Kontakt). Passt ohne Scrollen auf 1440 × 900, 1280 × 720 und 390 × 844.
- **Hover-Vorschau:** Auf Geräten mit Maus oder Trackpad erscheint beim Überfahren eines Projekts sofort ein Vorschaubild, im Hero als Breitbild in der rechten Spalte, in Listen mitlaufend am Zeiger. Auf Touch-Geräten gibt es stattdessen statische Thumbnails; die Vorschau-Ebene existiert dort gar nicht und lädt nichts.
- **Fallstudien:** Projektseiten mit bis zu fünf Blöcken: Ausgangslage, Meine Rolle, Technisches Setup (Mono-Spec-Kasten), Workflow, Ergebnis. Fehlende Blöcke werden weggelassen.
- **Schreib mir ↗:** schwebender, leicht magnetischer Knopf unten rechts. Er erscheint nach dem ersten Bildschirm und blendet über Kontaktbereichen und dem Footer aus.

## Starten

Voraussetzung: Node.js 22.22 oder neuer.

```bash
npm install
npm run dev        # Entwicklung, http://localhost:4321
npm run build      # fertige Seite nach dist/
npm run preview    # gebaute Seite lokal ansehen
```

Prüfungen (für `check:a11y`, `check:smoke` und `screenshots` muss `npm run preview` laufen; benutzt den installierten Google Chrome):

```bash
npm run check          # Typen und Astro-Dateien
npm run check:links    # alle Links in dist/ (nach npm run build)
npm run check:a11y     # axe, 7 Seiten, 390 und 1440 px
npm run check:smoke    # 21 Interaktionstests (Hero, Hover, Fallstudie, Mobile, Filter, Lightbox, Reel, 404)
npm run screenshots    # Screenshots aller Hauptseiten nach screenshots/
```

## Aufbau

```
material/                 Bild- und Videoquellen (Kopien von G:\, siehe material/INVENTAR.md)
  about/                  Porträt, Aletschgletscher
  projects/<slug>/        Bilder pro Projekt
  reels/                  Kurzvideos 9:16
public/                   Favicon, Touch-Icon, og.jpg (Vorschaubild für geteilte Links)
scripts/                  Prüfskripte (Links, axe, Smoke-Test, Screenshots)
src/
  config.ts               ALLE Kontaktdaten, Links, Texte, Hero-Projekte, Zahlen
  content.config.ts       Felder der Projekte (Schema)
  content/projects/*.md   ein Projekt pro Datei
  components/
    Hero                  Headline, drei Projektlinks, Metadaten
    ProjectIndex          editoriale Projektliste mit Hover-Vorschau (Varianten hero und list)
    ContactSection        Kontaktblock (Startseite, About, Projektseiten) und Kontaktseite
    Reels                 Kurzvideos mit Pause- und Ton-Taste
    Gallery, YouTube, CopyEmail, FloatingCta, Header, Footer
  scripts/time.ts         Ortszeit Thun (ohne Netzwerkabfrage)
  layouts/Base.astro      Grundgerüst: SEO, Open Graph, JSON-LD, Skip-Link, Schrift-Preload
  pages/                  /, /projects/, /projects/[slug]/, /about/, /contact/, 404, robots.txt
  styles/global.css       Farben, Schriften, Raster, Labels, Buttons
```

Bilder werden beim Build automatisch als AVIF und WebP in passenden Grössen erzeugt.

## Ein Projekt ergänzen

1. Bilder nach `material/projects/<slug>/` kopieren (lange Kante höchstens 2400 px, Metadaten entfernen).
2. Datei `src/content/projects/<slug>.md` anlegen:

```md
---
title: Projektname
subtitle: Kleine Zeile über dem Titel # optional
category: Video # Video oder Foto (steuert den Filter)
branche: Sport
jahr: "2026"
kunde: Kundenname
rolle: Kamera, Schnitt, Grading
ausgangslage: Was der Kunde brauchte und warum. # optional
workflow: # optional, ein Schritt pro Zeile
  - Konzept und Storyboard
  - Dreh
  - Schnitt und Grading
ergebnis: Was am Ende herauskam, mit echten Zahlen. # optional
setup: # optional, Spec-Kasten
  - label: Kamera
    value: Sony a7 III
order: 5 # Reihenfolge
personal: false # true = als persönlich markiert
youtubeId: abc123XYZ # optional, ID aus dem YouTube-Link
cover: ../../../material/projects/<slug>/01.jpg
coverAlt: Was auf dem Titelbild zu sehen ist
gallery:
  - src: ../../../material/projects/<slug>/02.jpg
    alt: Was auf dem Bild zu sehen ist
draft: false # true = nicht veröffentlicht
---

Ein bis zwei Sätze als Einleitung.
```

Die drei Projekte im Hero stehen in `src/config.ts` unter `heroProjects` (Slugs in Reihenfolge).

## Kurzvideos (Reels)

In `material/reels/` pro Video drei Dateien mit gleichem Namen: `02-name.mp4` (9:16, H.264), `02-name.jpg` (Poster), `02-name.txt` (ein Satz Hook). Höchstens drei werden gezeigt. Ohne Videos verschwindet der Abschnitt.

```bash
ffmpeg -i original.mp4 -map_metadata -1 -vf "scale=720:-2" -c:v libx264 -crf 26 -c:a aac -b:a 96k -movflags +faststart material/reels/02-name.mp4
```

## Texte und Kontaktdaten ändern

Alles steht in `src/config.ts`: Name, Headline, E-Mail, Telefon, Ort, Instagram, LinkedIn, Navigation, About-Text, Zahlen, Werkzeuge, Sprachen.

- Strasse: wird nur gezeigt, wenn `showStreetAddress: true` und `streetAddress` ausgefüllt ist (Standard: aus).
- Lebenslauf: PDF ohne Geburtsdatum und Strasse nach `public/` legen und `cvUrl` setzen.
- Domain: `SITE_URL` anpassen (Sitemap, Canonical-Links, Vorschaubild).

## Deployment

### Cloudflare Pages (gratis)

1. Projekt auf GitHub hochladen (privates Repository reicht).
2. dash.cloudflare.com, Workers & Pages, Create, Pages, Connect to Git, Repository wählen.
3. Framework preset: Astro. Build command: `npm run build`. Output directory: `dist`.
4. Settings, Environment variables: `NODE_VERSION` = `22`.
5. Deploy. Die Seite ist danach unter `<projektname>.pages.dev` erreichbar; jeder Push baut neu.

### Netlify (Alternative)

1. app.netlify.com, Add new site, Import an existing project, Repository wählen.
2. Build command `npm run build`, Publish directory `dist`, Umgebungsvariable `NODE_VERSION` = `22`.

### Eigene Domain

1. Domain kaufen (zum Beispiel bei Infomaniak oder Hostpoint).
2. Cloudflare Pages: Custom domains, Domain eintragen, angezeigten CNAME beim Anbieter setzen. Netlify: Domain management, Add domain.
3. HTTPS kommt automatisch (bis zu einer Stunde).
4. `SITE_URL` in `src/config.ts` ändern, committen, pushen.

## Prüfergebnisse

Siehe `SPRINT_LOG.md` (Stand 16.10.2026): Build ohne Warnungen, `astro check` ohne Befund, axe 0 Verstösse, 21/21 Interaktionstests, Lighthouse Mobile 99–100 in allen Kategorien.

## Annahmen

- Porträt: `DSC01327.jpg` aus dem Bewerbungsordner (einziges gutes Porträt, nicht auf G:\).
- Capoeira: Zuordnung über `G:\C0216.mp4` bestätigt (CAPU-Logo im Bild); Galerie aus Standbildern dieses Clips.
- Tunis Streetlife: Ordner `G:\aktuell\tunesien`.
- BlessThun: Einwilligung für die öffentliche Nutzung liegt laut Jaime vor.
- Ausgeblendet (`draft: true`): Event Video (Zuordnung zu GPMC unbestätigt) und Tour de Suisse (Bilder fehlen).
- Die Version mit scrollgesteuertem Sonnenuntergang ist im Git-Tag `sonnenuntergang-version` gesichert.
- `SITE_URL` ist vorläufig `https://jaimeimhof.pages.dev`.

## Offene TODOs

1. **IPA-Titelbild:** Das aktuelle Bild ist das automatische YouTube-Vorschaubild. Ein gegradetes Standbild aus dem Film als `material/projects/ipa-derendinger/01.jpg` ersetzen. Es wird im Hero als Vorschau gezeigt und ist damit das wichtigste Bild der Seite.
2. **Fallstudien ergänzen:** Für Capoeira, BlessThun und Tunis Ausgangslage, Setup, Workflow und Ergebnis nachtragen (Felder siehe oben).
3. **Event Video:** bestätigen, dass „Eventvideo_Youth“ das GPMC-Projekt ist, dann `draft` entfernen und `kontext` ergänzen.
4. **Tour de Suisse:** Fotos aus dem Google-Fotos-Album nach `material/projects/tour-de-suisse/` legen, `cover` und `gallery` setzen, `draft` entfernen.
5. **CAPU:** im Feld `kontext` kurz erklären, was CAPU ist.
6. **Lebenslauf:** Version ohne Geburtsdatum und Strasse nach `public/`, `cvUrl` setzen.
7. **Domain:** `SITE_URL` nach dem Einrichten ändern.
8. **Kurzvideos:** bis zu zwei weitere Reels; Einwilligung der Person im Gym-Video bestätigen.
9. **Aletsch-Bild:** nur 1500 px breit, bei Gelegenheit höher aufgelöst ersetz
