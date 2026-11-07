import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  LayoutGrid,
  Clock,
  Receipt,
  ChefHat,
  Trophy,
  Package,
  Wallet,
  Activity,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

const navItems = [
  { to: '/', label: 'Mapa & Mesas', icon: LayoutGrid },
  { to: '/billiards', label: 'Relojes Billar', icon: Clock },
  { to: '/pos', label: 'Comandas POS', icon: Receipt },
  { to: '/kds', label: 'Cocina & Barra (KDS)', icon: ChefHat },
  { to: '/tournament', label: 'Torneos Billar', icon: Trophy },
  { to: '/inventory', label: 'Inventario & Menú', icon: Package },
  { to: '/cash-register', label: 'Caja & Cortes', icon: Wallet },
];

export const PosMainLayout: React.FC = () => {
  const healthQuery = useQuery({
    queryKey: ['backend-health'],
    queryFn: async () => {
      const { data } = await apiClient.get<{ status: string; database: string }>('/health');
      return data;
    },
    refetchInterval: 20000,
    retry: 1,
  });

  const isBackendOnline = healthQuery.isSuccess && healthQuery.data?.status === 'OK';

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 lg:flex-row">
      {/* Sidebar Táctil */}
      <aside className="flex w-full flex-col justify-between border-b border-slate-800 bg-slate-900/90 p-4 lg:w-64 lg:border-r lg:border-b-0">
        <div>
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 font-black text-slate-950">
              RB
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-white">
                RestoBar & Billar
              </h2>
              <p className="text-[11px] text-slate-400">POS Single-Tenant v1.0</p>
            </div>
          </div>

          <nav className="mt-6 flex gap-1.5 overflow-x-auto lg:flex-col">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap transition ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Estado de Conexión Real con Backend & Supabase */}
        <div className="mt-4 hidden rounded-xl border border-slate-800 bg-slate-950/90 p-3 lg:block">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Activity
              className={`h-4 w-4 ${
                isBackendOnline ? 'text-emerald-400' : 'text-rose-400'
              }`}
            />
            <span className={isBackendOnline ? 'text-emerald-400' : 'text-rose-400'}>
              {isBackendOnline ? 'API & Supabase Conectados' : 'API Backend Desconectada'}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Modo 100% Datos Reales (Zero Mocks)
          </p>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};
