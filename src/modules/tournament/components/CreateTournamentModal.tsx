import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import {
  createTournamentSchema,
  type CreateTournamentFormValues,
} from '../schemas/tournament.schema';
import { useCreateTournament } from '../hooks/use-tournament';

export const CreateTournamentModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const createMutation = useCreateTournament();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTournamentFormValues>({
    resolver: zodResolver(createTournamentSchema),
    defaultValues: {
      name: '',
      gameType: 'POOL_8',
      format: 'SINGLE_ELIMINATION',
      maxPlayers: 16,
      entryFee: 150,
      startDate: new Date().toISOString().slice(0, 16),
      rulesNotes: '',
    },
  });

  if (!open) return null;

  const onSubmit = async (values: CreateTournamentFormValues) => {
    await createMutation.mutateAsync({
      ...values,
      startDate: new Date(values.startDate).toISOString(),
    });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white">Crear Nuevo Torneo de Billar</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400">
              Nombre del Torneo
            </label>
            <input
              {...register('name')}
              placeholder="Ej. Torneo Nocturno Bola 8 VIP"
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-400">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400">
                Modalidad de Juego
              </label>
              <select
                {...register('gameType')}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white"
              >
                <option value="POOL_8">Bola 8 (Pool)</option>
                <option value="POOL_9">Bola 9 (Pool)</option>
                <option value="POOL_10">Bola 10 (Pool)</option>
                <option value="CARAMBOLA">Carambola 3 Bandas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400">
                Formato de Llaves
              </label>
              <select
                {...register('format')}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white"
              >
                <option value="SINGLE_ELIMINATION">Eliminación Directa</option>
                <option value="DOUBLE_ELIMINATION">Doble Eliminación</option>
                <option value="ROUND_ROBIN">Todos contra Todos</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400">
                Cupo Jugadores
              </label>
              <input
                type="number"
                {...register('maxPlayers')}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400">
                Inscripción ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('entryFee')}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400">
                Fecha Inicio
              </label>
              <input
                type="datetime-local"
                {...register('startDate')}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-2.5 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400">
              Reglas / Notas
            </label>
            <textarea
              rows={2}
              {...register('rulesNotes')}
              placeholder="Ej. Match a ganar 3 de 5 mesas..."
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 cursor-pointer"
            >
              {createMutation.isPending ? 'Creando...' : 'Crear Torneo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
