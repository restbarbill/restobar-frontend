import { apiClient } from '@/lib/api-client';
import type { Product } from '../types/inventory.types';

export const inventoryService = {
  getProducts: async (): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>('/inventory/products');
    return data;
  },
};
