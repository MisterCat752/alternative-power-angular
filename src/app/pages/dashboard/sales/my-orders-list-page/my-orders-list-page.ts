import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';

type OrderStatus =
  | 'ALL'
  | 'DRAFT'
  | 'SUBMITTED'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'FULFILLED'
  | 'CANCELED';

type OrderRow = {
  order: string;
  items: number;
  total: string; // "28 068,96"
  currency: string; // "MDL"
  status: Exclude<OrderStatus, 'ALL'>;
  date: string; // "Янв 7, 2026"
  time: string; // "01:57"
};

type Tab = { key: OrderStatus; label: string; count?: number };

@Component({
  selector: 'app-my-orders-list-page',
  standalone: true,
  imports: [UiSelect],
  templateUrl: './my-orders-list-page.html',
})
export class MyOrdersListPage {
  // summary
  summary = signal({
    totalOrders: 2,
    processing: 1,
    inTransit: 0,
    delivered: 0,
  });

  // tabs like on screenshot
  tabs: Tab[] = [
    { key: 'ALL', label: 'All', count: 2 },
    { key: 'DRAFT', label: 'Draft', count: 1 },
    { key: 'SUBMITTED', label: 'Submitted', count: 0 },
    { key: 'CONFIRMED', label: 'Confirmed', count: 0 },
    { key: 'PROCESSING', label: 'Processing', count: 1 },
    { key: 'SHIPPED', label: 'Shipped', count: 0 },
    { key: 'FULFILLED', label: 'Fulfilled', count: 0 },
    { key: 'CANCELED', label: 'Canceled', count: 0 },
  ];

  tab = signal<OrderStatus>('ALL');
  search = signal('');
  status = signal<OrderStatus>('ALL');

  statusOpts: UiSelectOption<OrderStatus>[] = [
    { label: 'All statuses', value: 'ALL' },
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Submitted', value: 'SUBMITTED' },
    { label: 'Confirmed', value: 'CONFIRMED' },
    { label: 'Processing', value: 'PROCESSING' },
    { label: 'Shipped', value: 'SHIPPED' },
    { label: 'Fulfilled', value: 'FULFILLED' },
    { label: 'Canceled', value: 'CANCELED' },
  ];

  rows = signal<OrderRow[]>([
    {
      order: '#SO-202601-0002',
      items: 2,
      total: '28 068,96',
      currency: 'MDL',
      status: 'PROCESSING',
      date: 'Янв 7, 2026',
      time: '01:57',
    },
    {
      order: '#SO-202601-0001',
      items: 0,
      total: '1,00',
      currency: 'MDL',
      status: 'DRAFT',
      date: 'Янв 7, 2026',
      time: '01:55',
    },
  ]);

  // apply/reset как на скрине (мок: просто держим "applied" отдельно)
  appliedStatus = signal<OrderStatus>('ALL');
  apply() {
    this.appliedStatus.set(this.status());
  }
  reset() {
    this.search.set('');
    this.status.set('ALL');
    this.appliedStatus.set('ALL');
    this.tab.set('ALL');
  }

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const byTab = this.tab();
    const byStatus = this.appliedStatus();

    return this.rows().filter((r) => {
      const okTab = byTab === 'ALL' ? true : r.status === byTab;
      const okStatus = byStatus === 'ALL' ? true : r.status === byStatus;
      const okSearch = !q ? true : r.order.toLowerCase().includes(q);
      return okTab && okStatus && okSearch;
    });
  });

  statusBadgeClass(s: OrderRow['status']) {
    switch (s) {
      case 'DRAFT':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'PROCESSING':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'FULFILLED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'CANCELED':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }
}
