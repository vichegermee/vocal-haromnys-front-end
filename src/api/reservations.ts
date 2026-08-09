import { api } from './client';

export type ReservationRequest = {
  eventType: string;
  desiredDate: string;
  budget?: string;
  location: string;
  choristerCount?: string;
  message?: string;
  requesterName: string;
  requesterEmail: string;
};

export type Reservation = ReservationRequest & {
  id: number;
  status: string;
  createdAt: string;
};

export function submitReservation(request: ReservationRequest): Promise<Reservation> {
  return api.post<Reservation>('/reservations', request);
}
