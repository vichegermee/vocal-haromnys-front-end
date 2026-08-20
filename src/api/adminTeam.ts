import { api } from './client';

export type AdminTeamMember = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  /** File name only — the photo lives in public/images/choristers/. */
  photoFilename: string;
  displayOrder: number;
};

export function fetchAdminTeam(): Promise<AdminTeamMember[]> {
  return api.get<AdminTeamMember[]>('/admin-team');
}
