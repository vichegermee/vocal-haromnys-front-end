import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export function Login() {
  const { loggedIn, initializing, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (initializing) return null;
  if (loggedIn) {
    return <Navigate to="/repertoire" replace />;
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    setSubmitting(true);
    const success = await login(username, password);
    setSubmitting(false);
    if (success) {
      setError(false);
      navigate('/repertoire');
    } else {
      setError(true);
    }
  }

  return (
    <section className="section container" style={{ maxWidth: 480 }}>
      <h6 className="eyebrow" style={{ color: 'var(--amber)' }}>Réservé aux membres</h6>
      <h1 style={{ fontSize: 36, marginBottom: 8.8 }}>Espace membre</h1>
      <p style={{ fontSize: 14, opacity: 0.75, marginBottom: 26.4 }}>
        Connectez-vous avec l'identifiant personnel qui vous a été communiqué par la direction de la chorale.
      </p>
      {error && (
        <div style={{ padding: '13.2px 17.6px', borderRadius: 20, background: 'var(--coral)', color: 'var(--text-on-dark)', fontSize: 13, marginBottom: 17.6 }}>
          Identifiant ou mot de passe incorrect.
        </div>
      )}
      <form onSubmit={handleLogin} className="card-dark field field-light" style={{ display: 'flex', flexDirection: 'column', gap: 13.2 }}>
        <div>
          <label style={{ color: 'rgba(255,253,248,0.7)' }}>Identifiant</label>
          <input name="username" required />
        </div>
        <div>
          <label style={{ color: 'rgba(255,253,248,0.7)' }}>Mot de passe</label>
          <input name="password" type="password" required />
        </div>
        <button type="submit" className="btn btn-coral" disabled={submitting} style={{ marginTop: 8.8, width: '100%' }}>
          {submitting ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </section>
  );
}
