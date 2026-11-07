import { apiClient } from '@/lib/api-client';
import type { CashShift } from '../types/cash-register.types';

export const cashRegisterService = {
  getShifts: async (): Promise<CashShift[]> => {
    const { data } = await apiClient.get<CashShift[]>('/cash-register/shifts');
    return data;
  },
};
