import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';

type MoveState = 'DRAFT' | 'POSTED' | 'CANCELED';

type MoveRow = {
  date: string;
  product: string;
  source: string;
  destination: string;
  qty: number;
  uom: string;
  state: MoveState;
  invoice: string;
};

type LocKey =
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

@Component({
  selector: 'app-stock-moves-page',
  standalone: true,
  imports: [UiSelect],
  templateUrl: './stock-moves-page.html',
})
export class StockMovesPage {
  tab = signal<'ALL' | 'DRAFT' | 'POSTED' | 'CANCELED'>('ALL');
  search = signal('');

  source = signal<LocKey>('ALL');
  destination = signal<LocKey>('ALL');

  locOpts: UiSelectOption<LocKey>[] = [
    { label: 'All Sources', value: 'ALL' },
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

  // ✅ опции для Destination (чтобы "All Destinations")
  destOpts = computed<UiSelectOption<LocKey>[]>(() =>
    this.locOpts.map((o) => ({
      ...o,
      label: o.label === 'All Sources' ? 'All Destinations' : o.label,
    }))
  );

  rows = signal<MoveRow[]>([
    {
      date: 'Дек 9, 2025',
      product: '150222 —',
      source: 'SUPPLIER',
      destination: 'WH/MAIN',
      qty: 1,
      uom: '—',
      state: 'POSTED',
      invoice: 'EBC 000920396',
    },
    {
      date: 'Дек 9, 2025',
      product: '151295 —',
      source: 'SUPPLIER',
      destination: 'WH/MAIN',
      qty: 1,
      uom: '—',
      state: 'POSTED',
      invoice: 'EBC 000920396',
    },
    {
      date: 'Дек 9, 2025',
      product: '399416 —',
      source: 'SUPPLIER',
      destination: 'WH/MAIN',
      qty: 5,
      uom: '—',
      state: 'POSTED',
      invoice: 'EBC 000835038',
    },
    {
      date: 'Дек 9, 2025',
      product: '359519 —',
      source: 'SUPPLIER',
      destination: 'WH/MAIN',
      qty: 4,
      uom: '—',
      state: 'POSTED',
      invoice: 'EBC000759599',
    },
  ]);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();

    return this.rows().filter((r) => {
      const byTab = this.tab() === 'ALL' ? true : r.state === this.tab();
      const bySearch =
        !q || r.product.toLowerCase().includes(q) || r.invoice.toLowerCase().includes(q);

      const bySource =
        this.source() === 'ALL' ? true : r.source.replace('/', '_') === this.source();
      const byDest =
        this.destination() === 'ALL'
          ? true
          : r.destination.replace('/', '_') === this.destination();

      return byTab && bySearch && bySource && byDest;
    });
  });
}
