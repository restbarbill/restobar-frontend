import React from 'react';
import { Clock, StopCircle } from 'lucide-react';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/data-states';
import { formatCurrency } from '@/lib/utils';
import {
  useActiveBilliardSessions,
  useStopBilliardSession,
} from '../hooks/use-billiards';

export const BilliardsControlPage: React.FC = () => {
  const { data: sessions, isLoading, isError, error, refetch } = useActiveBilliardSessions();
  const stopMutation = useStopBilliardSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Clock className="h-6 w-6 text-purple-400" />
          Control de Tiempo de Billar en Vivo
        </h1>
        <p className="text-sm text-slate-400">
          Cronómetros persistidos en servidor con cálculo exacto por minuto/fracción (Decimal.js).
        </p>
      </div>

      {isLoading && <LoadingState label="Consultando mesas de billar en juego..." />}

      {isError && <ErrorState error={error} onRetry={() => void refetch()} />}

      {!isLoading && !isError && sessions?.length === 0 && (
        <EmptyState
          title="No hay mesas de billar con tiempo corriendo en este momento"
          description="Inicia el tiempo de una mesa de billar desde el Mapa de Salón para monitorear su cronómetro y consumo aquí."
        />
      )}

      {!isLoading && !isError && sessions && sessions.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-purple-500/40 bg-slate-900 p-5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{s.tableName}</h3>
                <span className="rounded-full bg-purple-500/20 px-2.5 py-1 text-xs font-semibold text-purple-300">
                  {s.mode} • {s.playerCount} Jugadores
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Inició: {new Date(s.startedAt).toLocaleTimeString('es-MX')} • Tarifa:{' '}
                {formatCurrency(s.hourlyRate)}/hr
              </p>

              {s.accessoriesNotes && (
                <p className="mt-2 rounded-lg bg-slate-950 p-2 text-xs text-slate-300">
                  Accesorios: {s.accessoriesNotes}
                </p>
              )}

              <button
                type="button"
                onClick={() => stopMutation.mutate(s.id)}
                disabled={stopMutation.isPending}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-2.5 text-sm font-semibold text-white hover:bg-rose-500 transition cursor-pointer"
              >
                <StopCircle className="h-4 w-4" />
                Detener Reloj y Calcular Cobro
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
