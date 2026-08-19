import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageSlot } from '../components/ImageSlot';
import { PhotoFadeCarousel } from '../components/PhotoFadeCarousel';
import { fetchEvents, type EventItem } from '../api/events';
import { fetchHomeBanners, type HomeBanner } from '../api/homeBanners';
import { ACCENT_PAIR } from '../constants';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

export function Home() {
  const [preview, setPreview] = useState<EventItem[]>([]);
  const [banners, setBanners] = useState<HomeBanner[]>([]);

  useEffect(() => {
    fetchEvents('upcoming').then((events) => setPreview(events.slice(0, 3)));
    fetchHomeBanners().then(setBanners);
  }, []);

  return (
    <>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', height: '52vh', minHeight: 340 }}>
          <PhotoFadeCarousel
            images={banners.map((b) => b.imageUrl)}
            alt="Photo du groupe en concert (plein cadre)"
            shape="rect"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div
          style={{
            background: 'var(--navy)',
            paddingTop: 44,
            paddingBottom: 52.8,
            paddingRight: 'var(--pad-x)',
            paddingLeft: 'var(--pad-left)',
          }}
        >
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="eyebrow" style={{ color: 'var(--amber)' }}>Chorale Afro-Gospel - Reims</div>
            <h1 style={{ fontSize: 56, color: 'var(--text-on-dark)', lineHeight: 1.05, marginBottom: 8.8 }}>
              Vocal <span style={{ color: 'var(--teal)' }}>Harmony's</span>
            </h1>
            <div style={{ width: 120, height: 6, borderRadius: 4, background: 'var(--amber)', marginBottom: 17.6 }} />
            <p style={{ fontSize: 18, color: 'var(--text-on-dark)', opacity: 0.9, maxWidth: 520, marginBottom: 26.4 }}>
              Des voix venues d'Afrique et de sa diaspora, unies pour porter la foi, la joie et l'espérance en chant.
            </p>
            <div style={{ display: 'flex', gap: 13.2, flexWrap: 'wrap' }}>
              <Link to="/evenements" className="btn btn-coral">Voir nos événements</Link>
              <Link to="/contact" className="btn btn-teal">Nous rejoindre</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 44 }}>
          <ImageSlot
            label="Photo de répétition ou de concert"
            src="/images/home-mission-photo.jpg"
            shape="rounded"
            radius={28}
            style={{ width: '100%', aspectRatio: '4/3' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h6 className="eyebrow" style={{ color: 'var(--teal)' }}>Notre mission</h6>
            <h2 style={{ fontSize: 32, marginBottom: 13.2 }}>Chanter pour rassembler</h2>
            <p style={{ opacity: 0.85, marginBottom: 22, maxWidth: 440 }}>
              Depuis 2012, Vocal Harmony's mêle rythmes traditionnels africains et gospel contemporain pour créer des
              moments de communion, de foi et de fête — sur scène comme dans les églises.
            </p>
            <Link to="/a-propos" className="link-cta">En savoir plus sur notre histoire →</Link>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 13.2, marginBottom: 35.2 }}>
            <h2 style={{ fontSize: 28 }}>Prochaines prestations</h2>
            <Link to="/evenements" className="link-cta">Tous les événements →</Link>
          </div>
          <div className="grid-auto">
            {preview.map((ev, i) => (
              <Link
                key={ev.id}
                to={`/evenements#event-${ev.id}`}
                className="card-dark"
                style={{ display: 'flex', flexDirection: 'column', gap: 8.8 }}
              >
                <span className="badge" style={{ background: ACCENT_PAIR[i % 2] }}>{dateFormatter.format(new Date(ev.eventDate))}</span>
                <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 18 }}>{ev.title}</div>
                <div style={{ fontSize: 13, opacity: 0.7 }}>{ev.location}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section container" style={{ background: 'var(--navy)' }}>
        <p style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 24, color: 'var(--text-on-dark)', lineHeight: 1.4 }}>
          « Chaque concert est une prière chantée à plusieurs voix — c'est ce qui nous rassemble depuis le premier jour. »
        </p>
        <p style={{ textAlign: 'center', marginTop: 17.6, fontSize: 13, color: 'var(--text-on-dark)', opacity: 0.75 }}>
          — Les choristes de Vocal Harmony's
        </p>
      </section>

      <section className="section-tight container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 26.4, flexWrap: 'wrap' }}>
        <div>
          <h6 className="eyebrow" style={{ color: 'var(--amber)' }}>Boutique</h6>
          <h2 style={{ fontSize: 26 }}>Découvrez notre dernier album</h2>
        </div>
        <Link to="/boutique" className="btn btn-amber" style={{ whiteSpace: 'nowrap' }}>Voir la boutique</Link>
      </section>
    </>
  );
}
