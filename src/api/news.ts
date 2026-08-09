import { api } from './client';

export type NewsItem = {
  id: number;
  itemDate: string;
  title: string;
};

export function fetchNews(): Promise<NewsItem[]> {
  return api.get<NewsItem[]>('/news');
}
