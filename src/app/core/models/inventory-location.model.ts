export type InventoryLocationType = 'internal' | 'supplier';

export interface InventoryLocation {
  id: number;
  code: string;
  name: string;
  usage: string;
  parent: number | null | string;
  is_active: boolean;
  products?: number;
}

export type LocationUsage = 'internal' | 'supplier' | 'customer' | 'virtual';
export interface LocationFormValue {
  code: string;
  name: string;
  usage: LocationUsage;
  parent: number | null;
}
