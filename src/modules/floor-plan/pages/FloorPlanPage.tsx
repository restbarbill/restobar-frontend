import React, { useState } from 'react';
import { LayoutGrid, Plus, Users, Clock } from 'lucide-react';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/data-states';
import { formatCurrency } from '@/lib/utils';
import { useVenueTables } from '../hooks/use-floor-plan';
import { CreateTableModal } from '../components/CreateTableModal';

export const FloorPlanPage: React.FC = () => {
  const { data: tables, isLoading, isError, error, refetch } = useVenueTables();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <LayoutGrid className="h-6 w-6 text-emerald-400" />
            Mapa de Salón, Barra y Zona de Billar
          </h1>
          <p className="text-sm text-slate-400">
            Estado en tiempo real sincronizado con PostgreSQL (Supabase). Cero datos mockeados.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Nueva Mesa / Billar
        </button>
      </div>

      {isLoading && <LoadingState label="Cargando plano de mesas desde el servidor..." />}

      {isError && <ErrorState error={error} onRetry={() => void refetch()} />}

      {!isLoading && !isError && tables?.length === 0 && (
        <EmptyState
          title="Aún no hay mesas registradas en la base de datos"
          description="Crea las mesas de comedor, bancos de barra y mesas de billar para visualizarlas en el plano interactivo."
          actionLabel="Registrar Primera Mesa"
          onAction={() => setIsModalOpen(true)}
        />
      )}

      {!isLoading && !isError && tables && tables.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tables.map((table) => {
            const isBilliard = table.category.startsWith('BILLIARD');
            return (
              <div
                key={table.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg transition hover:border-emerald-500/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300">
                      {table.zoneName}
                    </span>
                    <h3 className="mt-1.5 text-lg font-bold text-white">{table.name}</h3>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      table.status === 'AVAILABLE'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : table.status === 'IN_PLAY'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {table.status}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-slate-500" />
                    Cap: {table.capacity}
                  </span>
                  {isBilliard ? (
                    <span className="flex items-center gap-1 font-semibold text-emerald-400">
                      <Clock className="h-3.5 w-3.5" />
                      {formatCurrency(table.hourlyRate)} / hr
                    </span>
                  ) : (
                    <span>{table.category}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <CreateTableModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
