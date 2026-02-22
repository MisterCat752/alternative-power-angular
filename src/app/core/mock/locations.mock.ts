import { InventoryLocation } from '../models/inventory-location.model';

export const LOCATIONS_MOCK: InventoryLocation[] = [
  {
    id: 1,
    code: 'WH/MAIN',
    name: 'Main Warehouse',
    usage: 'internal',
    parent: null,
    is_active: true,
    products: 120,
  },
  {
    id: 2,
    code: 'WH/SEC',
    name: 'Secondary Warehouse',
    usage: 'internal',
    parent: 1,
    is_active: true,
    products: 54,
  },
  {
    id: 3,
    code: 'SUP/APPLE',
    name: 'Apple Supplier',
    usage: 'supplier',
    parent: null,
    is_active: true,
    products: 0,
  },
  {
    id: 4,
    code: 'SUP/SAMSUNG',
    name: 'Samsung Supplier',
    usage: 'supplier',
    parent: null,
    is_active: true,
    products: 0,
  },
];
