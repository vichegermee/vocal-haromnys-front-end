import { api } from './client';

export type VoicePart = 'SOPRANO' | 'ALTO' | 'TENOR' | 'BASSE';

export type Chorister = {
  id: number;
  name: string;
  /** Free text (e.g. "Soprano", "Manager") — not the 4-value VoicePart enum
   * below, which is only for the "rejoindre la chorale" form. */
  voicePart: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
};

export function fetchChoristers(): Promise<Chorister[]> {
  return api.get<Chorister[]>('/choristers');
}
