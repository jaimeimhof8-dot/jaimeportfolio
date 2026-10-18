# Sprint-Log: Relaunch Schweizer Editorial-Minimalismus

> **Archiv.** Beschreibt einen älteren Stand (Inter, Content-Collections, Hover-Vorschau, Reels), der inzwischen durch den Framer-Nachbau ersetzt wurde. Der aktuelle Aufbau steht in `README.md`, der letzte Design-Audit in `UI_UX_AUDIT.md`.

Datum: 16.10.2026 · Ausgangspunkt: Tag `sonnenuntergang-version` (0c8cc28)

## Epics

| Epic | Commit | Ergebnis |
|---|---|---|
| 1 · Relaunch Design & Hero | 8c2b916 | Fläche `#111`, Haarlinien, 12er-Raster, Inter 700 (−0.03em / 0.95), Mono-Labels 11–13 px (+0.08em, tabular-nums). Zweizeilige Headline, drei Projektlinks mit Hover-Vorschau, Metadaten. Above the fold auf 1440×900, 1280×720, 390×844. |
| 2 · Bereinigung & Platzhalter | 49f8856 | Event Video (GPMC unbestätigt) und Tour de Suisse auf `draft`. Kapitelkarten entfernt. Magnetischer „Schreib mir ↗“-Knopf unten rechts. |
| 3 · Hover-Vorschau & Performance | fce37b9 | Vorschaubilder lazy mit niedriger Priorität; Listenvorschau entsteht erst beim Annähern an die Liste; auf Touch-Geräten weder Vorschau-Ebene noch Listener. Mobile-Startseite: 5 Bilder, 199 KB. |
| 4 · Fallstudien | 965e2df | Neue Felder `ausgangslage`, `workflow`, `ergebnis`. Raster mit fünf Blöcken und Mono-Spec-Kasten. IPA mit allen gelieferten Fakten. |
| 5 · Cleanup | e6cd13b | Timelapse-Bildfolge, Schlüsselbilder, Sternenbild, Hero-Video, Sequenz-Skript und ungenutzte Bilder gelöscht (9.8 MB). GSAP und Lenis deinstalliert. Abhängigkeiten nur noch Astro, Sitemap, zwei Schriften. Kein separates JS-Bundle. Neues OG-Bild und Favicon. |
| 6 · QA & Build | dieser Commit | siehe unten |

## QA

| Prüfung | Ergebnis |
|---|---|
| `npm run build` | 9 Seiten, 0 Fehler, 0 Warnungen |
| `astro check` | 0 Fehler, 0 Warnungen, 0 Hinweise |
| axe (WCAG 2.1 AA + Best Practices), 7 Seiten × 390/1440 px | 0 Verstösse (ein Befund behoben: Brotkrumen-Link nur farblich unterscheidbar → unterstrichen) |
| Interaktionstest `check:smoke` | 21/21 bestanden: Hero above the fold, Hover-Vorschau, Ortszeit, Schreib-mir-Knopf (verborgen im Hero, sichtbar danach), Fallstudie 5 Blöcke, Spec-Kasten, YouTube erst nach Klick, Mobile ohne Vorschau-Ebene mit Thumbnails, Menü, Filter, Lightbox, Reel-Pause, 404, robots.txt |
| Links | 347 interne Ziele vorhanden; mailto/tel nur `jaimeimhof8@gmail.com` und `+41775256727`; LinkedIn blockt automatische Abfragen (999), im Browser geprüft |
| Suche nach Vorlagenresten und Tippfehler-Adresse | keine Treffer im Projekt (ohne node_modules) |
| Lighthouse Mobile (Median aus 3 Läufen, Rechner unbelastet, benchmarkIndex 2065–2833) | Start 99 · Works 100 · IPA 100 · About 100 · Contact 100; Barrierefreiheit, Best Practices, SEO überall 100; CLS 0; TBT 0 ms; LCP 1.4–1.8 s |
| Seitengewicht (Lighthouse) | Start 159 KB · Works 99 KB · IPA 106 KB · About 141 KB · Contact 84 KB |
| Screenshots 390 / 768 / 1440 px | selbst gesichtet: kein abgeschnittener Text, kein Text über Bildern, Raster konsistent |

## Offen (braucht Material oder Bestätigung von Jaime)

1. Gegradetes IPA-Standbild statt YouTube-Vorschaubild (wichtigstes Bild der Seite, erscheint im Hero).
2. Fallstudien-Fakten für Capoeira, BlessThun, Tunis.
3. Bestätigung Event Video = GPMC; Tour-de-Suisse-Fotos.
4. Lebenslauf ohne Geburtsdatum/Strasse, Domain.
