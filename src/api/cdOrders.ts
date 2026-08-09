import { api } from './client';

export type CdOrderRequest = {
  cdId: number;
  customerName: string;
  customerEmail: string;
  quantity: number;
  message?: string;
};

export type CdOrder = {
  id: number;
  cdTitleSnapshot: string;
  unitPriceSnapshot: number;
  customerName: string;
  customerEmail: string;
  quantity: number;
  message: string | null;
  status: string;
  createdAt: string;
};

export function submitCdOrder(request: CdOrderRequest): Promise<CdOrder> {
  return api.post<CdOrder>('/cd-orders', request);
}
