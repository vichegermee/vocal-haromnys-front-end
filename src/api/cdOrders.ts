import { api } from './client';
import type { ShippingOptionValue } from '../constants';

export type CdOrderCheckoutRequest = {
  cdId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  quantity: number;
  shippingStreet: string;
  shippingPostalCode: string;
  shippingCity: string;
  shippingCountry: string;
  shippingOption: ShippingOptionValue;
  message?: string;
};

export type CdOrderCheckoutResponse = {
  cdOrderId: number;
  checkoutUrl: string;
};

export type CdOrderSummary = {
  cdTitle: string;
  quantity: number;
  unitPrice: number;
  shippingOptionLabel: string;
  shippingCost: number;
  totalAmount: number;
  paymentStatus: string;
};

/** Creates a Stripe Checkout Session for this order; redirect the browser to the returned checkoutUrl. */
export function createCdOrderCheckoutSession(request: CdOrderCheckoutRequest): Promise<CdOrderCheckoutResponse> {
  return api.post<CdOrderCheckoutResponse>('/cd-orders/checkout-sessions', request);
}

/** Looked up by the Stripe session id from the success redirect, not the order's own id. */
export function fetchCdOrderSummary(stripeCheckoutSessionId: string): Promise<CdOrderSummary> {
  return api.get<CdOrderSummary>(`/cd-orders/by-session/${encodeURIComponent(stripeCheckoutSessionId)}`);
}
