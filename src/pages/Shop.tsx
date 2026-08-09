import { useEffect, useState } from 'react';
import { ImageSlot } from '../components/ImageSlot';
import { fetchCds, type Cd } from '../api/cds';
import { submitCdOrder } from '../api/cdOrders';
import { ApiError } from '../api/client';
import { ACCENT_PAIR } from '../constants';

const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export function Shop() {
  const [cds, setCds] = useState<Cd[]>([]);
  const [activeCd, setActiveCd] = useState<Cd | null>(null);
  const [orderSent, setOrderSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCds().then(setCds);
  }, []);

  function openDialog(cd: Cd) {
    setActiveCd(cd);
    setOrderSent(false);
    setError(null);
  }

  function closeDialog() {
    setActiveCd(null);
  }

  async function submitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!activeCd) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    setError(null);
    try {
      await submitCdOrder({
        cdId: activeCd.id,
        customerName: String(formData.get('customerName') ?? ''),
        customerEmail: String(formData.get('customerEmail') ?? ''),
        quantity: Number(formData.get('quantity') ?? 1) || 1,
        message: String(formData.get('message') ?? '') || undefined,
      });
      setOrderSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Une erreur est survenue, réessayez.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section container">
      <h6 className="eyebrow" style={{ color: 'var(--coral)' }}>Boutique</h6>
      <h1 style={{ fontSize: 44, marginBottom: 13.2 }}>Nos albums</h1>
      <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 44, maxWidth: 600 }}>
        Nos CD sont disponibles à la commande — le règlement se fait ensuite directement avec vous, par virement ou
        en main propre lors d'un concert.
      </p>

      <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 26.4 }}>
        {cds.map((cd, i) => (
          <div key={cd.id} className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: 8.8 }}>
            <ImageSlot label="Pochette d'album" src={cd.imageUrl} shape="rounded" radius={20} style={{ width: '100%', aspectRatio: '1/1' }} />
            <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 18, marginTop: 8.8 }}>{cd.title}</div>
            <div style={{ fontSize: 12, opacity: 0.65 }}>{cd.releaseYear}</div>
            <p style={{ fontSize: 13, opacity: 0.8, flex: 1, margin: 0 }}>{cd.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8.8 }}>
              <span style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 16, color: 'var(--amber)' }}>
                {priceFormatter.format(cd.price)}
              </span>
              <button
                onClick={() => openDialog(cd)}
                className="btn btn-sm"
                style={{ background: ACCENT_PAIR[i % 2], color: 'var(--text-on-dark)' }}
              >
                Commander
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeCd && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            padding: 17.6,
            background: 'rgba(21,33,61,0.5)',
            zIndex: 100,
          }}
        >
          <div
            className="card-dark"
            style={{ width: 'min(440px,100%)', display: 'flex', flexDirection: 'column', gap: 13.2, padding: 26.4, boxShadow: '0 12px 32px rgba(21,33,61,0.22)' }}
          >
            {orderSent ? (
              <>
                <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 20 }}>Merci pour votre commande !</div>
                <p style={{ fontSize: 14, opacity: 0.85 }}>
                  Nous vous recontactons pour convenir du règlement et de la remise du CD.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8.8 }}>
                  <button onClick={closeDialog} className="btn btn-coral">Fermer</button>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 20 }}>Commander — {activeCd.title}</div>
                <p style={{ fontSize: 13, opacity: 0.7, margin: 0 }}>
                  {priceFormatter.format(activeCd.price)} — règlement à convenir avec vous après confirmation.
                </p>
                {error && (
                  <div style={{ padding: '10px 14px', borderRadius: 16, background: 'var(--coral)', color: 'var(--text-on-dark)', fontSize: 13 }}>
                    {error}
                  </div>
                )}
                <form onSubmit={submitOrder} className="field field-light" style={{ display: 'flex', flexDirection: 'column', gap: 13.2 }}>
                  <input name="customerName" required placeholder="Nom complet" />
                  <input name="customerEmail" required type="email" placeholder="Email" />
                  <input name="quantity" type="number" min={1} defaultValue={1} placeholder="Quantité" />
                  <textarea name="message" placeholder="Message (optionnel)" />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8.8, marginTop: 4.4 }}>
                    <button type="button" onClick={closeDialog} className="btn btn-outline">Annuler</button>
                    <button type="submit" disabled={submitting} className="btn btn-amber">
                      {submitting ? 'Envoi…' : 'Confirmer'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
