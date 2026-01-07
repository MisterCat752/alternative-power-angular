import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../../shared/ui/ui-select/ui-select';

type SoldRow = {
  date: string; // "Янв 7, 2026"
  orderNo: string; // "#SO-..."
  invoice: string; // "—" or "EBC..."
  sku: string;
  product: string;
  qty: number;
  stock: number;
  unitOrig: number; // EUR price
  unitMdl: number; // MDL price
  revenueMdl: number;
  costMdl: number;
};

type SortKey = 'NEWEST' | 'OLDEST';

@Component({
  selector: 'app-sold-products-page',
  standalone: true,
  imports: [UiSelect],
  templateUrl: './sold-products-page.html',
})
export class SoldProductsPage {
  search = signal('');

  // simple date inputs (string for now)
  dateFrom = signal('');
  dateTo = signal('');

  sort = signal<SortKey>('NEWEST');

  sortOpts: UiSelectOption<SortKey>[] = [
    { label: 'Newest first', value: 'NEWEST' },
    { label: 'Oldest first', value: 'OLDEST' },
  ];

  rows = signal<SoldRow[]>([
    {
      date: 'Янв 7, 2026',
      orderNo: '#SO-202601-0002',
      invoice: '—',
      sku: '921474',
      product: '—',
      qty: 1,
      stock: 5,
      unitOrig: 1318.2,
      unitMdl: 26021.27,
      revenueMdl: 26021.27,
      costMdl: 16680.3,
    },
    {
      date: 'Янв 7, 2026',
      orderNo: '#SO-202601-0002',
      invoice: '—',
      sku: '942275',
      product: '—',
      qty: 1,
      stock: 700,
      unitOrig: 103.73,
      unitMdl: 2047.69,
      revenueMdl: 2047.69,
      costMdl: 1312.62,
    },
  ]);

  private moneyFmt = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  fmtMoney(v: number) {
    return this.moneyFmt.format(v);
  }

  profit(r: SoldRow) {
    return r.revenueMdl - r.costMdl;
  }

  marginPct(r: SoldRow) {
    if (!r.revenueMdl) return 0;
    return (this.profit(r) / r.revenueMdl) * 100;
  }

  totalRevenue = computed(() => this.rows().reduce((s, r) => s + r.revenueMdl, 0));
  totalProfit = computed(() => this.rows().reduce((s, r) => s + this.profit(r), 0));
  totalQty = computed(() => this.rows().reduce((s, r) => s + r.qty, 0));

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const sort = this.sort();

    let list = this.rows().filter((r) => {
      const bySearch =
        !q ||
        r.sku.toLowerCase().includes(q) ||
        r.orderNo.toLowerCase().includes(q) ||
        r.invoice.toLowerCase().includes(q) ||
        r.product.toLowerCase().includes(q);

      // dateFrom/dateTo пока не фильтруем по-настоящему (потом подключишь реальные даты)
      return bySearch;
    });

    list = [...list].sort((a, b) => {
      // для мока: сортируем по строке (норм будет когда будут ISO даты)
      if (sort === 'NEWEST') return b.date.localeCompare(a.date);
      return a.date.localeCompare(b.date);
    });

    return list;
  });

  reset() {
    this.search.set('');
    this.dateFrom.set('');
    this.dateTo.set('');
    this.sort.set('NEWEST');
  }
}
