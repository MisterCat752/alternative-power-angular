export type StockMoveState = 'draft' | 'posted' | 'canceled';

export interface StockMove {
  id: number;

  productId?: number;
  productName?: string;

  qty?: number;

  from: string;
  to: string;

  state: 'draft' | 'posted' | 'canceled';

  source: 'invoice' | 'manual';

  sourceId?: number;

  invoiceNumber?: string;

  createdAt: string;
}
