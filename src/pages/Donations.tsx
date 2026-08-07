import { useState } from 'react';
import { donationOptions } from '../data';

export function Donations() {
  const [donationSent, setDonationSent] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);

  return (
    <section className="section container" style={{ maxWidth: 720 }}>
      <h6 className="eyebrow" style={{ color: 'var(--amber)' }}>Soutenez-nous</h6>
      <h1 style={{ fontSize: 44, marginBottom: 13.2 }}>Faire un don</h1>
      <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 35.2 }}>
        Votre don aide la chorale à financer ses répétitions, ses tenues et ses déplacements pour porter le chant
        gospel au plus grand nombre.
      </p>

      {donationSent ? (
        <div className="confirm-box">Merci infiniment pour votre générosité ! Un reçu vous sera envoyé par email.</div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDonationSent(true);
          }}
          className="card-dark field"
          style={{ display: 'flex', flexDirection: 'column', gap: 17.6 }}
        >
          <div>
            <label style={{ marginBottom: 8.8 }}>Montant</label>
            <div style={{ display: 'flex', gap: 8.8, flexWrap: 'wrap' }}>
              {donationOptions.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(v)}
                  className="btn"
                  style={{
                    padding: '10px 18px',
                    border: `1px solid ${amount === v ? 'var(--amber)' : 'rgba(255,253,248,0.35)'}`,
                    background: amount === v ? 'var(--amber)' : 'transparent',
                    color: amount === v ? 'var(--navy)' : 'var(--text-on-dark)',
                  }}
                >
                  {v} €
                </button>
              ))}
            </div>
          </div>
          <div className="field-light">
            <label>Nom complet</label>
            <input required />
          </div>
          <div className="field-light">
            <label>Email</label>
            <input required type="email" />
          </div>
          <button type="submit" className="btn btn-amber" style={{ marginTop: 8.8, width: '100%' }}>
            Faire mon don{amount ? ` — ${amount} €` : ''}
          </button>
        </form>
      )}
    </section>
  );
}
