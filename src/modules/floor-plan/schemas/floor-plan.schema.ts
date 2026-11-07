import { z } from 'zod';

export const createVenueTableSchema = z.object({
  name: z.string().min(2, 'El nombre de la mesa es obligatorio'),
  zoneName: z.string().min(2, 'La zona es obligatoria'),
  category: z.enum([
    'RESTAURANT',
    'BAR',
    'BILLIARD_POOL',
    'BILLIARD_CAROM',
    'BILLIARD_SNOOKER',
  ]),
  capacity: z.coerce.number().int().min(1, 'Capacidad mínima de 1 persona'),
  hourlyRate: z.coerce.number().min(0, 'La tarifa no puede ser negativa').optional(),
});

export type CreateVenueTableFormValues = z.infer<typeof createVenueTableSchema>;
