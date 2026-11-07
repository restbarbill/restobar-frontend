import { z } from 'zod';

export const createTournamentSchema = z.object({
  name: z.string().min(3, 'El nombre del torneo debe tener al menos 3 caracteres'),
  gameType: z.enum(['POOL_8', 'POOL_9', 'POOL_10', 'CARAMBOLA']),
  format: z.enum(['SINGLE_ELIMINATION', 'DOUBLE_ELIMINATION', 'ROUND_ROBIN']),
  maxPlayers: z.coerce.number().int().min(4, 'Mínimo 4 jugadores para un torneo'),
  entryFee: z.coerce.number().min(0, 'La inscripción no puede ser negativa'),
  startDate: z.string().min(1, 'Selecciona la fecha y hora de inicio'),
  rulesNotes: z.string().optional(),
});

export type CreateTournamentFormValues = z.infer<typeof createTournamentSchema>;
