import { Link } from 'react-router-dom';

/** Recruitment banner reused across several pages — the choir is actively recruiting. */
export function JoinChoirCta() {
  return (
    <div
      className="card-dark"
      style={{ padding: 35.2, borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 22, flexWrap: 'wrap' }}
    >
      <div>
        <h3 style={{ fontSize: 20, color: 'var(--text-on-dark)', marginBottom: 4.4 }}>Envie de nous rejoindre ?</h3>
        <p style={{ fontSize: 14, color: 'var(--text-on-dark)', opacity: 0.8, margin: 0 }}>
          La chorale recrute de nouvelles voix pour la saison — débutant·e·s comme expérimenté·e·s, tous les
          pupitres sont ouverts.
        </p>
      </div>
      <Link to="/contact#rejoindre" className="btn btn-teal" style={{ whiteSpace: 'nowrap' }}>
        Je m'inscris
      </Link>
    </div>
  );
}
