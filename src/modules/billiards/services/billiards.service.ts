import { apiClient } from '@/lib/api-client';
import type { BilliardSession } from '../types/billiards.types';

export const billiardsService = {
  getActiveSessions: async (): Promise<BilliardSession[]> => {
    const { data } = await apiClient.get<BilliardSession[]>('/billiards/sessions/active');
    return data;
  },
  stopSession: async (id: string): Promise<BilliardSession> => {
    const { data } = await apiClient.patch<BilliardSession>(`/billiards/sessions/${id}/stop`);
    return data;
  },
};
