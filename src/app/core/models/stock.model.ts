export type LocationKey =
  | 'CUSTOMERS'
  | 'MAIN'
  | 'SCRAPPED'
  | 'SUPPLIER'
  | 'VIRTUAL'
  | 'WH_DAMAGED'
  | 'WH_MAIN'
  | 'WH_RETURNS'
  | 'WH_STORE'
  | 'WH_TRANSIT';

export type StockStatus = 'IN_STOCK' | 'OUT_OF_STOCK';

export interface StockItem {
  id: number;
  productId: number;
  sku: string;

  location: LocationKey;
  locationCode: string;
  locationName: string;

  qty: number;

  lastMove: string;

  status: StockStatus;
}
