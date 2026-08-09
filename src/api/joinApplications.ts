import { api } from './client';
import type { VoicePart } from './choristers';

export type JoinApplicationRequest = {
  voicePart: VoicePart;
  experience?: string;
  availability?: string;
  audioLink?: string;
  motivation: string;
  applicantName: string;
  applicantEmail: string;
};

export type JoinApplication = JoinApplicationRequest & {
  id: number;
  status: string;
  createdAt: string;
};

export function submitJoinApplication(request: JoinApplicationRequest): Promise<JoinApplication> {
  return api.post<JoinApplication>('/join-applications', request);
}
