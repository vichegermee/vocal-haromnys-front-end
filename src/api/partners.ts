import { api } from './client';

export type Partner = {
  id: number;
  label: string;
  imageUrl: string;
  displayOrder: number;
};

export function fetchPartners(): Promise<Partner[]> {
  return api.get<Partner[]>('/partners');
}
