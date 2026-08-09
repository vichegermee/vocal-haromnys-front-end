import { api } from './client';

export type GalleryPhoto = {
  id: number;
  label: string;
  imageUrl: string;
  displayOrder: number;
};

export type GalleryVideo = {
  id: number;
  title: string;
  youtubeId: string;
  displayOrder: number;
};

export function fetchGalleryPhotos(): Promise<GalleryPhoto[]> {
  return api.get<GalleryPhoto[]>('/gallery/photos');
}

export function fetchGalleryVideos(): Promise<GalleryVideo[]> {
  return api.get<GalleryVideo[]>('/gallery/videos');
}
