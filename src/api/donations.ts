import { api } from './client';

export type DonationCheckoutRequest = {
  amount: number;
  donorName: string;
  donorEmail: string;
};

export type DonationCheckoutResponse = {
  donationId: number;
  checkoutUrl: string;
};

export type Donation = {
  id: number;
  amount: number;
  donorName: string;
  donorEmail: string;
  status: string;
  paymentStatus: string;
  paidAt: string | null;
  createdAt: string;
};

/** Creates a Stripe Checkout Session for this donation; redirect the browser to the returned checkoutUrl. */
export function createDonationCheckoutSession(request: DonationCheckoutRequest): Promise<DonationCheckoutResponse> {
  return api.post<DonationCheckoutResponse>('/donations/checkout-sessions', request);
}
