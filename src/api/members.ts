import { api } from './client';
import type { Member } from './auth';

export type CreateMemberRequest = {
  firstName: string;
  lastName?: string;
  email: string;
  role?: 'MEMBER' | 'ADMIN';
};

export type BulkImportRow = {
  firstName: string;
  lastName?: string;
  email: string;
};

export type BulkImportResult = {
  firstName: string;
  lastName: string | null;
  email: string;
  created: boolean;
  error: string | null;
};

export function fetchMembers(): Promise<Member[]> {
  return api.get<Member[]>('/members');
}

export function createMember(request: CreateMemberRequest): Promise<Member> {
  return api.post<Member>('/members', request);
}

export function bulkImportMembers(rows: BulkImportRow[]): Promise<BulkImportResult[]> {
  return api.post<BulkImportResult[]>('/members/bulk-import', { members: rows });
}

export function deleteMember(id: number): Promise<void> {
  return api.delete<void>(`/members/${id}`);
}

export function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  return api.put<void>('/members/me/password', { currentPassword, newPassword });
}
