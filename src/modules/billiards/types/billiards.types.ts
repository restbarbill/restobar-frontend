export type BilliardSessionMode = 'OPEN_TIME' | 'PREPAID';
export type BilliardSessionStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';

export interface BilliardSession {
  id: string;
  tableId: string;
  tableName: string;
  mode: BilliardSessionMode;
  status: BilliardSessionStatus;
  playerCount: number;
  hourlyRate: number;
  prepaidMinutes?: number | null;
  startedAt: string;
  endedAt?: string | null;
  minutesPlayed: number;
  totalCharge: number;
  accessoriesNotes?: string | null;
}
