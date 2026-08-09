import { api } from './client';

export type VoicePart = 'SOPRANO' | 'ALTO' | 'TENOR' | 'BASSE';

export type Chorister = {
  id: number;
  name: string;
  voicePart: VoicePart;
  description: string;
  imageUrl: string;
  displayOrder: number;
};

export function fetchChoristers(): Promise<Chorister[]> {
  return api.get<Chorister[]>('/choristers');
}
