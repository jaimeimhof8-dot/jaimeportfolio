// Projects in the order of jaimeimhof.framer.website. Roles come only from the project texts and the CV.
import type { ImageMetadata } from 'astro';

import ipaCover from '../../material/framer/ipa/cover.jpg';
import ipaLager from '../../material/framer/ipa/lager.jpg';
import ipaAutostore from '../../material/projects/ipa-derendinger/frame-autostore.jpg';
import gpmcCover from '../../material/framer/gpmc/cover.jpg';
import gpmcPublikum from '../../material/framer/gpmc/publikum.jpg';
import blessCover from '../../material/framer/blessthun/cover.jpg';
import blessPublikum from '../../material/framer/blessthun/publikum.jpg';
import blessSaengerin from '../../material/framer/blessthun/saengerin.jpg';
import blessBuehne from '../../material/framer/blessthun/buehne.jpg';
import blessGitarrist from '../../material/framer/who/gitarrist.jpg';
import blessFreundinnen from '../../material/framer/blessthun/freundinnen.jpg';
import capoCover from '../../material/framer/capoeira/cover.jpg';
import capoZweites from '../../material/framer/capoeira/zweites.jpg';
import tunisCover from '../../material/framer/tunis/cover.jpg';
import tunis02 from '../../material/framer/tunis/02.jpg';
import tunis03 from '../../material/framer/tunis/03.jpg';
import tunis04 from '../../material/framer/tunis/04.jpg';
import tunis05 from '../../material/framer/tunis/05.jpg';
import tunis06 from '../../material/framer/tunis/06.jpg';
import tourCover from '../../material/framer/hero/tour-de-suisse.jpg';
import tour02 from '../../material/framer/tour/02.jpg';
import tour03 from '../../material/framer/tour/03.jpg';
import tour04 from '../../material/framer/tour/04.jpg';
import tour05 from '../../material/framer/tour/05.jpg';
import tour06 from '../../material/framer/tour/06.jpg';
import ytGpmc from '../../material/framer/yt-F7yJFOHYH5o.jpg';
import ytCapo from '../../material/framer/yt-n5dR3ikfgSo.jpg';

export interface Img {
  src: ImageMetadata;
  alt: string;
  // CSS object-position, as set in Framer.
  pos?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: 'Video' | 'Fotografie';
  industry: string;
  year: string;
  client: string;
  // What Jaime did himself.
  role: string;
  text: string;
  // Card image on the overview pages.
  cover: Img;
  // First image of the pair on the project page; defaults to the cover.
  lead?: Img;
  second: Img;
  youtube?: { id: string; poster: ImageMetadata };
  // Photo projects: full width, two halves, full width.
  gallery?: [Img, Img, Img, Img];
}

export const projects: Project[] = [
  {
    slug: 'ipa-derendinger',
    title: 'IPA',
    category: 'Video',
    industry: 'Automotive',
    year: '2026',
    client: 'Derendinger',
    role: 'Idee, Dreh, Schnitt, Motion Design',
    text: 'Meine Lehrabschlussarbeit für Derendinger AG, von der Idee bis zum fertigen Schnitt allein umgesetzt. Ein Marketingvideo, das zeigt, wie ein Ersatzteil vom Bestellen im Web-Shop über das AutoStore-Lager in Niederbipp bis zur Auslieferung kommt. Schnitt, Motion Design und Animationen komplett in Premiere Pro und After Effects.',
    cover: { src: ipaCover, alt: 'Mechaniker in einer Autowerkstatt, Standbild aus dem IPA-Film' },
    lead: { src: ipaAutostore, alt: 'Gestapelte Lagerbehälter mit Etiketten im AutoStore-Lager, Standbild aus dem IPA-Film' },
    second: { src: ipaLager, alt: 'Förderband im automatischen Ersatzteillager, Standbild aus dem IPA-Film' },
    // The YouTube thumbnail (laptop with timecode) was the weakest frame; the workshop still is the strongest.
    youtube: { id: 'SxO9FMYEWg8', poster: ipaCover },
  },
  {
    slug: 'event-video-gpmc',
    title: 'Event Video',
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
    category: 'Fotografie',
    industry: 'Event',
    year: '2025',
    client: 'BlessThun',
    role: 'Planung, Fotografie',
    text: 'Content für BlessThun, im Auftrag der Organisatoren. Social-Media-Material und Live-Fotografie direkt am Event, von der Planung bis zum fertigen Bild.',
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

// Home shows the first four, as on the Framer site.
export const featured = projects.slice(0, 4);

// "Weitere Projekte": the next two in the list, never the project itself.
export const nextProjects = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return [1, 2].map((n) => projects[(i + n) % projects.length]);
};
