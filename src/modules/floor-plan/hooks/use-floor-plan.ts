import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { extractErrorMessage } from '@/lib/api-client';
import { floorPlanService } from '../services/floor-plan.service';
import type { CreateVenueTablePayload } from '../types/floor-plan.types';

export const FLOOR_PLAN_QUERY_KEY = ['floor-plan', 'tables'] as const;

export function useVenueTables() {
  return useQuery({
    queryKey: FLOOR_PLAN_QUERY_KEY,
    queryFn: floorPlanService.getTables,
  });
}

export function useCreateVenueTable() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateVenueTablePayload) => floorPlanService.createTable(payload),
    onSuccess: () => {
      toast.success('Mesa registrada en PostgreSQL correctamente');
      void queryClient.invalidateQueries({ queryKey: FLOOR_PLAN_QUERY_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}
