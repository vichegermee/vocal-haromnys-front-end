export type Chorister = {
  id: string;
  nom: string;
  pupitre: 'Soprano' | 'Alto' | 'Ténor' | 'Basse';
  desc: string;
  img: string;
};

export const choristes: Chorister[] = [
  { id: 'ch1', nom: 'Marie Kouadio', pupitre: 'Soprano', desc: "Choriste depuis 2014, elle anime aussi les répétitions de pupitre soprano.", img: '/images/chorister-photo-1.jpg' },
  { id: 'ch2', nom: 'Jean Mbala', pupitre: 'Ténor', desc: "Membre fondateur de la chorale, passionné de chant traditionnel congolais.", img: '/images/chorister-photo-2.jpg' },
  { id: 'ch3', nom: 'Aïcha Diallo', pupitre: 'Alto', desc: "Arrivée en 2019, elle partage son temps entre le chant et la formation vocale des nouveaux membres.", img: '/images/chorister-photo-3.jpg' },
  { id: 'ch4', nom: 'Emmanuel Touré', pupitre: 'Basse', desc: "Voix grave du groupe depuis 2016, également responsable du matériel de sonorisation.", img: '/images/chorister-photo-4.jpg' },
  { id: 'ch5', nom: 'Grace Ndiaye', pupitre: 'Soprano', desc: "Chante avec la chorale depuis son adolescence, aujourd'hui soliste sur plusieurs titres.", img: '/images/chorister-photo-5.jpg' },
  { id: 'ch6', nom: 'David Kamga', pupitre: 'Ténor', desc: "Musicien de formation, il accompagne aussi la chorale au clavier lors des répétitions.", img: '/images/chorister-photo-6.jpg' },
  { id: 'ch7', nom: 'Ruth Amina', pupitre: 'Alto', desc: "Elle rejoint la chorale en 2021 et coordonne aujourd'hui les tenues de scène.", img: '/images/chorister-photo-7.jpg' },
  { id: 'ch8', nom: 'Samuel Eboa', pupitre: 'Basse', desc: "Choriste et diacre, il assure aussi l'accueil lors des concerts et des cultes.", img: '/images/chorister-photo-8.jpg' },
];

export type EventItem = { date: string; title: string; lieu: string; desc?: string };

export const upcomingEvents: EventItem[] = [
  { date: '20 sept. 2026', title: 'Concert de rentrée', lieu: 'Église Saint-Merri, Paris', desc: "Notre premier concert de la saison, ouvert à tous." },
  { date: '8 nov. 2026', title: 'Soirée Gospel & Louange', lieu: 'Salle Pleyel, Paris', desc: 'Une soirée en co-plateau avec deux autres chorales franciliennes.' },
  { date: '20 déc. 2026', title: 'Concert de Noël', lieu: 'Cathédrale Notre-Dame-des-Champs', desc: 'Notre rendez-vous annuel, entre chants traditionnels et negro spirituals.' },
];

export const pastEvents: EventItem[] = [
  { date: '14 juin 2025', title: 'Festival Gospel sous les Étoiles', lieu: 'Parc de la Villette, Paris' },
  { date: '25 déc. 2024', title: 'Veillée de Noël', lieu: 'Église Saint-Merri, Paris' },
  { date: '2 nov. 2024', title: 'Mariage — prestation privée', lieu: 'Château de Vincennes' },
];

export type Cd = { id: string; title: string; year: number; price: string; desc: string; img: string };

export const cds: Cd[] = [
  { id: 'cd1', title: 'Racines & Lumière', year: 2019, price: '15 €', desc: "Notre premier album, entre chants traditionnels africains et gospel contemporain.", img: '/images/cd-cover-1.jpg' },
  { id: 'cd2', title: 'Debout Nous Chantons', year: 2022, price: '15 €', desc: "Un hymne à l'unité et à la joie, enregistré en live lors de notre concert annuel.", img: '/images/cd-cover-2.jpg' },
  { id: 'cd3', title: 'Vers la Lumière', year: 2025, price: '18 €', desc: 'Notre dernier opus, mêlant chorale, percussions et cuivres.', img: '/images/cd-cover-3.jpg' },
];

export const galleryPhotos = Array.from({ length: 8 }, (_, i) => ({
  id: `gallery-photo-${i + 1}`,
  label: `Photo de concert ${i + 1}`,
  img: `/images/gallery-photo-${i + 1}.jpg`,
}));

export type VideoItem = { id: string; title: string; ytId: string };

export const videos: VideoItem[] = [
  { id: 'gallery-video-1', title: 'Extrait live 1', ytId: 'GWDIwlpFIRU' },
  { id: 'gallery-video-2', title: 'Extrait live 2', ytId: 'lxjpPjrkay4' },
  { id: 'gallery-video-3', title: 'Extrait live 3', ytId: 'ZMsrcyvCJXM' },
  { id: 'gallery-video-4', title: 'Extrait live 4', ytId: '4a91SQEtd_4' },
];

export const actualites = [
  { date: '2 août 2026', title: "Ouverture des inscriptions pour la saison 2026-2027" },
  { date: '18 juil. 2026', title: 'Retour en images sur le Festival Gospel sous les Étoiles' },
  { date: '3 juil. 2026', title: "Vocal Harmony's rejoint le collectif Gospel Île-de-France" },
  { date: '20 juin 2026', title: 'Un nouvel album en préparation pour 2027' },
];

export const partenaires = [
  { id: 'partner-1', label: 'Logo partenaire 1', img: '/images/partner-1.jpg' },
  { id: 'partner-2', label: 'Logo partenaire 2', img: '/images/partner-2.jpg' },
  { id: 'partner-3', label: 'Logo partenaire 3', img: '/images/partner-3.jpg' },
  { id: 'partner-4', label: 'Logo partenaire 4', img: '/images/partner-4.jpg' },
  { id: 'partner-5', label: 'Logo partenaire 5', img: '/images/partner-5.jpg' },
];

export const donationOptions = [20, 50, 100, 200];

export type MemberAccount = { username: string; password: string; name: string };

export const loginAccounts: MemberAccount[] = [
  { username: 'marie', password: 'gospel2026', name: 'Marie Kouadio' },
  { username: 'jean', password: 'gospel2026', name: 'Jean Mbala' },
];

export type Song = { id: string; title: string; voix: string; tonalite: string };

export const repertoire: Song[] = [
  { id: 's1', title: 'Oh Happy Day', voix: 'Chorale complète', tonalite: 'Sol majeur' },
  { id: 's2', title: 'Total Praise', voix: 'SATB', tonalite: 'Mi bémol majeur' },
  { id: 's3', title: 'Way Maker', voix: 'Chorale complète', tonalite: 'Do majeur' },
  { id: 's4', title: 'Nobody Greater', voix: 'Soprano / Alto', tonalite: 'Fa majeur' },
  { id: 's5', title: 'Ndinga Yo (chant traditionnel)', voix: 'Chorale complète', tonalite: 'Ré mineur' },
];

export const trackTypes = [
  { key: 'soprano', label: 'Soprano' },
  { key: 'alto', label: 'Alto' },
  { key: 'tenor', label: 'Ténor' },
  { key: 'basse', label: 'Basse' },
  { key: 'choeur', label: 'Chœur (toutes voix)' },
  { key: 'instrumental', label: 'Instrumentale seule' },
];

export const accentPair = ['#19B5A5', '#FF6257'];
