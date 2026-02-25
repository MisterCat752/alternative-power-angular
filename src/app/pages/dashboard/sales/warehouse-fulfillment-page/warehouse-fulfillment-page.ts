import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../../../core/services/orders/order.service';

type FulfillmentRow = {
  order: string;
  customer: string;
  items: number;
  total: string; // уже форматированная строка
  status: 'PROCESSING' | 'READY_TO_SHIP' | 'SHIPPED';
  since: string; // "Янв 7, 02:36"
};

@Component({
  selector: 'app-warehouse-fulfillment-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './warehouse-fulfillment-page.html',
})
export class WarehouseFulfillmentPage implements OnInit {
  search = signal('');

  summary = signal({
    pendingProcessing: 0,
    readyToShip: 1,
    shippedTotal: 0,
  });

  private ordersService = inject(OrdersService);

  rows = signal<FulfillmentRow[]>([]);

  ngOnInit() {
    this.load();
  }

  load() {
    this.ordersService.getOrdersByStatus('processing').subscribe((orders) => {
      const list: FulfillmentRow[] = orders.map((order) => ({
        order: `#${order.code}`,
        customer: order.customer.name,
        items: order.items.length,
        total: `${order.total.toLocaleString()} ${order.currency}`,
        status: 'PROCESSING',
        since: order.date,
      }));

      this.rows.set(list);
    });
  }

  ship(row: FulfillmentRow) {
    const id = Number(row.order.replace('#SO-', '').split('-').pop());

    this.ordersService.changeStatus(id, 'completed').subscribe(() => {
      this.load(); // перезагружаем список
    });
  }

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    return this.rows().filter((r) => {
      if (!q) return true;
      return r.order.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q);
    });
  });

  statusBadgeClass(s: FulfillmentRow['status']) {
    switch (s) {
      case 'PROCESSING':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'READY_TO_SHIP':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'SHIPPED':
        return 'bg-green-100 text-green-700 border-green-200';
    }
  }
}
