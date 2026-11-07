export type CashShiftStatus = 'OPEN' | 'CLOSED';

export interface CashShift {
  id: string;
  cashierName: string;
  status: CashShiftStatus;
  openingBalance: number;
  cashSales: number;
  cardSales: number;
  transferSales: number;
  declaredClosingCash?: number | null;
  differenceAmount?: number | null;
  openedAt: string;
  closedAt?: string | null;
}
