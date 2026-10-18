// Single source for names, contact data, links and shared texts.

// Live domain. Used for sitemap, canonical, robots.txt and Open Graph URLs.
export const SITE_URL = 'https://jaimeimhof.ch';

export const person = {
  name: 'Jaime Imhof',
  logo: 'JAIME IMHOF',
  jobTitle: 'Mediamatiker EFZ',
  // Wording from the CV.
  role: 'Mediamatiker EFZ · Video, Fotografie, Motion Design & Social Content',
  availability: 'Thun, Raum Bern · frisch ausgelernt · verfügbar ab sofort, 100 %',
  pitch: 'Ich drehe und schneide Videos für Social Media selbst und halte mich dabei an die Vorgaben der Marke.',
  discipline: 'Video, Social Content & Motion Design',
  city: 'Thun',
  country: 'Schweiz',
  countryCode: 'CH',
  geoLabel: '46.758° N · 7.628° E',
};

export const contact = {
  email: 'jaimeimhof8@gmail.com',
  phoneDisplay: '077 525 67 27',
  phoneHref: 'tel:+41775256727',
  phoneCompact: '0775256727',
  location: 'Thun, Schweiz',
  zip: '3603',
  showStreetAddress: false,
  // Only shown when showStreetAddress is true. Left empty on purpose so it never ends up in the public repository.
  streetAddress: '',
};

export const social = {
  instagram: 'https://www.instagram.com/jaime.imhof/',
  linkedin: 'https://www.linkedin.com/in/jaime-imhof-811a09342/',
};

// TODO: set a path like '/Lebenslauf_Jaime_Imhof.pdf' once a CV without birth date and street exists in public/.
export const cvUrl: string | null = null;

export const mailto = `mailto:${contact.email}`;

export const nav = [
  { href: '/projects/', label: 'Arbeiten' },
  { href: '/about/', label: 'Über mich' },
  { href: '/contact/', label: 'Kontakt' },
];

export const texts = {
  homeTitle: 'Jaime Imhof — Mediamatiker EFZ, Video & Social Content | Portfolio',
  homeDescription:
    'Jaime Imhof, Mediamatiker EFZ aus Thun. Video, Foto und Social Content mit Fokus auf Sport und Events. Portfolio und Kontakt.',
  aboutDescription:
    'Jaime Imhof, Mediamatiker EFZ aus Thun. Video und Foto für Social Media, Sport und Events. Mehr über mich und meine Arbeit.',
  about:
    'Ich bin Jaime, aufgewachsen und wohnhaft in Thun. Wenn ich nicht gerade am Set oder unterwegs bin, sitz ich auf dem Rennrad, laufe eine Runde oder bin im CrossFit- bzw. Hyrox-Training. Genau dieser Antrieb aus dem Sport ist es, den ich in meine Arbeit mitnehme.',
  // Home "Wer bin ich": facts from the CV only.
  intro:
    'Ich bin Mediamatiker EFZ und habe meine Lehre 2026 bei Derendinger AG abgeschlossen. Ich plane, drehe und schneide Videos für Marketing und Social Media, fotografiere Events und setze Motion Design in After Effects um. Am liebsten arbeite ich draussen.',
  worksIntro:
    'Eine Auswahl meiner Arbeiten aus Video, Social Media und Content-Produktion. Von der ersten Idee bis zum letzten Schnitt hab ich alles selbst gemacht.',
  contactHeading: 'Ich freue mich über Ihre Nachricht.',
};

// Career, word for word from the CV (Lebenslauf_Jaime_Imhof.pdf).
export const experience = [
  {
    period: '2025 – 2026',
    org: 'Derendinger AG, Dietlikon',
    role: 'Mediamatiker (Lehre), Marketing',
    points: [
      'Videocontent für Marketing und Social Media geplant, gedreht und geschnitten',
      'Abschlussprojekt (IPA): Imagefilm «Der Weg eines Ersatzteils» von der Idee bis zum fertigen Schnitt allein umgesetzt',
      'Social-Media-Grafiken für Instagram, LinkedIn und Web, im Corporate Design der Marke',
      'Mitarbeit an Messen und Events, Produktfotografie, Bildbearbeitung und Printwerbung',
    ],
  },
  {
    period: '2022 – 2025',
    org: 'Bict AG, Bern',
    role: 'Mediamatiker (Lehre)',
    points: ['2022 – 2024: Grundbildung Mediamatik', '2024 – 2025: Content-Produktion für Social Media'],
  },
  {
    period: '2024 – heute',
    org: 'Jugendgruppe BlessThun, Thun',
    role: 'Foto und Video im Auftrag der Veranstalter',
    points: ['Jeden Monat ein Anlass, rund 24 bisher', 'Eventfotografie und Video vor Ort, Content für den offiziellen Instagram-Account'],
  },
];

export const education = [
  { period: '2022 – 2026', title: 'Mediamatiker EFZ', detail: 'Eidgenössisches Fähigkeitszeugnis' },
];

// Key facts for recruiters (from the CV).
export const keyFacts = [
  { label: 'Verfügbar', value: 'ab sofort, 100 %' },
  { label: 'Wohnort', value: 'Thun' },
  { label: 'Führerausweis', value: 'Kat. B' },
  { label: 'Referenzen', value: 'auf Anfrage' },
];


export const tools = [
  { label: 'Video', items: 'Premiere Pro, CapCut, After Effects (Mocha, Expressions), DaVinci Resolve' },
  { label: 'Foto', items: 'Lightroom, Photoshop' },
  { label: 'Design', items: 'Illustrator, InDesign' },
  { label: 'Kamera', items: 'Sony a7 III' },
];

export const languages = [
  { label: 'Deutsch', level: 'Muttersprache' },
  { label: 'Englisch', level: 'gutes Verständnis, Sprechen mittel' },
  { label: 'Französisch', level: 'Schulkenntnisse' },
];
