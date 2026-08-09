import { api } from './client';

export type Cd = {
  id: number;
  title: string;
  releaseYear: number;
  price: number;
  description: string;
  imageUrl: string;
};

export function fetchCds(): Promise<Cd[]> {
  return api.get<Cd[]>('/cds');
}
