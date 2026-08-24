import { api } from './client';

export type Member = {
  id: number;
  username: string;
  fullName: string;
  email: string | null;
  role: string;
};

export type LoginResponse = {
  token: string;
  member: Member;
};

export function login(username: string, password: string): Promise<LoginResponse> {
  return api.post<LoginResponse>('/auth/login', { username, password });
}

export function fetchCurrentMember(): Promise<Member> {
  return api.get<Member>('/auth/me');
}
