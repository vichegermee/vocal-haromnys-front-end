import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth';

const navLinkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
  fontSize: 14,
  color: isActive ? 'var(--coral)' : 'var(--text-on-dark)',
});

export function Header() {
  const { loggedIn } = useAuth();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 26.4,
        paddingTop: 13.2,
        paddingBottom: 13.2,
        paddingRight: 'var(--pad-x)',
        paddingLeft: 'var(--pad-left)',
        background: 'rgba(21,33,61,0.92)',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid rgba(255,253,248,0.14)',
        flexWrap: 'wrap',
      }}
    >
      <NavLink
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8.8,
          fontFamily: "'Caprasimo',system-ui,sans-serif",
          fontSize: 19,
          marginRight: 'auto',
        }}
      >
        <img src="/logo-vocal-or.png" alt="" width="72.8" height="72.8" style={{ objectFit: 'contain' }} />
        <span style={{ color: 'var(--text-on-dark)' }}>
          Vocal <span style={{ color: 'var(--teal)' }}>Harmony's</span>
        </span>
      </NavLink>

      <nav style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
        <NavLink to="/" end style={navLinkStyle}>Accueil</NavLink>
        <NavLink to="/a-propos" style={navLinkStyle}>À propos</NavLink>
        <NavLink to="/choristes" style={navLinkStyle}>Choristes</NavLink>
        <NavLink to="/evenements" style={navLinkStyle}>Événements</NavLink>
        <NavLink to="/prestations" style={navLinkStyle}>Prestations</NavLink>
        <NavLink to="/boutique" style={navLinkStyle}>Boutique</NavLink>
        <NavLink to="/galerie" style={navLinkStyle}>Galerie</NavLink>
        <NavLink to="/contact" style={navLinkStyle}>Contact</NavLink>
        <NavLink to={loggedIn ? '/repertoire' : '/connexion'} style={navLinkStyle}>Espace membre</NavLink>
      </nav>

      <NavLink to="/dons" className="btn btn-amber btn-sm">
        Faire un don
      </NavLink>
    </header>
  );
}
