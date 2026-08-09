import { api } from './client';

export type TrackType = 'SOPRANO' | 'ALTO' | 'TENOR' | 'BASSE' | 'CHOEUR' | 'INSTRUMENTAL';

export type AudioTrack = {
  id: number;
  trackType: TrackType;
  fileUrl: string;
};

export type Song = {
  id: number;
  title: string;
  voicing: string;
  musicalKey: string;
  tracks: AudioTrack[];
};

/** Requires a logged-in member — see auth.tsx. */
export function fetchSongs(): Promise<Song[]> {
  return api.get<Song[]>('/songs');
}
