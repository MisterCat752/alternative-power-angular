import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../../shared/ui/ui-select/ui-select';
import { RouterLink } from '@angular/router';

import { OrderDetails } from '../../../../../core/models/orders/orders.model';
import { OrdersService } from '../../../../../core/services/orders/order.service';
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
  id: number;
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
  imports: [UiSelect, RouterLink],
  templateUrl: './orders-list-page.html',
})
export class OrdersListPage implements OnInit {
  tab = signal<TabKey>('ALL');
  search = signal('');
  private ordersService = inject(OrdersService);
  // dropdown "All statuses"
  status = signal<StatusFilter>('ALL');

  ngOnInit() {
    this.loadOrders();
  }
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

  rows = signal<OrderRow[]>([]);
  // ---- helpers
  private moneyFmt = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  private mapStatus(status: string): OrderState {
    switch (status) {
      case 'draft':
        return 'DRAFT';
      case 'pending':
        return 'SUBMITTED';
      case 'processing':
        return 'PROCESSING';
      case 'completed':
        return 'FULFILLED';
      case 'cancelled':
        return 'CANCELED';
      default:
        return 'DRAFT';
    }
  }

  private formatDate(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString('ru-RU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  private mapToRow(order: OrderDetails): OrderRow {
    return {
      id: order.id,
      orderNo: '#' + order.code,
      customer: order.customer.email || order.customer.name,
      items: order.items.length,
      totalMdl: order.total,
      state: this.mapStatus(order.status),
      date: this.formatDate(order.date),
    };
  }
  loadOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      const rows = orders.map((o) => this.mapToRow(o));
      this.rows.set(rows);
    });
  }
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
      .reduce((s, r) => s + r.totalMdl, 0),
  );

  avgOrderValue = computed(() => {
    const valid = this.rows().filter((r) => r.state !== 'CANCELED');
    if (!valid.length) return 0;
    const sum = valid.reduce((s, r) => s + r.totalMdl, 0);
    return sum / valid.length;
  });

  pendingCount = computed(
    () => this.rows().filter((r) => r.state === 'SUBMITTED' || r.state === 'CONFIRMED').length,
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
