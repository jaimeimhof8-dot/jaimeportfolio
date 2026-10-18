# Änderungsprotokoll

Aktueller Stand: 18.10.2026. Aufbau und Befehle stehen in `README.md`, der Design-Audit vom 17.10.2026 in `UI_UX_AUDIT.md`. Ältere Stände sind über die Git-Tags `sonnenuntergang-version` und `cinema-dark-version` erreichbar.

## 18.10.2026: Audit und Umsetzung

Grundlage: Code-Audit (Build, Barrierefreiheit, Layout) und Live-Prüfung von https://jaimeimhof.ch.

| Bereich | Änderung |
|---|---|
| Domain | `SITE_URL` auf `https://jaimeimhof.ch` (vorher eine nicht existierende `pages.dev`-Adresse in Canonical, Sitemap, `robots.txt`, Open Graph). Framer-Reste im Code entfernt, Bildordner `material/site`. |
| Layout | Auf Windows-Desktops scrollten Start und About 15 px seitlich (`100vw` zählt die Scrollleiste mit). `--u` folgt jetzt der Breite ohne Scrollleiste. Neuer Smoke-Test mit sichtbarer Scrollleiste. |
| Hero Handy | Haltephase des Namens von 0,5 auf 1,6 Bildschirme verlängert (360svh). Scroll-Hinweis statt Maus-Symbol auf Touch. Fotoschau und Fotostreifen pausieren ausser Sicht. |
| Menü Handy | Escape und Klick daneben schliessen, Fokus kehrt zum Knopf zurück. |
| Kontakt | Mailto-Formular entfernt. E-Mail mit Kopieren-Knopf, Telefon, Ort, Social-Links. |
| Texte | Alter aus dem About-Text entfernt. IPA und BlessThun mit abgestimmten Texten, BlessThun «2024 – heute». |
| SEO | Pro Projekt `seoTitle` und `beschreibung` (höchstens 155 Zeichen), eigene Beschreibung für «Über mich», eigenes Open-Graph-Bild pro Projekt. Prüfung mit `npm run check:meta`. |
| Inhalt | Startseite: Arbeiten vor «Wer bin ich». «Über mich»: Block «Werdegang und Tools» mit Lebenslauf-Download. Projektseiten: optionale Felder Ausgangslage, Vorgehen, Ergebnis. |
| Datenschutz | Neue Seite `/datenschutz/`, Link im Footer. Kein Rechtstext einer Anwältin. |
| Aufräumen | README neu, Inter-Schrift deinstalliert, ungenutzte `config.ts`-Einträge entfernt. |

## Prüfungen

`npm run build`, `npm run check`, `npm run check:meta`, `npm run check:links`, `npm run check:a11y`, `npm run check:smoke`. Details und Ergebnisse stehen im jeweiligen Commit-Verlauf und im Abschlussbericht.

## Archiv: Relaunch vom 16.10.2026

Ein früherer Relaunch («Schweizer Editorial-Minimalismus» mit Inter, Content-Collections, Hover-Vorschau und Reels) wurde durch den heutigen Aufbau ersetzt. Seine Beschreibung ist nicht mehr gültig.
