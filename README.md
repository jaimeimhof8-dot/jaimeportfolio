# Portfolio Jaime Imhof

Statische Portfolio-Website von Jaime Imhof (Mediamatiker EFZ, Thun), gebaut mit Astro 7. Live unter https://jaimeimhof.ch.

Kein Tracking, keine Cookies, keine externen Schriften (alle über `@fontsource` selbst gehostet). YouTube-Videos laden erst nach einem Klick (`youtube-nocookie.com`). Die Seite braucht ausser kleinen Inline-Skripten kein JavaScript-Framework.

## Seiten

| Pfad | Datei | Inhalt |
|---|---|---|
| `/` | `src/pages/index.astro` | Hero (zwei wechselnde Fotos, Scrollen öffnet den grauen Namensblock), vier Arbeiten, «Wer bin ich», Kontakt-Abschluss |
| `/projects/` | `src/pages/projects/index.astro` | alle sechs Arbeiten, eine Karte pro Zeile |
| `/projects/<slug>/` | `src/pages/projects/[slug].astro` | Projektseite: Bildpaar, Meta (Branche, Jahr, Kunde, Rolle), Text, Video oder Galerie, «Weitere Projekte» |
| `/about/` | `src/pages/about.astro` | Über mich mit Bildkomposition, «Werdegang und Tools», Lebenslauf-Download |
| `/contact/` | `src/pages/contact.astro` | E-Mail (mit Kopieren-Knopf), Telefon, Ort, Social-Links |
| `/datenschutz/` | `src/pages/datenschutz.astro` | kurze Datenschutzerklärung (keine Cookies, kein Tracking, YouTube erst nach Klick) |
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
npm run check:meta     # dist/: Descriptions höchstens 155 Zeichen, canonical/og-URLs auf jaimeimhof.ch, keine Reste (vorher npm run build)
npm run check:a11y     # axe-core, 7 Seiten, 390 und 1440 px
npm run check:smoke    # Interaktionstests (Hero, Menü, YouTube, Kontaktdaten, 404, robots.txt)
npm run screenshots    # Vollseiten-Screenshots (390, 768, 1440 px) nach screenshots/
```

Der Smoke-Test läuft zusätzlich mit sichtbarer, klassischer Scrollleiste (Windows/Linux) und schlägt bei seitlichem Überlauf fehl. axe läuft mit `reducedMotion`, die Hero-Animation prüft keiner der Tests. Die bitte von Hand in Chrome ansehen.

## Aufbau

```
material/                 Bildquellen (Kopien, ohne EXIF/GPS), siehe material/INVENTAR.md
  site/                   Bilder der Seite, nach Bereich sortiert (hero, who, about, strip, ipa, ...)
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
- **Raster:** `--u` ist ein Design-Pixel bei 1440 px Breite. Desktop-Positionen skalieren damit mit dem Fenster, ab 810 px Breite gilt das Desktop-Layout. Der Wert wird in `Base.astro` aus der Breite ohne Scrollleiste gesetzt (`100vw` würde auf Windows 15 px Überlauf erzeugen).
- **Hero:** `src/pages/index.astro`. Die Sektion ist hoch, die Bühne klebt (`position: sticky`). Ein kleines Skript setzt beim Scrollen `--p` (Öffnung des grauen Blocks) und `--q` (Name erscheint). Auf dem Handy ist die Sektion 360svh hoch, damit der Name nach dem Öffnen länger stehen bleibt. Bei `prefers-reduced-motion` gibt es keine Animation.
- **Navigation:** Über dem Hero hat die Leiste keinen Hintergrund. Jedes Element prüft, ob ein Foto oder der graue Block dahinter liegt, und wird weiss oder schwarz.

## Inhalte ändern

### Texte und Kontaktdaten

Alles steht in `src/config.ts`: Name, E-Mail, Telefon, Ort, Instagram, LinkedIn, Navigation, About-Text, Einleitungen. Einige Einträge dort (Werdegang, Tools, Sprachen, Eckdaten, `cvUrl`) werden aktuell noch nicht angezeigt.

- Strasse: erscheint nur, wenn `showStreetAddress: true` und `streetAddress` ausgefüllt ist (Standard: aus).
- Lebenslauf: PDF ohne Geburtsdatum und Strasse nach `public/` legen und `cvUrl` setzen.

### Ein Projekt ergänzen

1. Bilder nach `material/site/<projekt>/` oder `material/projects/<slug>/` kopieren (lange Kante höchstens 2400 px, EXIF und GPS entfernen).
2. In `src/data/projects.ts` die Bilder importieren und einen Eintrag in `projects` anlegen:

```ts
{
  slug: 'beispiel',
  title: 'Beispiel',
  seoTitle: 'Beispiel, Kurzbeschreibung',   // Seitentitel vor « | Jaime Imhof»
  beschreibung: 'Meta-Description, höchstens 155 Zeichen.',
  category: 'Video',            // 'Video' oder 'Fotografie'
  industry: 'Sport',
  year: '2026',                 // oder ein Zeitraum wie '2024 – heute'
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

Bilder immer mit Alt-Text beschreiben, ohne Namen von Personen. Das Titelbild des Projekts wird beim Build automatisch als Open-Graph-Bild (1200 × 630) erzeugt. `npm run check:meta` prüft die Länge der Beschreibung.

## Deployment und Hosting

Die Seite ist statisch (`dist/`). Sie läuft hinter Cloudflare (Antwort-Header `Server: cloudflare`). Ob es Cloudflare Pages oder Workers ist, lässt sich von aussen nicht sagen, und im Projekt liegt keine Hosting-Konfiguration. Darum ist hier nichts eingerichtet, was nur geraten wäre.

Build-Einstellungen: Build command `npm run build`, Output directory `dist`, Umgebungsvariable `NODE_VERSION` = `22`.

**Von Jaime im Hosting-Dashboard einzustellen: `www` auf die Hauptdomain weiterleiten.** Stand 18.10.2026 antwortet `https://www.jaimeimhof.ch/` mit 200 und zeigt dieselbe Seite wie `https://jaimeimhof.ch/`. Doppelte Adressen verwässern die Suche. In Cloudflare: Domain → Rules → Redirect Rules → Eintrag anlegen:

