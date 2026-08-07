import { useState } from 'react';

const pupitres = ['Soprano', 'Alto', 'Ténor', 'Basse'];

export function Contact() {
  const [reservationSent, setReservationSent] = useState(false);
  const [joinSent, setJoinSent] = useState(false);
  const [pupitre, setPupitre] = useState<string | null>(null);

  return (
    <section className="section container">
      <h6 className="eyebrow" style={{ color: 'var(--teal)' }}>Contact</h6>
      <h1 style={{ fontSize: 44, marginBottom: 35.2 }}>Parlons-en</h1>

      <div style={{ display: 'flex', gap: 35.2, flexWrap: 'wrap', marginBottom: 52.8, fontSize: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8.8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6257" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 6l-10 7L2 6" />
            <path d="M2 6h20v12H2z" />
          </svg>
          contact@vocalharmonys.fr
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8.8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6257" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.99.36 1.96.68 2.89a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.19-1.25a2 2 0 0 1 2.11-.45c.93.32 1.9.55 2.89.68A2 2 0 0 1 22 16.92z" />
          </svg>
          +33 1 23 45 67 89
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8.8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6257" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Paris, France
        </div>
      </div>

      <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))', gap: 44 }}>
        <div>
          <h2 style={{ fontSize: 22, marginBottom: 17.6 }}>Réserver une prestation</h2>
          {reservationSent ? (
            <div className="confirm-box">
              Merci ! Votre demande de prestation a bien été envoyée — nous revenons vers vous rapidement.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setReservationSent(true);
              }}
              className="field"
              style={{ display: 'flex', flexDirection: 'column', gap: 13.2 }}
            >
              <div>
                <label>Type d'événement</label>
                <input required placeholder="Culte, mariage, festival…" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13.2 }}>
                <div>
                  <label>Date souhaitée</label>
                  <input type="date" required />
                </div>
                <div>
                  <label>Budget approximatif</label>
                  <input placeholder="Optionnel" />
                </div>
              </div>
              <div>
                <label>Lieu</label>
                <input required placeholder="Ville, salle, église…" />
              </div>
              <div>
                <label>Nombre de choristes souhaité</label>
                <input placeholder="Optionnel" />
              </div>
              <div>
                <label>Message</label>
                <textarea placeholder="Parlez-nous de votre projet" />
              </div>
              <button type="submit" className="btn btn-coral" style={{ marginTop: 8.8, width: '100%' }}>
                Envoyer la demande
              </button>
            </form>
          )}
        </div>

        <div>
          <h2 style={{ fontSize: 22, marginBottom: 17.6 }}>Rejoindre la chorale</h2>
          {joinSent ? (
            <div className="confirm-box">
              Merci pour votre message ! Nous vous recontacterons pour organiser une écoute.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setJoinSent(true);
              }}
              className="field"
              style={{ display: 'flex', flexDirection: 'column', gap: 13.2 }}
            >
              <div>
                <label>Pupitre vocal</label>
                <div style={{ display: 'inline-flex', overflow: 'hidden', border: '1px solid rgba(21,33,61,0.16)', borderRadius: 999 }}>
                  {pupitres.map((p, i) => (
                    <label
                      key={p}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '7px 12px',
                        fontSize: 13,
                        cursor: 'pointer',
                        borderLeft: i > 0 ? '1px solid rgba(21,33,61,0.16)' : 'none',
                        background: pupitre === p ? 'var(--navy)' : 'transparent',
                        color: pupitre === p ? 'var(--text-on-dark)' : 'var(--navy)',
                      }}
                    >
                      <input
                        type="radio"
                        name="pupitre"
                        value={p}
                        checked={pupitre === p}
                        onChange={() => setPupitre(p)}
                        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                      />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label>Expérience musicale</label>
                <input placeholder="Chorale, conservatoire, autodidacte…" />
              </div>
              <div>
                <label>Disponibilités</label>
                <input placeholder="Jours et soirs disponibles pour répéter" />
              </div>
              <div>
                <label>Lien audio/vidéo (optionnel)</label>
                <input placeholder="Un extrait de vous en train de chanter" />
              </div>
              <div>
                <label>Votre motivation</label>
                <textarea required placeholder="Pourquoi souhaitez-vous rejoindre Vocal Harmony's ?" />
              </div>
              <button type="submit" className="btn btn-teal" style={{ marginTop: 8.8, width: '100%' }}>
                Envoyer ma candidature
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
