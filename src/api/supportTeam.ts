import { api } from './client';

export type SupportTeamMember = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  /** File name only — the photo lives in public/images/choristers/. Null if none yet. */
  photoFilename: string | null;
  displayOrder: number;
};

export function fetchSupportTeam(): Promise<SupportTeamMember[]> {
  return api.get<SupportTeamMember[]>('/support-team');
}