- Wenn: Hostname ist gleich `www.jaimeimhof.ch`
- Dann: dynamische Weiterleitung auf `concat("https://jaimeimhof.ch", http.request.uri.path)`, Statuscode 301, Query-String erhalten.

Danach `curl -sI https://www.jaimeimhof.ch/about/` prüfen: Erwartet `301` mit `location: https://jaimeimhof.ch/about/`.

Die Domain steht in `SITE_URL` (`src/config.ts`). Daraus entstehen Canonical-Links, Sitemap, `robots.txt` und Open-Graph-URLs. Bei einem Domainwechsel dort ändern und neu bauen.

Das Jahr im Footer wird beim Build festgelegt: zum Jahreswechsel neu bauen.

## Von Jaime zu bestätigen

Diese Details stehen in den Projekttexten, ohne dass sie in Jaimes Unterlagen belegt sind. Sie bleiben stehen, bis sie bestätigt oder korrigiert sind:

- **GPMC:** «Open-Air-Anlass», «Ruhige Kameraführung statt schneller Schnitte», «Abendstimmung», «Video- und Fotoproduktion». Ausserdem die Zuordnung von «Eventvideo_Youth» zum Kunden GPMC.
- **Capoeira (CAPU):** «Bewegung stand im Fokus, schnelle Schnitte, viel Nahaufnahme», «Video- und Fotoproduktion». Was CAPU ist, steht nirgends.
- **Tunis Streetlife:** «Street-Fotografie zwischen Alltag und Architektur», «entstanden auf einer Reise».
- **Tour de Suisse:** «als Zuschauer dabei», Jahr 2026.
- **Rolle** pro Projekt (Feld `role`): nur aus den Projekttexten abgeleitet.
- **Kamera:** Der Lebenslauf nennt «Sony Alpha 7». Frühere Texte sagten «Sony a7 III». Welches Modell stimmt?

Aus dem Lebenslauf belegt: IPA (Idee bis Schnitt allein, Motion Design in After Effects, Farbkorrektur in DaVinci Resolve), BlessThun («jeden Monat ein Anlass, rund 24 bisher, meist abends und am Wochenende», Instagram-Content).

## Fragen für die Projektseiten

Die Felder `ausgangslage`, `vorgehen` und `ergebnis` in `src/data/projects.ts` sind angelegt und leer. Sie erscheinen erst, wenn sie ausgefüllt sind. Folgendes muss Jaime pro Projekt beantworten (kurz, 1–2 Sätze):

- **Ausgangslage:** Was war die Aufgabe? Wer hat sie gestellt, und was sollte erreicht werden?
- **Vorgehen:** Was hast du genau gemacht (Planung, Dreh, Schnitt, Licht, Ton)? Womit?
- **Ergebnis:** Wie ging es aus? Wo lief das Video oder Bild, wie wurde es aufgenommen, gibt es Zahlen oder ein Feedback?

Gilt für: IPA, Event Video (GPMC), Event Fotografie (BlessThun), Capoeira (CAPU), Tunis Streetlife, Tour de Suisse.

## Datenschutz

`/datenschutz/` ist eine kurze, sachliche Erklärung und **kein Rechtstext einer Anwältin**. Sie nennt Cloudflare als Hosting (aus den Antwort-Headern der Live-Seite abgelesen), den YouTube-Einbettungs-Klick und den Kontakt per E-Mail. «Stand» steht im Kopf der Datei (`src/pages/datenschutz.astro`) und wird bei Änderungen angepasst.

## Offene Punkte

- **Weiterleitung `www` → Hauptdomain** im Hosting einstellen (siehe oben).
- **Hero auf dem Handy:** Haltephase des Namens (360svh) auf einem echten Handy mit kräftigem Wisch prüfen und die Höhe in `src/pages/index.astro` anpassen. Ob sie leer wirkt, lässt sich nur am Gerät beurteilen.
- **Pause-Taste** für Fotoschau und Fotostreifen gibt es nicht. Beide pausieren ausser Sicht und bei `prefers-reduced-motion`, aber nicht auf Wunsch.
- **Projekttexte** ausfüllen (siehe «Fragen für die Projektseiten»).
- **Reel `reels/01-gym.{jpg,mp4}`** ist aktuell nirgends eingebunden, bleibt aber bewusst im Repo. Es zeigt eine Person, deren Einwilligung unbestätigt ist: erst klären, bevor es gezeigt wird.
- **Lokaler Branch `master`** enthält drei Commits, die nicht in `main` sind (alter Framer-Nachbau). Er wurde deshalb nicht gelöscht.

Frühere Stände: `SPRINT_LOG.md` ist das aktuelle Änderungsprotokoll. Die Version mit scrollgesteuertem Sonnenuntergang liegt im Git-Tag `sonnenuntergang-version`.
