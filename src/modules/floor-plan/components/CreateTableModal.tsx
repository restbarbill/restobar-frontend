import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import {
  createVenueTableSchema,
  type CreateVenueTableFormValues,
} from '../schemas/floor-plan.schema';
import { useCreateVenueTable } from '../hooks/use-floor-plan';

export const CreateTableModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const createMutation = useCreateVenueTable();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVenueTableFormValues>({
    resolver: zodResolver(createVenueTableSchema),
    defaultValues: {
      name: '',
      zoneName: 'Zona de Billar',
      category: 'BILLIARD_POOL',
      capacity: 4,
      hourlyRate: 120,
    },
  });

  if (!open) return null;

  const onSubmit = async (values: CreateVenueTableFormValues) => {
    await createMutation.mutateAsync(values);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white">Nueva Mesa / Mesa de Billar</h2>
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
              Nombre / Identificador
            </label>
            <input
              {...register('name')}
              placeholder="Ej. Billar Pool #1 o Mesa 4"
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-400">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400">
                Zona del Local
              </label>
              <input
                {...register('zoneName')}
                placeholder="Ej. Zona Billar"
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400">
                Tipo de Mesa
              </label>
              <select
                {...register('category')}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="BILLIARD_POOL">Billar Pool</option>
                <option value="BILLIARD_CAROM">Billar Carambola</option>
                <option value="BILLIARD_SNOOKER">Snooker</option>
                <option value="RESTAURANT">Mesa Comedor</option>
                <option value="BAR">Barra</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400">
                Capacidad (Personas)
              </label>
              <input
                type="number"
                {...register('capacity')}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400">
                Tarifa por Hora ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('hourlyRate')}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
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
              {createMutation.isPending ? 'Guardando...' : 'Guardar en BD'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
