import { api } from './client';

export type AboutPhoto = {
  id: number;
  imageUrl: string;
  displayOrder: number;
};

export function fetchAboutPhotos(): Promise<AboutPhoto[]> {
  return api.get<AboutPhoto[]>('/about-photos');
}
