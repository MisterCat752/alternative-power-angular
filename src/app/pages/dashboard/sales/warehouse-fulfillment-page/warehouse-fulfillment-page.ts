import { Component, computed, signal } from '@angular/core';

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
  templateUrl: './warehouse-fulfillment-page.html',
})
export class WarehouseFulfillmentPage {
  search = signal('');

  summary = signal({
    pendingProcessing: 0,
    readyToShip: 1,
    shippedTotal: 0,
  });

  rows = signal<FulfillmentRow[]>([
    {
      order: '#SO-202601-0002',
      customer: 'Alexandru Gherasimov',
      items: 2,
      total: '28 068,96 MDL',
      status: 'PROCESSING',
      since: 'Янв 7, 02:36',
    },
  ]);

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

  ship(row: FulfillmentRow) {
    // мок-логика
    const next: FulfillmentRow = { ...row, status: 'SHIPPED' };
    this.rows.set(this.rows().map((r) => (r.order === row.order ? next : r)));
  }
}
