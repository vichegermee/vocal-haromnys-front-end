import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageSlot } from '../components/ImageSlot';
import { PhotoFadeCarousel } from '../components/PhotoFadeCarousel';
import { fetchAboutPhotos, type AboutPhoto } from '../api/aboutPhotos';
import { fetchAdminTeam, type AdminTeamMember } from '../api/adminTeam';
import { fetchSupportTeam, type SupportTeamMember } from '../api/supportTeam';
import { JoinChoirCta } from '../components/JoinChoirCta';

const guides = [
  { title: 'Inspiration', desc: 'Puiser dans la spiritualité du Gospel pour transmettre, à travers nos voix, des messages d’espérance, de joie et d’amour.' },
  { title: 'Unité', desc: 'Des origines, des cultures et des parcours différents, une même voix lorsque nous chantons.' },
  { title: 'Excellence', desc: 'Travailler chaque voix et chaque harmonie avec exigence pour offrir des prestations sincères, vibrantes et de qualité.' },
];

export function About() {
  const [photos, setPhotos] = useState<AboutPhoto[]>([]);
  const [team, setTeam] = useState<AdminTeamMember[]>([]);
  const [supportTeam, setSupportTeam] = useState<SupportTeamMember[]>([]);

  useEffect(() => {
    fetchAboutPhotos().then(setPhotos);
    fetchAdminTeam().then(setTeam);
    fetchSupportTeam().then(setSupportTeam);
  }, []);

  return (
    <>
      <section className="section container">
        <h6 className="eyebrow" style={{ color: 'var(--coral)' }}>À propos</h6>
        <h1 style={{ fontSize: 44, marginBottom: 44 }}>Notre histoire</h1>
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 44, alignItems: 'start' }}>
          <PhotoFadeCarousel
            images={photos.map((p) => p.imageUrl)}
            alt="Photo des fondateurs ou d'une répétition"
            shape="rounded"
            radius={28}
            style={{ width: '100%', aspectRatio: '4/5' }}
          />
          <div>
            <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 17.6 }}>
              Installé à Reims, le Groupe Vocal Harmony's est aujourd'hui l'une des chorales les plus reconnues de
              la Ville des Sacres. Son style dynamique traverse sans complexe le chant africain, classique, gospel,
              negro-spiritual, traditionnel et liturgique — une palette large, au service d'une seule et même
              émotion. Entrer dans notre univers, c'est se laisser transporter par l'intensité de notre musique.
            </p>
            <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 17.6 }}>
              Le groupe est né de plusieurs rencontres. Chacune de ces personnes avait déjà acquis, au fil des
              années et de ses propres expériences, une réelle maturité dans le chant choral ; ensemble, elles ont
              fait le pari de fonder un chœur porté par des valeurs partagées : la convivialité, l'exigence du
              travail vocal et l'amour de ce chant sacré. C'est ainsi qu'est né, en octobre 2018 à Reims, dans la
              Marne, le Groupe Vocal Harmony's — sept membres, à l'origine, réunis autour d'une même conviction.
            </p>
            <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 17.6 }}>
              Depuis, la chorale s'est considérablement étoffée. Elle rassemble aujourd'hui des choristes de bon
              niveau, jeunes et moins jeunes, venus de tous horizons — Afrique, Antilles, France — étudiants,
              salariés ou intermittents, tous animés par la même ambition : mettre en valeur le chant choral. Tous
              partagent aussi une même passion pour le gospel, et chaque événement est l'occasion, pour ce groupe de
              passionnés, de se retrouver, de partager des moments forts et de communiquer cette passion dans une
              chaleureuse convivialité avec son public.
            </p>
            <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 17.6 }}>
              S'inspirant des chœurs dits « afro », le répertoire de Vocal Harmony's conjugue aussi bien le chant
              gospel traditionnel et contemporain que le chant traditionnel africain, le chant liturgique, le
              negro-spiritual et le spiritual. C'est une manière d'honorer, dans une même prestation, la diversité
              des voix et des héritages qui composent le groupe, et de faire vivre un chant qui puise dans plusieurs
              traditions à la fois.
            </p>
            <p style={{ fontSize: 16, opacity: 0.85 }}>
              Entrez dans notre univers, et laissez-vous transporter par les émotions intenses de notre musique.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ background: 'var(--bg)' }}>
        <div className="container" style={{ maxWidth: 900, textAlign: 'center' }}>
          <h2 style={{ fontSize: 30, marginBottom: 17.6 }}>Notre mission</h2>
          <p style={{ fontSize: 18, opacity: 0.85 }}>
            Faire de chaque voix une rencontre, de chaque chant un partage et de chaque prestation un moment unique où cultures, émotions et énergie se rejoignent autour de l’Afro-Gospel.
          </p>
        </div>
      </section>

      <section className="section container">
        <h2 style={{ fontSize: 28, marginBottom: 35.2, textAlign: 'center' }}>Ce qui nous guide</h2>
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
          {guides.map((g) => (
            <div key={g.title} className="card-dark">
              <h3 style={{ fontSize: 19, marginBottom: 8.8 }}>{g.title}</h3>
              <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight" style={{ background: 'var(--bg)', paddingBottom: 70 }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 13.2, marginBottom: 35.2 }}>
            <h2 style={{ fontSize: 28 }}>Notre équipe</h2>
            <Link to="/choristes" className="link-cta">Voir tous les choristes →</Link>
          </div>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 44 }}>
            Guidée par une équipe coordinatrice bénévole, elle est à l’initiative de projets divers. Cette équipe favorise l’épanouissement et la découverte de ses choristes. Leur engagement continu reflète la vitalité de cette chorale dynamique du Grand Est.
          </p>
          <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, 220px)' }}>
            {team.map((m) => (
              <div key={m.id} className="card-dark" style={{ padding: 17.6, display: 'flex', flexDirection: 'column', gap: 8.8 }}>
                <ImageSlot
                  label={`Photo de ${m.firstName} ${m.lastName}`}
                  src={`/images/choristers/${m.photoFilename}`}
                  shape="rounded"
                  radius={20}
                  style={{ width: '100%', aspectRatio: '1/1' }}
                />
                <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 16, marginTop: 4.4 }}>
                  {m.firstName} {m.lastName}
                </div>
                <p style={{ fontSize: 13, opacity: 0.8, margin: 0 }}>{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ background: 'var(--bg)', paddingBottom: 70 }}>
        <div className="container">
          <h2 style={{ fontSize: 28, marginBottom: 35.2 }}>L’équipe d’accompagnement</h2>
          <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, 220px)' }}>
            {supportTeam.map((m) => (
              <div key={m.id} className="card-dark" style={{ padding: 17.6, display: 'flex', flexDirection: 'column', gap: 8.8 }}>
                <ImageSlot
                  label={`Photo de ${m.firstName} ${m.lastName}`}
                  src={m.photoFilename ? `/images/choristers/${m.photoFilename}` : undefined}
                  shape="rounded"
                  radius={20}
                  style={{ width: '100%', aspectRatio: '1/1' }}
                />
                <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 16, marginTop: 4.4 }}>
                  {m.firstName} {m.lastName}
                </div>
                <p style={{ fontSize: 13, opacity: 0.8, margin: 0 }}>{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container" style={{ paddingTop: 0 }}>
        <JoinChoirCta />
      </section>
    </>
  );
}
