export type TableCategory =
  | 'RESTAURANT'
  | 'BAR'
  | 'BILLIARD_POOL'
  | 'BILLIARD_CAROM'
  | 'BILLIARD_SNOOKER';

export type TableStatus =
  | 'AVAILABLE'
  | 'OCCUPIED'
  | 'IN_PLAY'
  | 'PAYMENT_PENDING'
  | 'RESERVED';

export interface VenueTable {
  id: string;
  name: string;
  zoneName: string;
  category: TableCategory;
  status: TableStatus;
  capacity: number;
  hourlyRate: number;
  posX: number;
  posY: number;
  relayIpAddress?: string | null;
  createdAt: string;
}

export interface CreateVenueTablePayload {
  name: string;
  zoneName: string;
  category: TableCategory;
  capacity: number;
  hourlyRate?: number;
}
