export type BilliardGameType = 'POOL_8' | 'POOL_9' | 'POOL_10' | 'CARAMBOLA';
export type TournamentFormat = 'SINGLE_ELIMINATION' | 'DOUBLE_ELIMINATION' | 'ROUND_ROBIN';
export type TournamentStatus =
  | 'DRAFT'
  | 'REGISTRATION_OPEN'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Tournament {
  id: string;
  name: string;
  gameType: BilliardGameType;
  format: TournamentFormat;
  status: TournamentStatus;
  maxPlayers: number;
  registeredPlayers: number;
  entryFee: number;
  prizePool: number;
  startDate: string;
  bannerUrl?: string | null;
  rulesNotes?: string | null;
  createdAt: string;
}

export interface CreateTournamentPayload {
  name: string;
  gameType: BilliardGameType;
  format: TournamentFormat;
  maxPlayers: number;
  entryFee: number;
  startDate: string;
  rulesNotes?: string;
}
