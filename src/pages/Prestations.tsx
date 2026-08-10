import { Link } from 'react-router-dom';
import { ImageSlot } from '../components/ImageSlot';
import { ACCENT_PAIR } from '../constants';

const categories = [
  {
    id: 'concerts',
    title: 'Concerts',
    teaser: "Des scènes d'église aux marchés de Noël, un moment de communion à chaque fois.",
    icon: (
      <path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Z M7 11a5 5 0 0 0 10 0 M12 16v4 M9 20h6" />
    ),
  },
  {
    id: 'mariage',
    title: 'Mariage',
    teaser: 'Cérémonie religieuse ou laïque, un répertoire pensé pour vous ressembler.',
    icon: <path d="M8 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M16 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M8 13v4h8v-4" />,
  },
  {
    id: 'animations',
    title: 'Animations diverses',
    teaser: "Marché de Noël, soirée d'entreprise, baptême, communion, anniversaire...",
    icon: <path d="M5 3v4M3 5h4M19 14v4M17 16h4M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" />,
  },
  {
    id: 'engagements',
    title: 'Engagements et solidarité',
    teaser: 'Onze ans de concerts et d\'animations au profit de causes qui nous tiennent à cœur.',
    icon: <path d="M12 20.5s-7-4.35-9.5-8.5C.9 8.6 2.4 5 6 5c2 0 3.4 1.1 4 2.4C10.6 6.1 12 5 14 5c3.6 0 5.1 3.6 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5Z" />,
  },
];

const timeline = [
  {
    year: 2018,
    title: 'Maraude au parvis de la gare centre de Reims',
    org: "Association « Deux mains, c'est maintenant »",
  },
  { year: 2018, title: 'Animation pour les aînés de la Ville d\'Époye', org: "Ville d'Époye" },
  { year: 2019, title: 'Concert de Noël pour les aînés de la Résidence médicale Roux à Reims', org: 'Résidence Roux' },
  { year: 2020, title: 'Interchorale pour les enfants atteints de cancer du sang', org: 'Ville de Tinqueux' },
  { year: 2020, title: 'Concert « Galettes des Rois » servi par un personnel handicapé', org: 'Saint Sixte' },
  { year: 2024, title: "Interchorale pour l'association Rose", org: 'Ville de Tinqueux' },
  { year: 2024, title: "Concert au profit de l'Arche de Reims", org: "L'Arche de Reims" },
  { year: 2025, title: "Interchorale pour l'UNICEF", org: 'Ville de Tinqueux' },
  { year: 2025, title: '31ᵉ Rencontre de Chorales pour le Burkina Faso', org: 'Burkina Entraide — Reims' },
  { year: 2025, title: 'Concert humanitaire pour le Burkina Faso', org: 'Burkina Santé — Prunay' },
  { year: 2025, title: 'Interchorale pour le quartier de Châtillon', org: 'Ville de Reims' },
];

const concertVideos = ['hosanna.mp4', 'glory-glory.mp4', 'sitholile.mp4'];

/** "glory-glory.mp4" -> "Glory Glory" — the video's own file name is what's shown as its title. */
function videoTitle(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const weddingFormulas = [
  {
    name: 'Formule Intime',
    lineup: '6 choristes + 1 pianiste',
    features: ['Sono incluse', '6 chants inclus', 'Sortie accompagnée'],
  },
  {
    name: 'Formule Harmonie',
    lineup: '8 choristes + 1 pianiste + 1 guitare',
    features: ['Sono incluse', '7 chants inclus', 'Sortie accompagnée'],
  },
  {
    name: 'Formule Grand Chœur',
    lineup: '10 choristes et plus + 1 pianiste + 1 guitare + 1 cajon',
    features: ['Sono incluse', '10 chants inclus', 'Sortie accompagnée', "Animation au vin d'honneur"],
  },
];

function CategoryIcon({ path, color }: { path: React.ReactNode; color: string }) {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--text-on-dark)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {path}
      </svg>
    </div>
  );
}

