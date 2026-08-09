import type { VoicePart } from './api/choristers';

/** Alternating accent colors for badges/cards in repeated lists — pure UI styling, not content from the API. */
export const ACCENT_PAIR = ['#19B5A5', '#FF6257'];

/** Display labels for the VoicePart enum the API returns (SOPRANO, ALTO, ...). */
export const VOICE_PART_LABELS: Record<VoicePart, string> = {
  SOPRANO: 'Soprano',
  ALTO: 'Alto',
  TENOR: 'Ténor',
  BASSE: 'Basse',
};

/** Preset donation amounts shown as quick-select buttons. */
export const DONATION_AMOUNTS = [20, 50, 100, 200];

/** Stripe's minimum charge amount in EUR — mirrors the backend's @DecimalMin("0.50"). */
export const DONATION_MIN_AMOUNT = 0.5;

/** The two delivery methods offered when ordering a CD — mirrors the backend's ShippingOption enum (label + cost). */
export const SHIPPING_OPTIONS = [
  { value: 'STANDARD', label: 'Livraison standard (5 jours)', cost: 2.99 },
  { value: 'EXPRESS', label: 'Livraison express', cost: 5 },
] as const;

export type ShippingOptionValue = (typeof SHIPPING_OPTIONS)[number]['value'];
