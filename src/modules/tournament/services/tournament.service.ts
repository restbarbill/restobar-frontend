import { apiClient } from '@/lib/api-client';
import type { CreateTournamentPayload, Tournament } from '../types/tournament.types';

export const tournamentService = {
  getAll: async (): Promise<Tournament[]> => {
    const { data } = await apiClient.get<Tournament[]>('/tournament');
    return data;
  },
  create: async (payload: CreateTournamentPayload): Promise<Tournament> => {
    const { data } = await apiClient.post<Tournament>('/tournament', payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/tournament/${id}`);
  },
};