export function Prestations() {
  return (
    <>
      <section className="section container">
        <h6 className="eyebrow" style={{ color: 'var(--amber)' }}>Ce que nous proposons</h6>
        <h1 style={{ fontSize: 44, marginBottom: 17.6 }}>Nos prestations</h1>
        <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 640, marginBottom: 44 }}>
          Concert, cérémonie, événement privé ou professionnel, engagement solidaire — Vocal Harmony's met sa voix
          au service de vos moments. Choisissez une catégorie pour en savoir plus.
        </p>

        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/prestations#${cat.id}`}
              className="card-dark"
              style={{ display: 'flex', flexDirection: 'column', gap: 13.2 }}
            >
              <CategoryIcon path={cat.icon} color={ACCENT_PAIR[i % 2]} />
              <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 18 }}>{cat.title}</div>
              <p style={{ fontSize: 13, opacity: 0.75, margin: 0, flex: 1 }}>{cat.teaser}</p>
              <span className="link-cta" style={{ color: 'var(--amber)' }}>En savoir plus →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------ Concerts ------------------------------ */}
      <section id="concerts" className="section container" style={{ scrollMarginTop: 96 }}>
        <h6 className="eyebrow" style={{ color: 'var(--teal)' }}>01 — Concerts &amp; festivals</h6>
        <h2 style={{ fontSize: 32, marginBottom: 22 }}>Un moment de communion, à chaque fois</h2>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 680, marginBottom: 13.2 }}>
          Chaque concert de Vocal Harmony's est pensé pour se vivre ensemble. Le public qui se déplace en repart
          toujours avec quelque chose — un souvenir, une émotion, l'envie de revenir.
        </p>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 680, marginBottom: 13.2 }}>
          Cette énergie vient d'abord de nous : une même passion pour le chant choral qui nous réunit à chaque
          occasion, sur toutes sortes de scènes — église, salle de spectacle, en plein air, événement caritatif,
          salon professionnel, événement de collectivité, marché de Noël, fête étudiante. Peu importe le lieu, nous
          y apportons la même chose : notre voix, notre joie, et l'envie sincère de la partager.
        </p>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 680, marginBottom: 35.2 }}>
          Avec Vocal Harmony's, attendez-vous à un moment inoubliable, porté par l'émotion, la joie et une énergie
          qui se communique jusque dans le public.
        </p>

        <h3 style={{ fontSize: 18, marginBottom: 17.6 }}>Nos concerts en images</h3>
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
          {concertVideos.map((file) => (
            <div key={file} className="card-dark" style={{ padding: 17.6, display: 'flex', flexDirection: 'column', gap: 8.8 }}>
              <video
                controls
                preload="metadata"
                style={{ width: '100%', aspectRatio: '16/9', borderRadius: 20, background: '#000', display: 'block' }}
              >
                <source src={`/images/video/${file}`} type="video/mp4" />
              </video>
              <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 14, color: 'var(--text-on-dark)' }}>
                {videoTitle(file)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------ Mariage ------------------------------ */}
      <section id="mariage" className="section container" style={{ scrollMarginTop: 96, background: 'var(--bg)' }}>
        <h6 className="eyebrow" style={{ color: 'var(--coral)' }}>02 — Mariage religieux ou laïque</h6>
        <h2 style={{ fontSize: 32, marginBottom: 35.2 }}>Une cérémonie qui vous ressemble</h2>

        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 44, alignItems: 'start', marginBottom: 52.8 }}>
          <ImageSlot
            label="Photo de mariage"
            src="/images/mariage.jpg"
            shape="rounded"
            radius={28}
            style={{ width: '100%', aspectRatio: '3/2' }}
          />
          <div>
            <h3 style={{ fontSize: 20, marginBottom: 8.8 }}>Cérémonie religieuse</h3>
            <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 17.6 }}>
              Notre répertoire de chants liturgiques africains, negro-spirituals, traditionnels et gospel est un
              point de départ, pas un menu figé — nous prenons le temps d'échanger avec vous pour que chaque chant
              choisi trouve sa juste place dans votre cérémonie.
            </p>
            <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 22 }}>
              Nous accompagnons la messe dans son intégralité, dès l'entrée des mariés en procession, en petite ou
              grande formation, avec ou sans musiciens selon vos souhaits. Une fois la célébration terminée, nous
              vous escortons jusqu'au parvis en chantant encore — un dernier moment de joie partagée avec vos
              invités, votre famille, vos ami·e·s.
            </p>
            <h3 style={{ fontSize: 20, marginBottom: 8.8 }}>Cérémonie laïque</h3>
            <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 17.6 }}>
              L'échange des engagements et des vœux, à votre façon : c'est tout l'esprit de la cérémonie laïque.
              Nous échangeons directement avec votre célébrant pour vous garantir une cérémonie personnalisée, du
              premier au dernier chant.
            </p>
            <p style={{ fontSize: 14, opacity: 0.85 }}>
              Une chanson qui vous tient particulièrement à cœur ? Nous l'adaptons et l'intégrons pleinement à notre
              répertoire. Du début à la fin de la préparation, nous restons à votre écoute, pour que cette journée
              réponde exactement à ce que vous avez imaginé.
            </p>
          </div>
        </div>

        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', marginBottom: 52.8 }}>
          <div className="card-dark">
            <h3 style={{ fontSize: 19, marginBottom: 8.8 }}>Émotion</h3>
            <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>
              Notre répertoire réunit des chants prenants et entraînants, de ceux qui ne laissent personne
              indifférent.
            </p>
          </div>
          <div className="card-dark">
            <h3 style={{ fontSize: 19, marginBottom: 8.8 }}>Unique</h3>
            <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>
              Ce jour n'arrive qu'une fois. Nous mettons tout notre cœur à le rendre exceptionnel, parce que
              célébrer l'amour, c'est le célébrer dans la joie.
            </p>
          </div>
        </div>

        <h3 style={{ fontSize: 22, marginBottom: 22 }}>Nos formules pour votre cérémonie</h3>
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
          {weddingFormulas.map((f, i) => (
            <div key={f.name} className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: 8.8 }}>
              <span className="badge" style={{ background: ACCENT_PAIR[i % 2] }}>{f.name}</span>
              <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 16 }}>{f.lineup}</div>
              <ul style={{ margin: 0, padding: '0 0 0 17.6px', fontSize: 13, opacity: 0.85, flex: 1 }}>
                {f.features.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>
              <div style={{ fontSize: 13, opacity: 0.7 }}>Sur devis</div>
            </div>
          ))}
        </div>
        <div className="card-dark" style={{ marginTop: 22, padding: 26.4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 22, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>
            Chaque devis est établi sur mesure après échange avec vous.
          </p>
          <Link to="/contact" className="btn btn-light" style={{ whiteSpace: 'nowrap' }}>Demander un devis</Link>
        </div>
      </section>

      {/* ------------------------------ Animations diverses ------------------------------ */}
      <section id="animations" className="section container" style={{ scrollMarginTop: 96 }}>
        <h6 className="eyebrow" style={{ color: 'var(--amber)' }}>03 — Animations diverses</h6>
        <h2 style={{ fontSize: 32, marginBottom: 22 }}>Une ambiance festive, sur mesure</h2>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 680, marginBottom: 13.2 }}>
          Envie d'une ambiance festive et chaleureuse pour votre événement ? Vous êtes au bon endroit. Marché de
          Noël, animation commerciale, soirée d'entreprise : nous savons adapter notre énergie pour que le moment
          soit à la fois agréable et mémorable.
        </p>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 680, marginBottom: 44 }}>
          Baptême, communion, anniversaire — les grandes étapes de la vie se fêtent aussi en chansons. Nous mettons
          la même joie et le même soin à rendre chacun de ces moments inoubliable.
        </p>

        <div className="card-dark" style={{ padding: 35.2, borderRadius: 32 }}>
          <h3 style={{ fontSize: 20, color: 'var(--text-on-dark)', marginBottom: 8.8 }}>Messes dominicales</h3>
          <p style={{ fontSize: 14, color: 'var(--text-on-dark)', opacity: 0.85, marginBottom: 22, maxWidth: 600 }}>
            Nos voix accompagnent aussi régulièrement les messes dominicales dans nos paroisses partenaires, dans la
            même ferveur qu'un concert.
          </p>
          <ImageSlot
            label="Photo lors d'une célébration"
            src="/images/messe.jpg"
            shape="rounded"
            radius={20}
            style={{ width: '100%', maxWidth: 480, aspectRatio: '3/2' }}
          />
        </div>
      </section>

      {/* ------------------------------ Engagements et solidarité ------------------------------ */}
      <section id="engagements" className="section container" style={{ scrollMarginTop: 96, background: 'var(--bg)' }}>
        <h6 className="eyebrow" style={{ color: 'var(--teal)' }}>04 — Engagements et solidarité</h6>
        <h2 style={{ fontSize: 32, marginBottom: 22 }}>Chanter aussi pour les autres</h2>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 680, marginBottom: 44 }}>
          Depuis 2018, Vocal Harmony's prête régulièrement sa voix à des causes qui lui tiennent à cœur — maraudes,
          associations, hôpitaux, solidarité internationale. Voici, dans l'ordre, les temps forts de cet engagement.
        </p>

        <div style={{ position: 'relative', paddingLeft: 26.4 }}>
          <div style={{ position: 'absolute', left: 4.4, top: 6, bottom: 6, width: 2, background: 'rgba(21,33,61,0.14)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26.4 }}>
            {timeline.map((item, i) => (
              <div key={`${item.year}-${item.title}`} style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: -26.4,
                    top: 4,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: ACCENT_PAIR[i % 2],
                    border: '2px solid var(--bg)',
                  }}
                />
                <span className="badge" style={{ background: ACCENT_PAIR[i % 2], marginBottom: 6.6 }}>{item.year}</span>
                <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 15, marginBottom: 2.2 }}>{item.title}</div>
                <div style={{ fontSize: 13, opacity: 0.65 }}>{item.org}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 26.4, flexWrap: 'wrap', paddingBottom: 70 }}>
        <div>
          <h6 className="eyebrow" style={{ color: 'var(--amber)' }}>Une idée en tête ?</h6>
          <h2 style={{ fontSize: 26 }}>Parlons de votre projet</h2>
        </div>
        <Link to="/contact" className="btn btn-amber" style={{ whiteSpace: 'nowrap' }}>Nous contacter</Link>
      </section>
    </>
  );
}
