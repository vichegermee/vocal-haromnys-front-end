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
