import { api } from './client';

export type DonationRequest = {
  amount: number;
  donorName: string;
  donorEmail: string;
};

export type Donation = {
  id: number;
  amount: number;
  donorName: string;
  donorEmail: string;
  status: string;
  createdAt: string;
};

export function submitDonation(request: DonationRequest): Promise<Donation> {
  return api.post<Donation>('/donations', request);
}
