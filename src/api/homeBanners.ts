import { api } from './client';

export type HomeBanner = {
  id: number;
  imageUrl: string;
  displayOrder: number;
};

export function fetchHomeBanners(): Promise<HomeBanner[]> {
  return api.get<HomeBanner[]>('/home-banners');
}
