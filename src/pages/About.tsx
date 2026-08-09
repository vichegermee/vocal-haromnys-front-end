import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageSlot } from '../components/ImageSlot';
import { fetchChoristers, type Chorister } from '../api/choristers';
import { ACCENT_PAIR, VOICE_PART_LABELS } from '../constants';

const guides = [
  { title: 'Foi', desc: 'Chaque chant est une prière ; la musique est notre manière de témoigner.' },
  { title: 'Unité', desc: 'Des origines et des parcours différents, une seule voix quand nous chantons.' },
  { title: 'Excellence', desc: 'Des répétitions exigeantes, au service d’un chant offert avec soin.' },
];

export function About() {
  const [choristers, setChoristers] = useState<Chorister[]>([]);

  useEffect(() => {
    fetchChoristers().then(setChoristers);
  }, []);

  const preview = choristers.slice(0, 4);

  return (
    <>
      <section className="section container">
        <h6 className="eyebrow" style={{ color: 'var(--coral)' }}>À propos</h6>
        <h1 style={{ fontSize: 44, marginBottom: 44 }}>Notre histoire</h1>
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 44, alignItems: 'start' }}>
          <ImageSlot
            label="Photo des fondateurs ou d'une répétition"
            src="/images/about-histoire-photo.jpg"
            shape="rounded"
            radius={28}
            style={{ width: '100%', aspectRatio: '4/5' }}
          />
          <div>
            <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 17.6 }}>
              Vocal Harmony's est née en 2012 à Paris, autour d'une poignée d'amis originaires du Cameroun, du Congo
              et de Côte d'Ivoire, réunis par le même besoin de chanter leur foi dans leur langue et leurs rythmes
              d'origine.
            </p>
            <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 17.6 }}>
              Ce qui a commencé comme une petite fraternité de chant dans un salon parisien est devenu, au fil des
              années, une chorale de plus de trente voix, invitée dans des églises, des festivals et des salles de
              concert à travers toute la France.
            </p>
            <p style={{ fontSize: 16, opacity: 0.85 }}>
              Aujourd'hui encore, chaque répétition commence par une prière et se termine par un chant — parce que
              pour nous, la musique n'a jamais été qu'un divertissement.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ background: 'var(--bg)' }}>
        <div className="container" style={{ maxWidth: 900, textAlign: 'center' }}>
          <h2 style={{ fontSize: 30, marginBottom: 17.6 }}>Notre mission</h2>
          <p style={{ fontSize: 18, opacity: 0.85 }}>
            Porter la foi et la culture africaine à travers un gospel vivant, transmettre la joie de chanter
            ensemble, et créer, à chaque prestation, un moment de communion accessible à tous — croyants ou simples
            amoureux de belles voix.
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
            <h2 style={{ fontSize: 28 }}>Nos choristes</h2>
            <Link to="/choristes" className="link-cta">Voir tous les choristes →</Link>
          </div>
          <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
            {preview.map((c, i) => (
              <div key={c.id} className="card-dark" style={{ padding: 17.6, display: 'flex', flexDirection: 'column', gap: 8.8 }}>
                <ImageSlot label="Photo du choriste" src={c.imageUrl} shape="rounded" radius={20} style={{ width: '100%', aspectRatio: '1/1' }} />
                <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 16, marginTop: 4.4 }}>{c.name}</div>
                <span className="badge" style={{ background: ACCENT_PAIR[i % 2] }}>{VOICE_PART_LABELS[c.voicePart]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
