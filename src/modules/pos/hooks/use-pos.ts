import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { extractErrorMessage } from '@/lib/api-client';
import { posService } from '../services/pos.service';
import type { CreateOrderPayload } from '../types/pos.types';

export const POS_OPEN_ORDERS_KEY = ['pos', 'orders', 'open'] as const;

export function useOpenOrders() {
  return useQuery({
    queryKey: POS_OPEN_ORDERS_KEY,
    queryFn: posService.getOpenOrders,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => posService.createOrder(payload),
    onSuccess: (order) => {
      toast.success(`Comanda ${order.orderNumber} abierta en PostgreSQL`);
      void queryClient.invalidateQueries({ queryKey: POS_OPEN_ORDERS_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}
