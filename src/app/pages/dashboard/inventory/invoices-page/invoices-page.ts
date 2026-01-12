import { Component, computed, signal, effect, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { InvoicesService, PurchaseInvoice } from '../../../../core/services/inventory/invoices';

type Currency = 'MDL' | 'EUR' | 'USD';
type InvoiceStatus = 'RECEIVED' | 'PENDING' | 'DRAFT' | 'LOCKED';

type InvoiceRow = {
  invoice: string;
  date: string;
  vendor: string;
  amount: number;
  currency: 'MDL' | 'USD' | 'EUR' | 'RON';
  status: InvoiceStatus;
};

type TabKey = 'ALL' | Currency;

type Tab = {
  key: TabKey;
  label: string;
  count: number;
};

@Component({
  selector: 'app-invoices-page',
  standalone: true,
  imports: [UiSelect, DecimalPipe],
  templateUrl: './invoices-page.html',
})
export class InvoicesPage {
  private invoicesService = inject(InvoicesService);
  page = signal(1);
  pageSize = signal(20);
  tabs: Tab[] = [
    { key: 'ALL', label: 'All', count: 0 },
    { key: 'MDL', label: 'MDL', count: 0 },
    { key: 'EUR', label: 'EUR', count: 0 },
    { key: 'USD', label: 'USD', count: 0 },
  ];

  activeTab = signal<TabKey>('ALL');
  search = signal('');

  status = signal<'ALL' | InvoiceStatus>('ALL');
  currency = signal<'ALL' | Currency>('ALL');
  year = signal<'ALL' | '2025' | '2024'>('ALL');

  statusOpts: UiSelectOption<'ALL' | InvoiceStatus>[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Received', value: 'RECEIVED' },
    { label: 'Locked', value: 'LOCKED' },
  ];

  currencyOpts: UiSelectOption<'ALL' | Currency>[] = [
    { label: 'Currency', value: 'ALL' },
    { label: 'MDL', value: 'MDL' },
    { label: 'EUR', value: 'EUR' },
    { label: 'USD', value: 'USD' },
  ];

  yearOpts: UiSelectOption<'ALL' | '2025' | '2024'>[] = [
    { label: 'Year', value: 'ALL' },
    { label: '2025', value: '2025' },
    { label: '2024', value: '2024' },
  ];

  /** данные из API */
  rows = signal<InvoiceRow[]>([]);
  totalCount = signal(0);

  constructor() {
    effect(() => {
      this.page();
      this.pageSize();
      this.search();

      this.loadInvoices();
    });
  }

  loadInvoices() {
    this.invoicesService
      .getInvoices(
        undefined, // status (пока не используем)
        this.search() || undefined,
        this.page(),
        this.pageSize()
      )
      .subscribe((res) => {
        this.totalCount.set(res.count);

        const mapped = res.results.map(this.mapInvoice);
        this.rows.set(mapped);

        this.updateTabs(mapped);
      });
  }

  private mapInvoice = (i: PurchaseInvoice): InvoiceRow => ({
    invoice: i.doc_number,
    date: new Date(i.doc_date).toLocaleDateString('ru-RU', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    vendor: i.vendor?.name ?? '—',
    amount: Number(i.doc_sum),
    currency: i.currency,
    status:
      i.status === 'received'
        ? 'RECEIVED'
        : i.status === 'draft'
        ? 'DRAFT'
        : i.status === 'locked'
        ? 'LOCKED'
        : 'PENDING',
  });

  private updateTabs(rows: InvoiceRow[]) {
    this.tabs = this.tabs.map((t) => ({
      ...t,
      count: t.key === 'ALL' ? rows.length : rows.filter((r) => r.currency === t.key).length,
    }));
  }
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));

  hasPrev = computed(() => this.page() > 1);
  hasNext = computed(() => this.page() < this.totalPages());
  totalInvoices = computed(() => this.rows().length);
  totalValue = computed(() => this.rows().reduce((s, r) => s + r.amount, 0));
  avgInvoice = computed(() => (this.rows().length ? this.totalValue() / this.rows().length : 0));
  pendingCount = computed(() => this.rows().filter((r) => r.status === 'PENDING').length);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    this.rows().forEach((r) => {
      console.log(r.invoice, r.status);
    });
    return this.rows().filter((r) => {
      const byTab = this.activeTab() === 'ALL' ? true : r.currency === this.activeTab();

      const bySearch =
        !q || r.invoice.toLowerCase().includes(q) || r.vendor.toLowerCase().includes(q);

      const byStatus = this.status() === 'ALL' ? true : r.status === this.status();

      const byCurrency = this.currency() === 'ALL' ? true : r.currency === this.currency();

      const byYear = this.year() === 'ALL' ? true : r.date.toLowerCase().includes(this.year());

      return byTab && bySearch && byStatus && byCurrency && byYear;
    });
  });
  badgeClass(s: InvoiceStatus) {
    switch (s) {
      case 'RECEIVED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'DRAFT':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'LOCKED':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  }
  nextPage() {
    if (this.hasNext()) {
      this.page.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.hasPrev()) {
      this.page.update((p) => p - 1);
    }
  }

  setPageSize(size: number) {
    this.page.set(1);
    this.pageSize.set(size);
  }
  onSync() {
    this.loadInvoices();
  }

  onReceiveAll() {
    console.log('receive all');
  }

  onDeleteSelected() {
    console.log('delete selected');
  }
}
