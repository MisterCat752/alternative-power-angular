import { Component, computed, signal } from '@angular/core';

type FifoRow = {
  fifoNo: number;
  productSku: string;
  invoice: string;
  lotLabel: string; // Lot #1, Lot #2...
  received: number;
  issued: number;
  available: number;
  firstReceipt: string; // "Дек 1, 2025 23:53"
};

@Component({
  selector: 'app-fifo-lots-page',
  standalone: true,
  templateUrl: './fifo-lots-page.html',
})
export class FifoLotsPage {
  search = signal('');

  rows = signal<FifoRow[]>([
    {
      fifoNo: 1,
      productSku: '660953',
      invoice: 'R99627',
      lotLabel: 'Lot #1',
      received: 13,
      issued: 0,
      available: 13,
      firstReceipt: 'Дек 1, 2025 23:53',
    },
    {
      fifoNo: 2,
      productSku: '777134',
      invoice: 'R47111',
      lotLabel: 'Lot #2',
      received: 24,
      issued: 0,
      available: 24,
      firstReceipt: 'Дек 1, 2025 23:53',
    },
    {
      fifoNo: 3,
      productSku: '261492',
      invoice: 'R47111',
      lotLabel: 'Lot #3',
      received: 24,
      issued: 0,
      available: 24,
      firstReceipt: 'Дек 1, 2025 23:53',
    },
  ]);

  totalLots = computed(() => this.rows().length);
  totalAvailable = computed(() => this.rows().reduce((s, r) => s + r.available, 0));
  uniqueProducts = computed(() => new Set(this.rows().map((r) => r.productSku)).size);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.rows();

    return this.rows().filter((r) => {
      return (
        r.productSku.toLowerCase().includes(q) ||
        r.invoice.toLowerCase().includes(q) ||
        r.lotLabel.toLowerCase().includes(q)
      );
    });
  });
}
