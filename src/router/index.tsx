import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PosMainLayout } from '@/layouts/PosMainLayout';
import { FloorPlanPage } from '@/modules/floor-plan/pages/FloorPlanPage';
import { BilliardsControlPage } from '@/modules/billiards/pages/BilliardsControlPage';
import { PosOrdersPage } from '@/modules/pos/pages/PosOrdersPage';
import { KdsDisplayPage } from '@/modules/kds/pages/KdsDisplayPage';
import { TournamentPage } from '@/modules/tournament/pages/TournamentPage';
import { InventoryPage } from '@/modules/inventory/pages/InventoryPage';
import { CashRegisterPage } from '@/modules/cash-register/pages/CashRegisterPage';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <PosMainLayout />,
    children: [
      { index: true, element: <FloorPlanPage /> },
      { path: 'billiards', element: <BilliardsControlPage /> },
      { path: 'pos', element: <PosOrdersPage /> },
      { path: 'kds', element: <KdsDisplayPage /> },
      { path: 'tournament', element: <TournamentPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'cash-register', element: <CashRegisterPage /> },
    ],
  },
]);
