import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createDonationCheckoutSession } from '../api/donations';
import { ApiError } from '../api/client';
import { DONATION_AMOUNTS, DONATION_MIN_AMOUNT } from '../constants';

export function Donations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkoutResult, setCheckoutResult] = useState<'success' | 'cancel' | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Read Stripe's redirect params once on mount only — this intentionally
    // doesn't depend on `searchParams` itself, since clearing them below
    // would otherwise re-trigger the effect.
    const checkout = searchParams.get('checkout');
    if (checkout === 'success' || checkout === 'cancel') {
      setCheckoutResult(checkout);
      setSearchParams({}, { replace: true });
    }
  }, []);

  function selectPreset(v: number) {
    setAmount(v);
    setCustomAmount('');
  }

  function handleCustomAmountChange(value: string) {
    setCustomAmount(value);
    const parsed = Number(value);
    setAmount(value !== '' && Number.isFinite(parsed) && parsed >= DONATION_MIN_AMOUNT ? parsed : null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!amount) {
      setError('Merci de choisir un montant.');
      return;
    }
    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    setError(null);
    try {
      const { checkoutUrl } = await createDonationCheckoutSession({
        amount,
        donorName: String(data.get('donorName') ?? ''),
        donorEmail: String(data.get('donorEmail') ?? ''),
      });
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Une erreur est survenue, réessayez.');
      setSubmitting(false);
    }
  }

  return (
    <section className="section container" style={{ maxWidth: 720 }}>
      <h6 className="eyebrow" style={{ color: 'var(--amber)' }}>Soutenez-nous</h6>
      <h1 style={{ fontSize: 44, marginBottom: 13.2 }}>Faire un don</h1>
      <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 35.2 }}>
        Votre don aide la chorale à financer ses répétitions, ses tenues et ses déplacements pour porter le chant
        gospel au plus grand nombre.
      </p>

      {checkoutResult === 'success' && (
        <div className="confirm-box" style={{ marginBottom: 26.4 }}>
          Merci ! Nous confirmons votre paiement — vous recevrez un email de confirmation sous peu.
        </div>
      )}
      {checkoutResult === 'cancel' && (
        <div
          style={{ padding: 17.6, borderRadius: 20, background: 'var(--navy)', color: 'var(--text-on-dark)', marginBottom: 26.4, fontSize: 14 }}
        >
          Paiement annulé — vous pouvez réessayer quand vous le souhaitez.
        </div>
      )}

      <form onSubmit={handleSubmit} className="card-dark field" style={{ display: 'flex', flexDirection: 'column', gap: 17.6 }}>
        {error && (
          <div style={{ padding: '10px 14px', borderRadius: 16, background: 'var(--coral)', color: 'var(--text-on-dark)', fontSize: 13 }}>
            {error}
          </div>
        )}
        <div>
          <label style={{ marginBottom: 8.8, color: 'var(--text-on-dark)' }}>Montant</label>
          <div style={{ display: 'flex', gap: 8.8, flexWrap: 'wrap', alignItems: 'center' }}>
            {DONATION_AMOUNTS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => selectPreset(v)}
                className="btn"
                style={{
                  padding: '10px 18px',
                  border: `1px solid ${amount === v && !customAmount ? 'var(--amber)' : 'rgba(255,253,248,0.35)'}`,
                  background: amount === v && !customAmount ? 'var(--amber)' : 'transparent',
                  color: amount === v && !customAmount ? 'var(--navy)' : 'var(--text-on-dark)',
                }}
              >
                {v} €
              </button>
            ))}
            <input
              type="number"
              min={DONATION_MIN_AMOUNT}
              step="0.5"
              placeholder="Autre montant"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              style={{
                width: 130,
                padding: '10px 14px',
                fontSize: 14,
                background: 'var(--navy)',
                color: 'var(--text-on-dark)',
                border: `1px solid ${customAmount ? 'var(--amber)' : 'rgba(255,253,248,0.35)'}`,
                borderRadius: 999,
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>
        <div className="field-light">
          <label>Nom complet</label>
          <input name="donorName" required />
        </div>
        <div className="field-light">
          <label>Email</label>
          <input name="donorEmail" required type="email" />
        </div>
        <button type="submit" disabled={submitting} className="btn btn-amber" style={{ marginTop: 8.8, width: '100%' }}>
          {submitting ? 'Redirection…' : `Faire mon don${amount ? ` — ${amount} €` : ''}`}
        </button>
      </form>
    </section>
  );
}
