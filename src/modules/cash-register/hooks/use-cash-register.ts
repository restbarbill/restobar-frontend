import { useQuery } from '@tanstack/react-query';
import { cashRegisterService } from '../services/cash-register.service';

export function useCashShifts() {
  return useQuery({
    queryKey: ['cash-register', 'shifts'],
    queryFn: cashRegisterService.getShifts,
  });
}
