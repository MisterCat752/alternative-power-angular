import { StockMove } from '../services/stock/inventory-stock.service';

export const STOCK_MOVES_MOCK: StockMove[] = [
  // ---------- INVOICE 1 RECEIPT ----------
  {
    id: 1,
    posted_at: '2025-02-10T10:15:00',
    state: 'posted',

    invoice: 'INV-2025-001',
    external_id: 'GRN-001',

    qty: '5',
    uom_display: 'pcs',

    product: 1,
    product_code: 'LONGI-400',
    product_name: 'Solar Panel Longi 400W',

    source_code: 'SUPPLIER',
    dest_code: 'WH_MAIN',
  },

  {
    id: 2,
    posted_at: '2025-02-10T10:16:00',
    state: 'posted',

    invoice: 'INV-2025-001',
    external_id: 'GRN-002',

    qty: '1',
    uom_display: 'pcs',

    product: 2,
    product_code: 'DEYE-10K-SG05',
    product_name: 'Deye Hybrid 10kW',

    source_code: 'SUPPLIER',
    dest_code: 'WH_MAIN',
  },

  // ---------- INVOICE 2 RECEIPT ----------
  {
    id: 3,
    posted_at: '2025-02-14T09:40:00',
    state: 'draft',

    invoice: 'INV-2025-002',
    external_id: 'GRN-003',

    qty: '1',
    uom_display: 'pcs',

    product: 4,
    product_code: 'VTAC-5.12',
    product_name: 'V-TAC 5.12kWh Battery',

    source_code: 'SUPPLIER',
    dest_code: 'WH_MAIN',
  },

  // ---------- INTERNAL MOVE ----------
  {
    id: 4,
    posted_at: '2025-02-15T12:10:00',
    state: 'posted',

    invoice: null,
    external_id: 'MOVE-001',

    qty: '2',
    uom_display: 'pcs',

    product: 1,
    product_code: 'LONGI-400',
    product_name: 'Solar Panel Longi 400W',

    source_code: 'WH_MAIN',
    dest_code: 'WH_STORE',
  },

  // ---------- SALE / CUSTOMER ----------
  {
    id: 5,
    posted_at: '2025-02-16T14:30:00',
    state: 'posted',

    invoice: null,
    external_id: 'SALE-001',

    qty: '1',
    uom_display: 'pcs',

    product: 2,
    product_code: 'DEYE-10K-SG05',
    product_name: 'Deye Hybrid 10kW',

    source_code: 'WH_MAIN',
    dest_code: 'CUSTOMER',
  },

  // ---------- CANCELED ----------
  {
    id: 6,
    posted_at: '2025-02-17T11:00:00',
    state: 'canceled',

    invoice: null,
    external_id: 'MOVE-002',

    qty: '1',
    uom_display: 'pcs',

    product: 3,
    product_code: 'DYNESS-G2',
    product_name: 'Dyness 10.24kWh battery',

    source_code: 'WH_MAIN',
    dest_code: 'WH_STORE',
  },
];
