export type OrderStatus = 'OPEN' | 'IN_PREPARATION' | 'READY' | 'PAID' | 'CANCELLED';

export interface Order {
  id: string;
  orderNumber: string;
  tableId?: string | null;
  customerLabel: string;
  status: OrderStatus;
  subtotal: number;
  billiardCharge: number;
  discountAmount: number;
  tipAmount: number;
  totalAmount: number;
  createdAt: string;
}

export interface CreateOrderPayload {
  tableId?: string;
  customerLabel: string;
  subtotal?: number;
  billiardCharge?: number;
}
