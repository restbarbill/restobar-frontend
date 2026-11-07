import { useQuery } from '@tanstack/react-query';
import { inventoryService } from '../services/inventory.service';

export const INVENTORY_PRODUCTS_KEY = ['inventory', 'products'] as const;

export function useProducts() {
  return useQuery({
    queryKey: INVENTORY_PRODUCTS_KEY,
    queryFn: inventoryService.getProducts,
  });
}
