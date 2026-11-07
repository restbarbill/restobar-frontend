export type KdsStation = 'KITCHEN' | 'BAR';
export type KdsTicketStatus = 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED';

export interface KdsTicket {
  id: string;
  orderNumber: string;
  tableLabel: string;
  station: KdsStation;
  itemsSummary: string;
  status: KdsTicketStatus;
  createdAt: string;
}
