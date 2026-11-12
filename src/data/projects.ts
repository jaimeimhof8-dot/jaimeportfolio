// Projects in display order. Roles come only from the project texts and the CV.
import type { ImageMetadata } from 'astro';

import ipaCover from '../../material/site/ipa/cover.jpg';
import ipaLager from '../../material/site/ipa/lager.jpg';
import ipaAutostore from '../../material/projects/ipa-derendinger/frame-autostore.jpg';
import flyerCover from '../../material/projects/flyer-opening-day/cover.jpg';
import flyer02 from '../../material/projects/flyer-opening-day/02.jpg';
import flyer03 from '../../material/projects/flyer-opening-day/03.jpg';
import flyer04 from '../../material/projects/flyer-opening-day/04.jpg';
import flyer05 from '../../material/projects/flyer-opening-day/05.jpg';
import flyer06 from '../../material/projects/flyer-opening-day/06.jpg';
import sasCover from '../../material/projects/swiss-automotive-show/cover.jpg';
import sas02 from '../../material/projects/swiss-automotive-show/02.jpg';
import sas03 from '../../material/projects/swiss-automotive-show/03.jpg';
import sas04 from '../../material/projects/swiss-automotive-show/04.jpg';
import sas05 from '../../material/projects/swiss-automotive-show/05.jpg';
import sas06 from '../../material/projects/swiss-automotive-show/06.jpg';
import sasApp from '../../material/projects/swiss-automotive-show/app-poster.jpg';
import rueckCover from '../../material/projects/jahresrueckblick-2025/cover.jpg';
import rueck02 from '../../material/projects/jahresrueckblick-2025/02.jpg';
import rueckPoster from '../../material/projects/jahresrueckblick-2025/poster.jpg';
import gpmcCover from '../../material/site/gpmc/cover.jpg';
import gpmcPublikum from '../../material/site/gpmc/publikum.jpg';
import blessCover from '../../material/site/blessthun/cover.jpg';
import blessPublikum from '../../material/site/blessthun/publikum.jpg';
import blessSaengerin from '../../material/site/blessthun/saengerin.jpg';
import blessBuehne from '../../material/site/blessthun/buehne.jpg';
import blessGitarrist from '../../material/site/who/gitarrist.jpg';
import blessFreundinnen from '../../material/site/blessthun/freundinnen.jpg';
import capoCover from '../../material/site/capoeira/cover.jpg';
import capoZweites from '../../material/site/capoeira/zweites.jpg';
import tunisCover from '../../material/site/tunis/cover.jpg';
import tunis02 from '../../material/site/tunis/02.jpg';
import tunis03 from '../../material/site/tunis/03.jpg';
import tunis04 from '../../material/site/tunis/04.jpg';
import tunis05 from '../../material/site/tunis/05.jpg';
import tunis06 from '../../material/site/tunis/06.jpg';
import tourCover from '../../material/site/hero/tour-de-suisse.jpg';
import tour02 from '../../material/site/tour/02.jpg';
import tour03 from '../../material/site/tour/03.jpg';
import tour04 from '../../material/site/tour/04.jpg';
import tour05 from '../../material/site/tour/05.jpg';
import tour06 from '../../material/site/tour/06.jpg';
import ytGpmc from '../../material/site/yt-F7yJFOHYH5o.jpg';
import ytCapo from '../../material/site/yt-n5dR3ikfgSo.jpg';

export interface Img {
  src: ImageMetadata;
  alt: string;
  // CSS object-position.
  pos?: string;
}

