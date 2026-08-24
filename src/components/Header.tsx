import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth';

const navLinkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
  fontSize: 14,
  color: isActive ? 'var(--coral)' : 'var(--text-on-dark)',
});

const mobileNavLinkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
  display: 'block',
  fontSize: 17,
  padding: '13.2px 0',
  borderBottom: '1px solid rgba(255,253,248,0.12)',
  color: isActive ? 'var(--coral)' : 'var(--text-on-dark)',
});

export function Header() {
  const { loggedIn, currentMember } = useAuth();
  const isAdmin = currentMember?.role === 'ADMIN';
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    function onPointerDown(e: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

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
        onClick={closeMenu}
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

      <div className="nav-desktop">
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
          {isAdmin && <NavLink to="/admin" style={navLinkStyle}>Admin</NavLink>}
        </nav>

        <NavLink to="/contact#rejoindre" className="btn btn-teal btn-sm">
          Nous rejoindre
        </NavLink>
        <NavLink to="/dons" className="btn btn-amber btn-sm">
          Faire un don
        </NavLink>
      </div>

      <div ref={menuRef} className="nav-mobile-wrap">
        <button
          type="button"
          className={`hamburger-btn${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>

        {menuOpen && (
          <nav id="mobile-nav-panel" className="nav-mobile-panel">
            <NavLink to="/" end style={mobileNavLinkStyle} onClick={closeMenu}>Accueil</NavLink>
            <NavLink to="/a-propos" style={mobileNavLinkStyle} onClick={closeMenu}>À propos</NavLink>
            <NavLink to="/choristes" style={mobileNavLinkStyle} onClick={closeMenu}>Choristes</NavLink>
            <NavLink to="/evenements" style={mobileNavLinkStyle} onClick={closeMenu}>Événements</NavLink>
            <NavLink to="/prestations" style={mobileNavLinkStyle} onClick={closeMenu}>Prestations</NavLink>
            <NavLink to="/boutique" style={mobileNavLinkStyle} onClick={closeMenu}>Boutique</NavLink>
            <NavLink to="/galerie" style={mobileNavLinkStyle} onClick={closeMenu}>Galerie</NavLink>
            <NavLink to="/contact" style={mobileNavLinkStyle} onClick={closeMenu}>Contact</NavLink>
            <NavLink to={loggedIn ? '/repertoire' : '/connexion'} style={mobileNavLinkStyle} onClick={closeMenu}>Espace membre</NavLink>
            {isAdmin && (
              <NavLink to="/admin" style={mobileNavLinkStyle} onClick={closeMenu}>Admin</NavLink>
            )}
            <NavLink
              to="/contact#rejoindre"
              className="btn btn-teal"
              onClick={closeMenu}
              style={{ textAlign: 'center', marginTop: 13.2 }}
            >
              Nous rejoindre
            </NavLink>
            <NavLink
              to="/dons"
              className="btn btn-amber"
              onClick={closeMenu}
              style={{ textAlign: 'center', marginTop: 8.8 }}
            >
              Faire un don
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
