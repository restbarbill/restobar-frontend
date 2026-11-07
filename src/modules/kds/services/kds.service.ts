import { apiClient } from '@/lib/api-client';
import type { KdsStation, KdsTicket, KdsTicketStatus } from '../types/kds.types';

export const kdsService = {
  getTickets: async (station?: KdsStation): Promise<KdsTicket[]> => {
    const { data } = await apiClient.get<KdsTicket[]>('/kds/tickets', {
      params: station ? { station } : undefined,
    });
    return data;
  },
  updateStatus: async (id: string, status: KdsTicketStatus): Promise<KdsTicket> => {
    const { data } = await apiClient.patch<KdsTicket>(`/kds/tickets/${id}/status`, {
      status,
    });
    return data;
  },
};
