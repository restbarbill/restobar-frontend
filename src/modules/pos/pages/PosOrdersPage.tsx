import React from 'react';
import { Receipt } from 'lucide-react';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/data-states';
import { formatCurrency } from '@/lib/utils';
import { useOpenOrders } from '../hooks/use-pos';

export const PosOrdersPage: React.FC = () => {
  const { data: orders, isLoading, isError, error, refetch } = useOpenOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Receipt className="h-6 w-6 text-emerald-400" />
          Punto de Venta (POS) — Comandas Abiertas
        </h1>
        <p className="text-sm text-slate-400">
          Cuentas unificadas (Consumo de Cocina + Barra + Tiempo de Billar) en tiempo real.
        </p>
      </div>

      {isLoading && <LoadingState label="Consultando comandas abiertas..." />}
      {isError && <ErrorState error={error} onRetry={() => void refetch()} />}

      {!isLoading && !isError && orders?.length === 0 && (
        <EmptyState
          title="No hay comandas abiertas en este momento"
          description="Abre una cuenta desde una mesa del salón o desde la barra para comenzar a agregar productos."
        />
      )}

      {!isLoading && !isError && orders && orders.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {order.orderNumber}
                </span>
                <span className="text-xs text-slate-400">{order.status}</span>
              </div>
              <h3 className="mt-2 text-lg font-bold text-white">{order.customerLabel}</h3>
              <div className="mt-4 border-t border-slate-800 pt-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">Total acumulado</span>
                <span className="text-lg font-bold text-emerald-400">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
