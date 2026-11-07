import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { extractErrorMessage } from '@/lib/api-client';
import { tournamentService } from '../services/tournament.service';
import type { CreateTournamentPayload } from '../types/tournament.types';

export const TOURNAMENT_QUERY_KEY = ['tournaments'] as const;

export function useTournaments() {
  return useQuery({
    queryKey: TOURNAMENT_QUERY_KEY,
    queryFn: tournamentService.getAll,
  });
}

export function useCreateTournament() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTournamentPayload) => tournamentService.create(payload),
    onSuccess: () => {
      toast.success('Torneo creado y guardado en PostgreSQL');
      void queryClient.invalidateQueries({ queryKey: TOURNAMENT_QUERY_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}
