import { Component, computed, signal, inject, OnInit } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { RouterLink } from '@angular/router';
import { OrderDetails } from '../../../../core/models/orders/orders.model';
import { OrdersService } from '../../../../core/services/orders/order.service';
import { AuthStore } from '../../../../core/services/auth.store';

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
  total: string;
  currency: string;
  status: Exclude<OrderStatus, 'ALL'>;
  date: string;
  time: string;
};

type Tab = { key: OrderStatus; label: string; count?: number };

@Component({
  selector: 'app-my-orders-list-page',
  standalone: true,
  imports: [UiSelect, RouterLink],
  templateUrl: './my-orders-list-page.html',
})
export class MyOrdersListPage implements OnInit {
  private ordersService = inject(OrdersService);
  private authStore = inject(AuthStore);

  summary = signal({
    totalOrders: 0,
    processing: 0,
    inTransit: 0,
    delivered: 0,
  });

  tabs: Tab[] = [
    { key: 'ALL', label: 'All' },
    { key: 'DRAFT', label: 'Draft' },
    { key: 'SUBMITTED', label: 'Submitted' },
    { key: 'CONFIRMED', label: 'Confirmed' },
    { key: 'PROCESSING', label: 'Processing' },
    { key: 'SHIPPED', label: 'Shipped' },
    { key: 'FULFILLED', label: 'Fulfilled' },
    { key: 'CANCELED', label: 'Canceled' },
  ];

  tab = signal<OrderStatus>('ALL');
  search = signal('');
  status = signal<OrderStatus>('ALL');
  appliedStatus = signal<OrderStatus>('ALL');

  rows = signal<OrderRow[]>([]);

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

  ngOnInit() {
    const user = this.authStore.user();
    if (!user) return;

    this.ordersService.getOrders().subscribe((orders: OrderDetails[]) => {
      const myOrders = orders.filter((o) => o.customer.email === user.email);

      const mapped: OrderRow[] = myOrders.map((o) => ({
        order: o.code,
        items: o.items.length,
        total: o.total.toLocaleString(),
        currency: o.currency,
        status: this.mapStatus(o.status),
        date: new Date(o.date).toLocaleDateString(),
        time: new Date(o.date).toLocaleTimeString(),
      }));

      this.rows.set(mapped);

      this.summary.set({
        totalOrders: mapped.length,
        processing: mapped.filter((o) => o.status === 'PROCESSING').length,
        inTransit: mapped.filter((o) => o.status === 'SHIPPED').length,
        delivered: mapped.filter((o) => o.status === 'FULFILLED').length,
      });
    });
  }

  private mapStatus(status: string): Exclude<OrderStatus, 'ALL'> {
    switch (status) {
      case 'processing':
        return 'PROCESSING';
      case 'draft':
        return 'DRAFT';
      case 'cancelled':
        return 'CANCELED';
      case 'pending':
        return 'SUBMITTED';
      case 'completed':
        return 'FULFILLED';
      default:
        return 'PROCESSING';
    }
  }

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
