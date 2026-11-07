import React, { useState } from 'react';
import { ChefHat } from 'lucide-react';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/data-states';
import { useKdsTickets } from '../hooks/use-kds';
import type { KdsStation } from '../types/kds.types';

export const KdsDisplayPage: React.FC = () => {
  const [station, setStation] = useState<KdsStation | undefined>(undefined);
  const { data: tickets, isLoading, isError, error, refetch } = useKdsTickets(station);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <ChefHat className="h-6 w-6 text-amber-400" />
            Monitor KDS — Cocina y Barra en Vivo
          </h1>
          <p className="text-sm text-slate-400">
            Recepción de comandas en tiempo real por estación de preparación.
          </p>
        </div>

        <div className="flex gap-2">
          {(['ALL', 'KITCHEN', 'BAR'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStation(tab === 'ALL' ? undefined : tab)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                (station ?? 'ALL') === tab
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              {tab === 'ALL' ? 'Todas' : tab === 'KITCHEN' ? 'Cocina' : 'Barra'}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <LoadingState label="Consultando comandas en preparación..." />}
      {isError && <ErrorState error={error} onRetry={() => void refetch()} />}

      {!isLoading && !isError && tickets?.length === 0 && (
        <EmptyState
          title="Sin comandas pendientes en pantalla"
          description="Cuando un mesero envíe alimentos o bebidas desde el POS, aparecerán instantáneamente aquí."
        />
      )}

      {!isLoading && !isError && tickets && tickets.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">
                  {t.orderNumber} • {t.station}
                </span>
                <span className="text-xs font-semibold text-emerald-400">{t.status}</span>
              </div>
              <h3 className="mt-1 text-base font-bold text-white">{t.tableLabel}</h3>
              <p className="mt-3 rounded-xl bg-slate-950 p-3 text-sm text-slate-200">
                {t.itemsSummary}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
