import React from 'react';
import { Wallet } from 'lucide-react';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/data-states';
import { formatCurrency } from '@/lib/utils';
import { useCashShifts } from '../hooks/use-cash-register';

export const CashRegisterPage: React.FC = () => {
  const { data: shifts, isLoading, isError, error, refetch } = useCashShifts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Wallet className="h-6 w-6 text-emerald-400" />
          Caja Principal, Turnos y Cortes (X / Z)
        </h1>
        <p className="text-sm text-slate-400">
          Control de fondo fijo, pagos mixtos y arqueo de caja ciego al cierre de turno.
        </p>
      </div>

      {isLoading && <LoadingState label="Consultando turnos de caja desde PostgreSQL..." />}
      {isError && <ErrorState error={error} onRetry={() => void refetch()} />}

      {!isLoading && !isError && shifts?.length === 0 && (
        <EmptyState
          title="No hay turnos de caja registrados"
          description="Realiza la apertura de caja con el fondo inicial del día para comenzar a registrar cobros."
        />
      )}

      {!isLoading && !isError && shifts && shifts.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{shift.cashierName}</h3>
                <span className="text-xs font-semibold text-emerald-400">
                  {shift.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Fondo Inicial: {formatCurrency(shift.openingBalance)} • Ventas Efectivo:{' '}
                {formatCurrency(shift.cashSales)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
