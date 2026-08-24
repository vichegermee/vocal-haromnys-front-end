import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPartners, type Partner } from '../api/partners';
import { Carousel } from './Carousel';

const LOGO_HEIGHT = 100;

function partnerLabel(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
}

export function Footer() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetchPartners().then(setPartners);
  }, []);

  return (
    <>
      {partners.length > 0 && (
        <section className="section-tight" style={{ background: 'var(--bg)', borderTop: '1px solid rgba(21,33,61,0.1)' }}>
          <div className="container">
            <h2 style={{ fontSize: 24, marginBottom: 26.4, textAlign: 'center' }}>Ils nous ont fait confiance</h2>
            <Carousel height={LOGO_HEIGHT} autoScroll autoScrollSpeed={45}>
              {partners.map((pt) => (
                <div
                  key={pt.id}
                  className="carousel-item"
                  style={{
                    height: LOGO_HEIGHT,
                    padding: '13.2px 26.4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fff',
                    border: '1px solid rgba(21,33,61,0.1)',
                    borderRadius: 20,
                  }}
                >
                  <img
                    src={pt.imageUrl}
                    alt={partnerLabel(pt.id)}
                    style={{ maxHeight: '100%', maxWidth: 180, objectFit: 'contain' }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      )}

      <footer
        style={{
          paddingTop: 44,
          paddingBottom: 26.4,
          paddingRight: 'var(--pad-x)',
          paddingLeft: 'var(--pad-left)',
          background: 'var(--navy)',
          color: 'var(--text-on-dark)',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 26.4, padding: 0 }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8.8, fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 18, marginBottom: 8.8 }}>
              <img src="/logo-vocal-or.png" alt="" width="67.2" height="67.2" style={{ objectFit: 'contain' }} />
              <span>
                Vocal <span style={{ color: 'var(--teal)' }}>Harmony's</span>
              </span>
            </div>
            <p style={{ fontSize: 13, opacity: 0.7, maxWidth: 280, margin: 0 }}>
              Chorale Afro-Gospel - Reims, France
            </p>
          </div>
          <nav style={{ display: 'flex', gap: 17.6, flexWrap: 'wrap', fontSize: 13 }}>
            <Link to="/" style={{ color: 'var(--text-on-dark)' }}>Accueil</Link>
            <Link to="/a-propos" style={{ color: 'var(--text-on-dark)' }}>À propos</Link>
            <Link to="/choristes" style={{ color: 'var(--text-on-dark)' }}>Choristes</Link>
            <Link to="/evenements" style={{ color: 'var(--text-on-dark)' }}>Événements</Link>
            <Link to="/prestations" style={{ color: 'var(--text-on-dark)' }}>Prestations</Link>
            <Link to="/boutique" style={{ color: 'var(--text-on-dark)' }}>Boutique</Link>
            <Link to="/galerie" style={{ color: 'var(--text-on-dark)' }}>Galerie</Link>
            <Link to="/contact" style={{ color: 'var(--text-on-dark)' }}>Contact</Link>
            <Link to="/dons" style={{ color: 'var(--text-on-dark)' }}>Dons</Link>
            <Link to="/connexion" style={{ color: 'var(--text-on-dark)' }}>Espace membre</Link>
          </nav>
          <div style={{ display: 'flex', gap: 13.2 }}>
            <a
              href="https://www.instagram.com/groupevocalharmonys?igsh=MzVoN2NpZHgzN20x"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vocal Harmony's sur Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFDF8" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="#FFFDF8" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/1ALM4ckR9T/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vocal Harmony's sur Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFDF8" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@groupevocalharmonys?_t=ZN-8uHEPSzmXdG&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vocal Harmony's sur TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFDF8" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16.5 2v11.5a3.5 3.5 0 1 1-3.5-3.5" />
                <path d="M16.5 2c.4 2.6 2.2 4.5 4.8 4.9" />
              </svg>
            </a>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, opacity: 0.5, marginTop: 35.2 }}>
          © 2026 Vocal Harmony's. Tous droits réservés.
        </p>
      </footer>
    </>
  );
}
