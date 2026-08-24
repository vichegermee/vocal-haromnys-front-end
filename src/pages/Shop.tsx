import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ImageSlot } from '../components/ImageSlot';
import { fetchCds, type Cd } from '../api/cds';
import { fetchCdOrderSummary, type CdOrderSummary } from '../api/cdOrders';
import { ACCENT_PAIR } from '../constants';

const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

// "Commander" sends buyers straight to the album on Amazon Music.
const AMAZON_ALBUM_URL =
  'https://amazon.fr/music/player/albums/B0BS68DJRC?marketplaceId=A13V1IB3VIYZZH&musicTerritory=FR&ref=dm_sh_DUGIClKMnzZdrwBMmG7hNsVd8';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderSummary, setOrderSummary] = useState<CdOrderSummary | null>(null);
  const [orderCanceled, setOrderCanceled] = useState(false);

  const [cds, setCds] = useState<Cd[]>([]);

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

  return (
    <section className="section container">
      <h6 className="eyebrow" style={{ color: 'var(--coral)' }}>Boutique</h6>
      <h1 style={{ fontSize: 44, marginBottom: 13.2 }}>Nos albums</h1>
      <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 26.4, maxWidth: 600 }}>
        Retrouvez et commandez notre album sur Amazon Music.
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

      <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 26.4 }}>
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
              <a
                href={AMAZON_ALBUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{ background: ACCENT_PAIR[i % 2], color: 'var(--text-on-dark)' }}
              >
                Commander
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
