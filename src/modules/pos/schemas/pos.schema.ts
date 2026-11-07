import { z } from 'zod';

export const createOrderSchema = z.object({
  customerLabel: z.string().min(2, 'Ingresa el nombre del cliente o mesa'),
  subtotal: z.coerce.number().min(0).optional(),
  billiardCharge: z.coerce.number().min(0).optional(),
});

export type CreateOrderFormValues = z.infer<typeof createOrderSchema>;
