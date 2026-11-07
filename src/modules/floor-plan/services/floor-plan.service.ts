import { apiClient } from '@/lib/api-client';
import type { CreateVenueTablePayload, VenueTable } from '../types/floor-plan.types';

export const floorPlanService = {
  getTables: async (): Promise<VenueTable[]> => {
    const { data } = await apiClient.get<VenueTable[]>('/floor-plan/tables');
    return data;
  },
  createTable: async (payload: CreateVenueTablePayload): Promise<VenueTable> => {
    const { data } = await apiClient.post<VenueTable>('/floor-plan/tables', payload);
    return data;
  },
  deleteTable: async (id: string): Promise<void> => {
    await apiClient.delete(`/floor-plan/tables/${id}`);
  },
};
