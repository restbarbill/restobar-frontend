import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { extractErrorMessage } from '@/lib/api-client';
import { billiardsService } from '../services/billiards.service';

export const BILLIARDS_ACTIVE_KEY = ['billiards', 'active'] as const;

export function useActiveBilliardSessions() {
  return useQuery({
    queryKey: BILLIARDS_ACTIVE_KEY,
    queryFn: billiardsService.getActiveSessions,
    refetchInterval: 15000,
  });
}

export function useStopBilliardSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => billiardsService.stopSession(id),
    onSuccess: (closed) => {
      toast.success(`Tiempo cerrado en ${closed.tableName}. Total: $${closed.totalCharge}`);
      void queryClient.invalidateQueries({ queryKey: BILLIARDS_ACTIVE_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}