export interface Project {
  slug: string;
  title: string;
  // Page title (before " | Jaime Imhof") and meta description (max 155 characters).
  seoTitle: string;
  beschreibung: string;
  category: 'Video' | 'Fotografie' | 'Grafik' | 'Social Media';
  industry: string;
  // A year or a period like '2024 – heute'.
  year: string;
  client: string;
  // What Jaime did himself.
  role: string;
  text: string;
  // Optional case-study fields, shown on the project page only when filled in.
  ausgangslage?: string;
  vorgehen?: string;
  ergebnis?: string;
  // Card image on the overview pages.
  cover: Img;
  // First image of the pair on the project page; defaults to the cover.
  lead?: Img;
  second: Img;
  youtube?: { id: string; poster: ImageMetadata };
  // LinkedIn post (activity ID from the post URL), loads only after a click. aspect: CSS ratio of the poster.
  linkedin?: { id: string; poster: ImageMetadata; aspect?: string; title: string };
  // Photo projects: full width, two halves, full width.
  gallery?: [Img, Img, Img, Img];
}

export const projects: Project[] = [
  {
    slug: 'ipa-derendinger',
    title: 'IPA',
    seoTitle: 'IPA, Imagefilm für Derendinger',
    beschreibung: 'Imagefilm für Derendinger: der Weg eines Ersatzteils vom Web-Shop zur Auslieferung. Idee, Dreh, Schnitt und Motion Design von Jaime Imhof.',
    category: 'Video',
    industry: 'Automotive',
    year: '2026',
    client: 'Derendinger',
    role: 'Idee, Dreh, Schnitt, Motion Design',
    text: 'Meine Lehrabschlussarbeit für Derendinger AG: ein Imagefilm, der zeigt, wie ein Ersatzteil von der Bestellung im Web-Shop über das AutoStore-Lager in Niederbipp bis zur Auslieferung kommt. Idee, Dreh, Schnitt, Motion Design in After Effects (Mocha, Expressions) und Farbkorrektur in DaVinci Resolve habe ich allein umgesetzt.',
    cover: { src: ipaCover, alt: 'Mechaniker in einer Autowerkstatt, Standbild aus dem IPA-Film' },
    lead: { src: ipaAutostore, alt: 'Gestapelte Lagerbehälter mit Etiketten im AutoStore-Lager, Standbild aus dem IPA-Film' },
    second: { src: ipaLager, alt: 'Förderband im automatischen Ersatzteillager, Standbild aus dem IPA-Film' },
    // The YouTube thumbnail (laptop with timecode) was the weakest frame; the workshop still is the strongest.
    youtube: { id: 'SxO9FMYEWg8', poster: ipaCover },
  },
  {
    slug: 'flyer-opening-day',
    title: 'Opening Day',
    seoTitle: 'Opening Day, Flyer-Design mit KI',
    beschreibung: 'Flyer-Design für einen erfundenen Bikepark: vier Entwürfe in Schwarzweiss und Farbe. Konzept und Auswahl von Jaime Imhof, Fotos mit KI erzeugt.',
    category: 'Grafik',
    industry: 'Sport',
    year: '2026',
    client: 'Persönliches Projekt',
    role: 'Konzept, Art Direction, Auswahl, KI-Workflow',
    text: 'Eigenes Übungsprojekt: ein A5-Flyer für den Saisonstart eines erfundenen Bikeparks, mit Vorder- und Rückseite. Vorbild war ein Pinterest-Board mit Run-Club-Flyern. Layouts und Fotos habe ich mit KI-Werkzeugen erarbeitet (Claude für das Layout, Gemini für die Bilder) und dabei geführt: Stil festgelegt, Ergebnisse ausgewählt, Fehler korrigiert.',
    ausgangslage: 'Ich wollte Print-Gestaltung und einen sauberen KI-Ablauf an einem Projekt zeigen, ohne Kundenbriefing. Als Briefing diente mein eigenes Moodboard.',
    vorgehen: 'Stil aus dem Moodboard abgeleitet, Fotos mit Gemini erzeugt, ein zu künstliches Bild neu erzeugt, Markenzeichen in den Fotos entfernt. Acht Layouts gebaut, auf Lesbarkeit und Abstände geprüft und drei davon weiterentwickelt, eines auch in Farbe.',
    ergebnis: 'Vier Entwürfe in A5, schwarzweiss und farbig. Datum, Ort, Adresse und QR-Code sind Beispiele.',
    cover: { src: flyerCover, alt: 'Flyer Opening Day in Schwarzweiss, Vorderseite mit Schuh im Staub und Rückseite mit Programm' },
    second: { src: flyer02, alt: 'Derselbe Flyer in Farbe, Vorderseite mit orangem Infobalken und Rückseite mit Programm' },
    gallery: [
      { src: flyer03, alt: 'Variante mit senkrechtem Titel, Vorder- und Rückseite nebeneinander' },
      { src: flyer04, alt: 'Orangefarbenes Rahmenposter mit grossen Zeitzahlen auf der Rückseite' },
      { src: flyer05, alt: 'Vorderseite in Schwarzweiss neben der Vorderseite in Farbe' },
      { src: flyer06, alt: 'Vier mit KI erzeugte Fotos: Schuh im Staub, Fahrer in Bewegungsunschärfe, Sprung im Gegenlicht und Rad in der Kurve' },
    ],
  },
  {
    slug: 'swiss-automotive-show',
    title: 'Swiss Automotive Show',
    seoTitle: 'Swiss Automotive Show, Social Media für Derendinger',
    beschreibung: 'Social Media für Derendinger zur Swiss Automotive Show 2026: sieben Beiträge und ein Motion-Graphics-Video zur Event-App. Von Jaime Imhof.',
    category: 'Social Media',
    industry: 'Automotive',
    year: '2026',
    client: 'Derendinger',
    role: 'Gestaltung, Motion Graphics, KI-Bilder',
    text: 'Beiträge für den LinkedIn-Auftritt von Derendinger zur Swiss Automotive Show 2026: eine Serie mit sieben Beiträgen, je einer pro Produktgruppe, und ein Kurzvideo zur neuen Event-App. Ich habe die Beiträge gestaltet, das Video als Motion Graphics umgesetzt und die Bilder der Serie mit KI erzeugt.',
    linkedin: { id: '7473268699899199488', poster: sasApp, title: 'Event-App der Swiss Automotive Show, Video von Derendinger auf LinkedIn' },
    cover: { src: sasCover, alt: 'Zwei Beiträge der Serie: Ersatzteile für Personenwagen mit Bremsscheibe, Luftfilter und Lichtmaschine, und Ersatzteile für Nutzfahrzeuge mit einem Lastwagen' },
    second: { src: sas02, alt: 'Zwei Beiträge der Serie: Werkstatteinrichtung mit Werkzeugkoffer und Schlüsseln, und Verbände mit einer Metallkette' },
    gallery: [
      { src: sas03, alt: 'Drei Beiträge der Serie: Reifen mit Felge, Carrosserie mit Fahrzeugtür und Spritzpistole, Verbrauchsgüter mit Ölflasche und Kolben' },
      { src: sas04, alt: 'Nahaufnahme der KI-Bilder: Bremsscheibe, Luftfilter und Lichtmaschine auf grünem Verlauf' },
      { src: sas05, alt: 'Nahaufnahme des KI-Bildes: Reifen mit Felge und leuchtend grünen Speichen' },
      { src: sas06, alt: 'Alle sieben Beiträge der Serie nebeneinander, gleiche Farbwelt mit grünem Verlauf und gelbgrünem Balken am linken Rand' },
    ],
  },
  {
    slug: 'jahresrueckblick-2025',
    title: 'Jahresrückblick 2025',
    seoTitle: 'Jahresrückblick 2025, LinkedIn-Karussell für Derendinger',
    beschreibung: 'Jahresrückblick 2025 für Derendinger: LinkedIn-Karussell mit sechs Seiten zu den Zahlen des Jahres. Gestaltung von Jaime Imhof.',
    category: 'Social Media',
    industry: 'Automotive',
    year: '2025',
    client: 'Derendinger',
    role: 'Gestaltung',
    text: 'Ein Karussell für LinkedIn mit sechs Seiten zu den Zahlen des Jahres bei Derendinger: 471-mal um die Welt, 400 Lieferfahrzeuge im Einsatz, 140 neue Partnergaragen, 660 800 Stunden unterwegs und 6474 Besucher an der Swiss Automotive Show. Ich habe es gestaltet.',
    linkedin: { id: '7411692531496898560', poster: rueckPoster, aspect: '390 / 487', title: 'Jahresrückblick 2025 von Derendinger, Karussell auf LinkedIn' },
    cover: { src: rueckCover, alt: 'Drei Seiten des Karussells: Erde mit grünem Band und 471-mal um die Welt, gestapelte Lieferwagen mit 400 im Einsatz, Schweizer Karte mit 140 neuen Partnergaragen' },
    second: { src: rueck02, alt: 'Drei weitere Seiten des Karussells: Anzeige mit 660 800 Stunden, Messegelände mit 6474 Besuchern und ein Porsche als Strichzeichnung mit Neujahrswunsch' },
  },
  {
    slug: 'event-video-gpmc',
    title: 'Event Video',
    seoTitle: 'Event Video für GPMC',
    beschreibung: 'Event Video für GPMC: Kamera und Schnitt von Jaime Imhof. Ruhige Bilder von Publikum und Open-Air-Bühne.',
    category: 'Video',
    industry: 'Event',
    year: '2026',
    client: 'GPMC',
    role: 'Kamera, Schnitt',
    text: 'Video- und Fotoproduktion für GPMC an einem Open-Air-Anlass. Ruhige Kameraführung statt schneller Schnitte: Im Mittelpunkt stehen das Publikum und die Abendstimmung. Kamera und Schnitt habe ich selbst gemacht.',
    cover: { src: gpmcCover, alt: 'Publikum sitzt auf einer Wiese vor einer kleinen Open-Air-Bühne' },
    second: { src: gpmcPublikum, alt: 'Menschen stehen im Gegenlicht der Abendsonne vor der Bühne' },
    youtube: { id: 'F7yJFOHYH5o', poster: ytGpmc },
  },
  {
    slug: 'event-foto-blessthun',
    title: 'Event Fotografie',
    seoTitle: 'Eventfotografie für BlessThun',
    beschreibung: 'Eventfotografie für die Jugendgruppe BlessThun: seit 2024 jeden Monat ein Anlass, Fotos und Video vor Ort von Jaime Imhof.',
    category: 'Fotografie',
    industry: 'Event',
    year: '2024 – heute',
    client: 'BlessThun',
    role: 'Planung, Fotografie',
    text: 'Seit 2024 begleite ich jeden Monat einen Anlass der Jugendgruppe BlessThun, rund 24 bisher, meist abends oder am Wochenende. Fotos und Videos direkt vor Ort, Content für den offiziellen Instagram-Account, im Auftrag der Veranstalter.',
    cover: { src: blessCover, alt: 'Gitarrist mit Brille spielt im warmen Bühnenlicht, Publikum im Vordergrund' },
    second: { src: blessPublikum, alt: 'Lachende junge Frau im Publikum eines Konzerts' },
    gallery: [
      { src: blessSaengerin, alt: 'Sängerin singt mit voller Kraft ins Mikrofon', pos: '48.7% 25.9%' },
      { src: blessBuehne, alt: 'Sängerin auf der Bühne vor dem Publikum, schwarz-weiss', pos: '44.6% 50.6%' },
      { src: blessGitarrist, alt: 'Gitarrist in Bewegung, mit Langzeitbelichtung, schwarz-weiss' },
      { src: blessFreundinnen, alt: 'Zwei Freundinnen umarmen sich lachend an einem Anlass' },
    ],
  },
  {
    slug: 'capoeira-capu',
    title: 'Capoeira',
    seoTitle: 'Capoeira Video für CAPU',
    beschreibung: 'Capoeira-Video für CAPU: Kamera und Schnitt von Jaime Imhof. Bewegung im Fokus, schnelle Schnitte und viel Nahaufnahme.',
    category: 'Video',
    industry: 'Event',
    year: '2024',
    client: 'CAPU',
    role: 'Kamera, Schnitt',
    text: 'Video- und Fotoproduktion für CAPU. Bewegung stand im Fokus, schnelle Schnitte, viel Nahaufnahme. Kamera und Schnitt selbst gemacht.',
    cover: { src: capoCover, alt: 'Capoeira-Kämpfer springt mit einem Salto über die Gruppe in der Turnhalle' },
    second: { src: capoZweites, alt: 'Capoeira-Lehrer spielt den Berimbau vor einem Wandbild' },
    youtube: { id: 'n5dR3ikfgSo', poster: ytCapo },
  },
  {
    slug: 'tunis-streetlife',
    title: 'Tunis Streetlife',
    seoTitle: 'Tunis Streetlife, Fotoprojekt',
    beschreibung: 'Tunis Streetlife: persönliches Fotoprojekt von Jaime Imhof, Street-Fotografie zwischen Alltag und Architektur.',
    category: 'Fotografie',
    industry: 'Dokumentation',
    year: '2026',
    client: 'Persönliches Projekt',
    role: 'Fotografie',
    text: 'Privates Projekt aus Tunesien. Street-Fotografie zwischen Alltag und Architektur, entstanden auf einer Reise.',
    cover: { src: tunisCover, alt: 'Augen eines Fahrers im Rückspiegel eines Taxis' },
    second: { src: tunis02, alt: 'Blick von der Rückbank eines Sammeltaxis nach vorne' },
    gallery: [
      { src: tunis03, alt: 'Weisser Arkadengang mit blauen Fenstern, hinten eine Person' },
      { src: tunis04, alt: 'Kunstblumen vor bunten Glasfenstern' },
      { src: tunis05, alt: 'Mann steht im verzierten Innenraum einer Synagoge', pos: '33.7% 63.6%' },
      { src: tunis06, alt: 'Mann sitzt auf einem Plastikstuhl unter einem Strohschirm am Strand' },
    ],
  },
  {
    slug: 'tour-de-suisse',
    title: 'Tour de Suisse',
    seoTitle: 'Tour de Suisse, Fotoprojekt',
    beschreibung: 'Tour de Suisse: persönliches Fotoprojekt von Jaime Imhof, die Stimmung am Streckenrand eingefangen.',
    category: 'Fotografie',
    industry: 'Event',
    year: '2026',
    client: 'Persönliches Projekt',
    role: 'Fotografie',
    text: 'Privates Projekt. Ich war als Zuschauer bei der Tour de Suisse dabei und hab die Stimmung am Streckenrand eingefangen.',
    cover: { src: tourCover, alt: 'Radfahrer im gelben Trikot jubelt im Ziel, Zuschauer an der Strecke', pos: '69.4% 72.9%' },
    second: { src: tour02, alt: 'Dicht gedrängte Zuschauer mit Schweizer Fahnen hinter der Absperrung' },
    gallery: [
      { src: tour03, alt: 'Rennfahrerin im Meistertrikot fährt an der Kamera vorbei', pos: '50.6% 38.8%' },
      { src: tour04, alt: 'Rennfahrer im blauen Trikot rollt auf die Kamera zu', pos: '52.6% 30.3%' },
      { src: tour05, alt: 'Rennfahrer mit Mütze wartet hinter der Absperrung' },
      { src: tour06, alt: 'Fahrer im Schlussanstieg zwischen jubelnden Zuschauern', pos: '52.8% 57.8%' },
    ],
  },
];

// Home shows video first: IPA film, GPMC, Capoeira, then the motion graphics project.
const featuredSlugs = ['ipa-derendinger', 'event-video-gpmc', 'capoeira-capu', 'swiss-automotive-show'];
export const featured = featuredSlugs.map((slug) => projects.find((p) => p.slug === slug)!);

// "Weitere Projekte": the next two in the list, never the project itself.
export const nextProjects = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return [1, 2].map((n) => projects[(i + n) % projects.length]);
};
