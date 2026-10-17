# UI/UX-Audit – Portfolio Jaime Imhof

Stand: 17.10.2026. Grundlage: Playwright-Screenshots aller Seiten bei 1440×900 und 390×844 (Dev-Server). Die Vorher-Bilder liegen im Scratchpad unter `before/`.

## 1. Was stark ist und so bleibt

- **Farbwelt:** schwarzer Grund, helles Zinkgrau (#e4e4e7), gedämpftes Grau für Labels. Der helle Hero ist der Gegenpol zum dunklen Rest.
- **Schrift-Duo:** JetBrains Mono in Versalien für Titel und Labels, Poppins Light für Fliesstext. Das ist der Charakter der Seite.
- **Hero-Idee:** zwei wechselnde Fotos, die beim Scrollen zur Seite fahren und den Namen freigeben.
- **„Wer bin ich“ und About:** versetzte Bildkomposition mit viel Schwarz.
- **Abschluss:** schräger, laufender Fotostreifen.
- **Projektseiten:** Aufbau Kategorie → Titel → Bildpaar → Meta → Text → Video/Galerie.
- **Fotos:** durchweg stark und eigene Arbeiten.

## 2. Top-10-Mängel

| # | Wo | Problem |
|---|----|---------|
| 1 | Hero, alle Breiten | Mitten im Scrollen liegt „JAIME IMHOF“ samt Unterzeilen über den Fotos (Text auf Bäumen und Publikum, unlesbar). Der Name blendet ein, bevor die Fotos Platz gemacht haben (`--q` läuft unabhängig von `--p`). |
| 2 | TopBar über dem Hero (Desktop) | Die Navigation ist schwarz, auch über dem rechten, dunklen Foto: „About“ und „Contact“ sind praktisch unsichtbar. |
| 3 | Hero, Handy | Am Ende der Animation sitzt der Name im oberen Drittel (`padding-bottom: 190px`), darunter liegen über 400 px leeres Grau. Die Scrollstrecke (2200 px) ist auf dem Handy länger als die Animation, also Scrollen ohne Wirkung. |
| 4 | Buttons „Über mich“, „More Works“, „Schreib mir“ | Pills ohne Rand und ohne Füllung sehen aus wie Fliesstext und sind nicht als Klickziel erkennbar. Hover nur mit 10 % Hintergrund, kein Fokus-Stil. |
| 5 | Projektseite IPA | Das Video-Vorschaubild ist das abfotografierte Laptop mit Timecode-Einblendung, der schwächste Frame des ganzen Projekts, und das grösste Bild der Seite. |
| 6 | „More Projects“ | Zeigt immer GPMC und Tunis, auch auf genau diesen Seiten: Auf „Tunis Streetlife“ verlinkt man auf sich selbst. |
| 7 | Sprache und Labels | Mix aus Englisch und Deutsch: Works/About/Contact, More Works, More Projects, Industry/Year/Client, Send an email/Phone/Submit. Für Schweizer Recruiter ist das unnötige Reibung. |
| 8 | Kontakt | Auf dem Handy klebt „Kontaktiere mich“ ohne Abstand am Label darunter. Die Nummer ist unformatiert (0775256727), es gibt keine 1-Klick-Kopie der E-Mail und im Footer keinen direkten Kontakt. |
| 9 | Projekttexte und Meta | Es fehlt, was Jaime genau gemacht hat (Rolle). Die Texte nennen das nur nebenbei. Der GPMC-Text bleibt vage. |
| 10 | Typografie und Interaktion | Kein `text-wrap: balance` (Titel brechen mit Einzelwort-Zeilen). Fliesstext auf Desktop bis 760 px breit. Karten haben keinen Fokus-Stil und ausser dem Bildzoom kein Hover-Signal am Titel. Die Projekt-Kategorie (14 px, #76767f) ist auf dem Handy schwach. |

Ausserdem:
- Die Alt-Texte auf der About-Seite nennen den Namen; das widerspricht der Vorgabe „keine Namen in Alt-Texten“.
- Die Dev-Toolbar von Astro überdeckt in jedem Screenshot Inhalte.

## 3. Massnahmen

1. **Hero-Choreografie** (`src/pages/index.astro`)
   - `--q` hängt an `--p`: Der Name startet erst bei `p = 0.62` und ist bei `p = 1` ganz da, wenn die Fotos weg sind. Er steigt nur noch 12vh auf statt 100vh.
   - `--p` läuft über 1.2 Viewporthöhen; die Sektion ist `250svh` hoch, damit der Name ca. 0.3 Viewports stehen bleibt.
   - Handy: Name vertikal zentriert (`padding: 0 20px`).
2. **TopBar** (`TopBar.astro`)
   - Über dem Hero `mix-blend-mode: difference` mit weissem Text: schwarz auf Grau, hell auf dunklen Fotos.
   - Nav-Links mit animierter Unterstreichung (scaleX) statt hartem Underline.
3. **Handy-Hero:** Scrollstrecke wie oben auf `250svh`; der Name sitzt in der Mitte.
4. **Pills** (`global.css`)
   - `1px solid rgb(255 255 255 / 0.22)` und Pfeil „→“.
   - Hover: Rand weiss, Hintergrund 8 %, Pfeil 4 px nach rechts. Active: `scale(0.98)`. Fokus: 2 px Outline.
5. **IPA-Medien** (`src/data/projects.ts`)
   - Video-Poster ist das Werkstatt-Standbild (stärkster, scharfer Frame).
   - Bildpaar: Förderband und AutoStore-Behälter. Kein Bild doppelt auf der Seite.
6. **Weitere Projekte:** die zwei nächsten Projekte in der Reihenfolge, nie das aktuelle.
7. **Sprache einheitlich Deutsch**
   - Navigation: Arbeiten / Über mich / Kontakt.
   - Buttons und Überschriften: „Alle Arbeiten“, „Weitere Projekte“.
   - Meta: Branche / Jahr / Kunde / Rolle.
   - Kontaktseite: E-Mail / Telefon / Ort / Nachricht / Senden.
   - Footer: Seiten / Standort / Social.
8. **Kontakt**
   - Handy: 40 px Abstand unter dem Titel.
   - Telefon im Format `077 525 67 27`.
   - Knopf „Kopieren“ neben der E-Mail (Clipboard-API, Rückmeldung „Kopiert“, `aria-live`).
   - Footer-Spalte „Kontakt“ mit E-Mail-Link und Kopier-Knopf.
9. **Rolle als viertes Meta-Feld**, nur aus belegten Fakten (Projekttexte und CV):
   - IPA: Idee, Dreh, Schnitt, Motion Design.
   - GPMC und Capoeira: Kamera, Schnitt.
   - BlessThun: Planung, Fotografie.
   - Tunis und Tour de Suisse: Fotografie.

   Den GPMC-Text präzisieren, ohne etwas dazuzuerfinden.
10. **Typografie und Interaktion**
    - Überschriften `text-wrap: balance`, Fliesstext `text-wrap: pretty`.
    - Lesebreite `max-width: 62ch` für Intro-Texte.
    - Karten: Titel mit Pfeil, der bei Hover einfährt, und Fokus-Ring am Bild.
    - Kategorie und Jahr nebeneinander in der Label-Zeile („Video · 2026“), damit die Karte mehr sagt.

Kleinkram:
- About-Alt-Texte ohne Namen.
- Dev-Toolbar ausschalten (`devToolbar.enabled = false`), damit Screenshots und Tests nichts verdeckt.

## 4. Umgesetzt (Ergebnis)

Drei Screenshot-Runden bei 1440×900 und 390×844 (`after1` bis `after4` im Scratchpad); jede Runde habe ich angesehen und korrigiert.

| # | Ergebnis |
|---|----------|
| 1 | Hero: Die Fotos liegen jetzt über dem Namen und geben ihn beim Zurückfahren frei; Text liegt nie mehr auf einem Foto. Der Name erscheint ab `p = 0.62` und steigt 12vh statt 100vh auf. Die Sektion ist `250svh` hoch statt 2200 px. Unterzeilen jetzt „Mediamatiker EFZ / aus Thun“ und „Video, Foto und Social Content / mit Fokus auf Sport“. |
| 2 | Navigation über dem Hero: Jedes Element prüft, was hinter ihm liegt (`elementsFromPoint`). Über einem Foto ist es weiss mit weichem Schatten, über dem grauen Block schwarz. Dazu ein 140-px-Verlauf oben auf den Fotos. Unterstreichung animiert (scaleX). In Runde 2 korrigiert: Der Invert-Effekt (`difference`) war auf mittelhellen Fotos unlesbar. In Runde 3 korrigiert: Timing-Fehler, die Prüfung läuft jetzt einen Frame nach dem Hero-Update. |
| 3 | Handy-Hero: Der Name sitzt mittig, die Scrollstrecke ist kürzer. |
| 4 | Pills mit 1-px-Rand, Pfeil, Hover (Rand weiss, Pfeil +4 px), Active (`scale .98`). |
| 5 | IPA: Video-Poster ist das Werkstatt-Standbild statt Laptop mit Timecode. Bildpaar: AutoStore-Behälter und Förderband, nichts doppelt. |
| 6 | „Weitere Projekte“ zeigt die nächsten zwei Projekte, nie das eigene, dazu „Alle Arbeiten →“. In Runde 2 korrigiert: Der Knopf war auf volle Breite gezogen. |
| 7 | Alles auf Deutsch: Navigation, Buttons, Meta, Formular, Footer, Seitentitel. |
| 8 | Kontakt: Abstand unter dem Titel auf dem Handy, Telefon `077 525 67 27`, Knopf „Kopieren“ mit Rückmeldung (`aria-live`), Hinweis zum Mail-Programm, Fokus- und Hover-Rand an den Feldern. Footer-Spalte „Kontakt“ mit E-Mail, Kopier-Knopf und Telefon. |
| 9 | Meta-Feld „Rolle“ auf allen Projektseiten (nur belegte Angaben). IPA-Text nennt die Alleinumsetzung laut CV, GPMC-Text präzisiert. |
| 10 | `text-wrap: balance/pretty`, Lesebreiten in `ch`, About- und Startseiten-Text auf Desktop 18 px / 1.7. Karten mit Pfeil und Fokus-Ring, Label „Video · 2026“. Arbeiten-Seite mit Abschluss „Kontakt aufnehmen“ und Luft zum Footer (Runde 3). |

Ausserdem:
- About-Alt-Texte ohne Namen.
- Dev-Toolbar aus.

**Prüfungen:**
- `npm run build`: fehlerfrei, ohne Warnungen.
- `astro check`: 0/0/0.
- Smoke-Test: 16/16 OK.
- axe: 0 Verstösse bei 390 und 1440 px.
- Links: alle OK. LinkedIn antwortet Bots mit Status 999, der Link funktioniert.
- Keine Konsolenfehler.

**Bewusst nicht geändert:**
- Farbwelt, Schriften, Layout-Raster und Bildkompositionen.
- Fotostreifen und Hero-Idee.

**Offen** (braucht Angaben von Jaime): Kamera- und Software-Setup pro Projekt, falls es in den Projekttexten stehen soll; erfunden wird nichts.
