import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ImageSlot } from '../components/ImageSlot';
import { fetchCds, type Cd } from '../api/cds';
import { createCdOrderCheckoutSession, fetchCdOrderSummary, type CdOrderSummary } from '../api/cdOrders';
import { ApiError } from '../api/client';
import { ACCENT_PAIR, SHIPPING_OPTIONS, type ShippingOptionValue } from '../constants';

const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderSummary, setOrderSummary] = useState<CdOrderSummary | null>(null);
  const [orderCanceled, setOrderCanceled] = useState(false);

  const [cds, setCds] = useState<Cd[]>([]);
  const [activeCd, setActiveCd] = useState<Cd | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [shippingOption, setShippingOption] = useState<ShippingOptionValue>('STANDARD');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCds().then(setCds);
  }, []);

  useEffect(() => {
    const checkout = searchParams.get('checkout');
    const sessionId = searchParams.get('session_id');
    if (checkout === 'success' && sessionId) {
      fetchCdOrderSummary(sessionId).then(setOrderSummary).catch(() => {});
      setSearchParams({}, { replace: true });
    } else if (checkout === 'cancel') {
      setOrderCanceled(true);
      setSearchParams({}, { replace: true });
    }
  }, []);

  const shippingCost = SHIPPING_OPTIONS.find((o) => o.value === shippingOption)?.cost ?? 0;
  const total = activeCd ? activeCd.price * quantity + shippingCost : 0;

  function openDialog(cd: Cd) {
    setActiveCd(cd);
    setQuantity(1);
    setShippingOption('STANDARD');
    setError(null);
  }

  function closeDialog() {
    setActiveCd(null);
  }

  async function submitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!activeCd) return;
    const formData = new FormData(e.currentTarget);
    setSubmitting(true);
    setError(null);
    try {
      const { checkoutUrl } = await createCdOrderCheckoutSession({
        cdId: activeCd.id,
        customerName: String(formData.get('customerName') ?? ''),
        customerEmail: String(formData.get('customerEmail') ?? ''),
        customerPhone: String(formData.get('customerPhone') ?? ''),
        quantity,
        shippingStreet: String(formData.get('shippingStreet') ?? ''),
        shippingPostalCode: String(formData.get('shippingPostalCode') ?? ''),
        shippingCity: String(formData.get('shippingCity') ?? ''),
        shippingCountry: String(formData.get('shippingCountry') ?? ''),
        shippingOption,
        message: String(formData.get('message') ?? '') || undefined,
      });
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Une erreur est survenue, réessayez.');
      setSubmitting(false);
    }
  }

  return (
    <section className="section container">
      <h6 className="eyebrow" style={{ color: 'var(--coral)' }}>Boutique</h6>
      <h1 style={{ fontSize: 44, marginBottom: 13.2 }}>Nos albums</h1>
      <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 26.4, maxWidth: 600 }}>
        Choisissez votre album, votre mode de livraison, et réglez en ligne en toute sécurité via Stripe.
      </p>

      {orderSummary && (
        <div className="confirm-box" style={{ marginBottom: 26.4, maxWidth: 440 }}>
          <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 18, marginBottom: 8.8 }}>
            Merci pour votre commande !
          </div>
          <p style={{ fontSize: 14, margin: '0 0 8.8px' }}>
            {orderSummary.paymentStatus === 'PAID'
              ? 'Votre paiement est confirmé — vous recevrez un email de confirmation sous peu.'
              : 'Nous confirmons votre paiement — vous recevrez un email sous peu.'}
          </p>
          <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 4.4 }}>
            <div><strong>Article :</strong> {orderSummary.cdTitle} × {orderSummary.quantity}</div>
            <div><strong>Livraison :</strong> {orderSummary.shippingOptionLabel}</div>
            <div><strong>Total payé :</strong> {priceFormatter.format(orderSummary.totalAmount)}</div>
          </div>
        </div>
      )}
      {orderCanceled && (
        <div
          style={{ padding: 17.6, borderRadius: 20, background: 'var(--navy)', color: 'var(--text-on-dark)', marginBottom: 26.4, fontSize: 14, maxWidth: 440 }}
        >
          Paiement annulé — vous pouvez réessayer quand vous le souhaitez.
        </div>
      )}

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
            overflowY: 'auto',
          }}
        >
          <div
            className="card-dark"
            style={{ width: 'min(480px,100%)', display: 'flex', flexDirection: 'column', gap: 13.2, padding: 26.4, boxShadow: '0 12px 32px rgba(21,33,61,0.22)', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 20 }}>Commander — {activeCd.title}</div>
            {error && (
              <div style={{ padding: '10px 14px', borderRadius: 16, background: 'var(--coral)', color: 'var(--text-on-dark)', fontSize: 13 }}>
                {error}
              </div>
            )}
            <form onSubmit={submitOrder} className="field field-light" style={{ display: 'flex', flexDirection: 'column', gap: 13.2 }}>
              <input name="customerName" required placeholder="Nom complet" />
              <input name="customerEmail" required type="email" placeholder="Email" />
              <input name="customerPhone" required type="tel" placeholder="Téléphone" />
              <div>
                <label style={{ marginBottom: 4.4 }}>Quantité</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                />
              </div>

              <input name="shippingStreet" required placeholder="Adresse (rue, numéro)" />
              <div style={{ display: 'flex', gap: 8.8 }}>
                <input name="shippingPostalCode" required placeholder="Code postal" style={{ flex: 1 }} />
                <input name="shippingCity" required placeholder="Ville" style={{ flex: 2 }} />
              </div>
              <input name="shippingCountry" required placeholder="Pays" />

              <div>
                <label style={{ marginBottom: 8.8 }}>Livraison</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6.6 }}>
                  {SHIPPING_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      style={{ display: 'flex', alignItems: 'center', gap: 8.8, fontSize: 13 }}
                    >
                      <input
                        type="radio"
                        name="shippingOptionRadio"
                        checked={shippingOption === option.value}
                        onChange={() => setShippingOption(option.value)}
                      />
                      {option.label} — {priceFormatter.format(option.cost)}
                    </label>
                  ))}
                </div>
              </div>

              <textarea name="message" placeholder="Message (optionnel)" />

              <div style={{ fontSize: 15, fontFamily: "'Caprasimo',system-ui,sans-serif", textAlign: 'right' }}>
                Total : {priceFormatter.format(total)}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8.8, marginTop: 4.4 }}>
                <button type="button" onClick={closeDialog} className="btn btn-outline">Annuler</button>
                <button type="submit" disabled={submitting} className="btn btn-amber">
                  {submitting ? 'Redirection…' : 'Payer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
