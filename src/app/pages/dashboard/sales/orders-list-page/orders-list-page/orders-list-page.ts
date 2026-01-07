import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../../shared/ui/ui-select/ui-select';

type OrderState =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'FULFILLED'
  | 'CANCELED';

type TabKey = 'ALL' | OrderState;

type OrderRow = {
  orderNo: string;
  customer: string;
  items: number;
  totalMdl: number;
  state: OrderState;
  date: string; // "Янв 7, 01:57"
};

type StatusFilter = 'ALL' | OrderState;

@Component({
  selector: 'app-orders-list-page',
  standalone: true,
  imports: [UiSelect],
  templateUrl: './orders-list-page.html',
})
export class OrdersListPage {
  tab = signal<TabKey>('ALL');
  search = signal('');

  // dropdown "All statuses"
  status = signal<StatusFilter>('ALL');

  statusOpts: UiSelectOption<StatusFilter>[] = [
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
      orderNo: '#SO-202601-0002',
      customer: 'Alexandru Gherasimov',
      items: 2,
      totalMdl: 28068.96,
      state: 'FULFILLED',
      date: 'Янв 7, 01:57',
    },
    {
      orderNo: '#SO-202601-0001',
      customer: 'gherasimovalexandru@hotmail.com',
      items: 0,
      totalMdl: 1.0,
      state: 'DRAFT',
      date: 'Янв 7, 01:55',
    },
  ]);

  // ---- helpers
  private moneyFmt = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  fmtMoney(v: number) {
    return this.moneyFmt.format(v);
  }

  stateLabel(s: OrderState) {
    switch (s) {
      case 'DRAFT':
        return 'DRAFT';
      case 'SUBMITTED':
        return 'SUBMITTED';
      case 'CONFIRMED':
        return 'CONFIRMED';
      case 'PROCESSING':
        return 'PROCESSING';
      case 'SHIPPED':
        return 'SHIPPED';
      case 'FULFILLED':
        return 'FULFILLED';
      case 'CANCELED':
        return 'CANCELED';
    }
  }

  statePillClass(s: OrderState) {
    switch (s) {
      case 'FULFILLED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'CANCELED':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'DRAFT':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }

  tabs = [
    { key: 'ALL', label: 'All' },
    { key: 'DRAFT', label: 'Draft' },
    { key: 'SUBMITTED', label: 'Submitted' },
    { key: 'CONFIRMED', label: 'Confirmed' },
    { key: 'PROCESSING', label: 'Processing' },
    { key: 'SHIPPED', label: 'Shipped' },
    { key: 'FULFILLED', label: 'Fulfilled' },
    { key: 'CANCELED', label: 'Canceled' },
  ] as const;

  countFor(key: TabKey) {
    const all = this.rows();
    if (key === 'ALL') return all.length;
    return all.filter((r) => r.state === key).length;
  }

  // summary cards
  totalOrders = computed(() => this.rows().length);

  totalRevenue = computed(() =>
    this.rows()
      .filter((r) => r.state !== 'CANCELED')
      .reduce((s, r) => s + r.totalMdl, 0)
  );

  avgOrderValue = computed(() => {
    const valid = this.rows().filter((r) => r.state !== 'CANCELED');
    if (!valid.length) return 0;
    const sum = valid.reduce((s, r) => s + r.totalMdl, 0);
    return sum / valid.length;
  });

  pendingCount = computed(
    () => this.rows().filter((r) => r.state === 'SUBMITTED' || r.state === 'CONFIRMED').length
  );

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const tab = this.tab();
    const st = this.status();

    return this.rows().filter((r) => {
      const byTab = tab === 'ALL' ? true : r.state === tab;
      const byStatus = st === 'ALL' ? true : r.state === st;

      const bySearch =
        !q || r.orderNo.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q);

      return byTab && byStatus && bySearch;
    });
  });

  resetFilters() {
    this.search.set('');
    this.status.set('ALL');
    this.tab.set('ALL');
  }
}
