import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { RouterLink } from '@angular/router';

type StockRow = {
  sku: string;
  product: string;
  locationCode: string;
  locationName: string;
  qty: number;
  lastMove: string; // "EAY 000163196"
  status: 'IN_STOCK' | 'OUT_OF_STOCK';
};
type Tab = { key: LocationKey | 'IN_STOCK_ONLY'; label: string; count?: number };
type LocationKey =
  | 'ALL'
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

type StockStatusKey = 'ALL' | 'IN_STOCK_ONLY';

@Component({
  selector: 'app-product-stock-page',
  standalone: true,
  imports: [UiSelect, RouterLink],
  templateUrl: './product-stock-page.html',
})
export class ProductStockPage {
  // top tabs как на скрине
  tabs: Tab[] = [
    { key: 'ALL', label: 'All Stock', count: 1227 },
    { key: 'IN_STOCK_ONLY', label: 'In Stock Only', count: 1227 },
    { key: 'CUSTOMERS', label: 'CUSTOMERS' },
    { key: 'MAIN', label: 'MAIN' },
    { key: 'SCRAPPED', label: 'SCRAPPED' },
    { key: 'SUPPLIER', label: 'SUPPLIER' },
    { key: 'VIRTUAL', label: 'VIRTUAL' },
    { key: 'WH_DAMAGED', label: 'WH/DAMAGED' },
    { key: 'WH_MAIN', label: 'WH/MAIN' },
    { key: 'WH_RETURNS', label: 'WH/RETURNS' },
    { key: 'WH_STORE', label: 'WH/STORE' },
    { key: 'WH_TRANSIT', label: 'WH/TRANSIT' },
  ] as const;

  activeTab = signal<(typeof this.tabs)[number]['key']>('ALL');

  search = signal('');

  location = signal<LocationKey>('ALL');
  stockStatus = signal<StockStatusKey>('ALL');

  locationOpts: UiSelectOption<LocationKey>[] = [
    { label: 'All Locations', value: 'ALL' },
    { label: 'CUSTOMERS', value: 'CUSTOMERS', hint: 'Customer Locations' },
    { label: 'MAIN', value: 'MAIN', hint: 'Main Warehouse' },
    { label: 'SCRAPPED', value: 'SCRAPPED', hint: 'Scrapped / Lost' },
    { label: 'SUPPLIER', value: 'SUPPLIER', hint: 'Supplier Location' },
    { label: 'VIRTUAL', value: 'VIRTUAL', hint: 'Virtual Location' },
    { label: 'WH/DAMAGED', value: 'WH_DAMAGED', hint: 'Damaged Goods' },
    { label: 'WH/MAIN', value: 'WH_MAIN', hint: 'Main Warehouse' },
    { label: 'WH/RETURNS', value: 'WH_RETURNS', hint: 'Customer Returns' },
    { label: 'WH/STORE', value: 'WH_STORE', hint: 'Store / Showroom' },
    { label: 'WH/TRANSIT', value: 'WH_TRANSIT', hint: 'In Transit' },
  ];

  stockStatusOpts: UiSelectOption<StockStatusKey>[] = [
    { label: 'All Items', value: 'ALL' },
    { label: 'In Stock Only', value: 'IN_STOCK_ONLY', icon: 'check' },
  ];

  rows = signal<StockRow[]>([
    {
      sku: '858380',
      product: '858380',
      locationCode: 'WH/MAIN',
      locationName: 'Main Warehouse',
      qty: 8,
      lastMove: 'EAY 000163196',
      status: 'IN_STOCK',
    },
    {
      sku: '398445',
      product: '398445',
      locationCode: 'WH/MAIN',
      locationName: 'Main Warehouse',
      qty: 2,
      lastMove: 'EAY 000833006',
      status: 'IN_STOCK',
    },
    {
      sku: '152321',
      product: '152321',
      locationCode: 'WH/MAIN',
      locationName: 'Main Warehouse',
      qty: 9,
      lastMove: 'I11460',
      status: 'IN_STOCK',
    },
    {
      sku: '927711',
      product: '927711',
      locationCode: 'WH/MAIN',
      locationName: 'Main Warehouse',
      qty: 9,
      lastMove: 'I11460',
      status: 'IN_STOCK',
    },
    {
      sku: '383396',
      product: '383396',
      locationCode: 'WH/MAIN',
      locationName: 'Main Warehouse',
      qty: 1,
      lastMove: 'AAV4964619',
      status: 'IN_STOCK',
    },
  ]);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();

    return this.rows().filter((r) => {
      const matchSearch =
        !q || r.sku.toLowerCase().includes(q) || r.product.toLowerCase().includes(q);
      const matchLoc =
        this.location() === 'ALL'
          ? true
          : (r.locationCode.replace('/', '_') as any) === this.location();
      const matchStatus = this.stockStatus() === 'ALL' ? true : r.status === 'IN_STOCK';

      return matchSearch && matchLoc && matchStatus;
    });
  });
}
