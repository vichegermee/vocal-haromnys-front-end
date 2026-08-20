import { api } from './client';

export type EventItem = {
  id: number;
  title: string;
  eventDate: string;
  location: string;
  description: string | null;
  detailedDescription: string | null;
  past: boolean;
};

export function fetchEvents(type?: 'upcoming' | 'past'): Promise<EventItem[]> {
  return api.get<EventItem[]>(type ? `/events?type=${type}` : '/events');
}
