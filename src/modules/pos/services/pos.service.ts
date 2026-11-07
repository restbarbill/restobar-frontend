import { apiClient } from '@/lib/api-client';
import type { CreateOrderPayload, Order } from '../types/pos.types';

export const posService = {
  getOpenOrders: async (): Promise<Order[]> => {
    const { data } = await apiClient.get<Order[]>('/pos/orders/open');
    return data;
  },
  createOrder: async (payload: CreateOrderPayload): Promise<Order> => {
    const { data } = await apiClient.post<Order>('/pos/orders', payload);
    return data;
  },
};
