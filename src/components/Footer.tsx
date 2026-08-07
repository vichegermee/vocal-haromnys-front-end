import { Link } from 'react-router-dom';
import { partenaires } from '../data';
import { ImageSlot } from './ImageSlot';

export function Footer() {
  return (
    <>
      <section className="section-tight" style={{ background: 'var(--bg)', borderTop: '1px solid rgba(21,33,61,0.1)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, marginBottom: 26.4 }}>Nos partenaires</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 26.4 }}>
            {partenaires.map((pt) => (
              <ImageSlot key={pt.id} label={pt.label} src={pt.img} shape="rounded" radius={16} style={{ width: 140, height: 70 }} />
            ))}
          </div>
        </div>
      </section>

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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18V5l11-2v13" stroke="#FFC857" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="18" r="3" fill="#19B5A5" />
                <circle cx="17" cy="16" r="3" fill="#FF6257" />
              </svg>
              <span>
                Vocal <span style={{ color: 'var(--teal)' }}>Harmony's</span>
              </span>
            </div>
            <p style={{ fontSize: 13, opacity: 0.7, maxWidth: 280, margin: 0 }}>
              Chorale gospel africaine · Paris, France
            </p>
          </div>
          <nav style={{ display: 'flex', gap: 17.6, flexWrap: 'wrap', fontSize: 13 }}>
            <Link to="/" style={{ color: 'var(--text-on-dark)' }}>Accueil</Link>
            <Link to="/a-propos" style={{ color: 'var(--text-on-dark)' }}>À propos</Link>
            <Link to="/choristes" style={{ color: 'var(--text-on-dark)' }}>Choristes</Link>
            <Link to="/evenements" style={{ color: 'var(--text-on-dark)' }}>Événements</Link>
            <Link to="/boutique" style={{ color: 'var(--text-on-dark)' }}>Boutique</Link>
            <Link to="/galerie" style={{ color: 'var(--text-on-dark)' }}>Galerie</Link>
            <Link to="/contact" style={{ color: 'var(--text-on-dark)' }}>Contact</Link>
            <Link to="/dons" style={{ color: 'var(--text-on-dark)' }}>Dons</Link>
            <Link to="/connexion" style={{ color: 'var(--text-on-dark)' }}>Espace membre</Link>
          </nav>
          <div style={{ display: 'flex', gap: 13.2 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFDF8" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="#FFFDF8" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFDF8" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFDF8" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.5 6.2s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.2-1C16 2.5 12 2.5 12 2.5h0s-4 0-7.4.4c-.5.1-1.4.1-2.2 1-.7.7-.9 2.3-.9 2.3S1.2 8 1.2 9.8v1.5c0 1.8.3 3.6.3 3.6s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.2.4 7.2.4s4 0 7.4-.4c.5-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.3-1.8.3-3.6V9.8c0-1.8-.3-3.6-.3-3.6z" />
              <polygon points="9.8,8.1 15.8,11.5 9.8,14.9" />
            </svg>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, opacity: 0.5, marginTop: 35.2 }}>
          © 2026 Vocal Harmony's. Tous droits réservés.
        </p>
      </footer>
    </>
  );
}
