import { useQuery } from '@tanstack/react-query';
import { kdsService } from '../services/kds.service';
import type { KdsStation } from '../types/kds.types';

export function useKdsTickets(station?: KdsStation) {
  return useQuery({
    queryKey: ['kds', 'tickets', station ?? 'ALL'],
    queryFn: () => kdsService.getTickets(station),
    refetchInterval: 10000,
  });
}
