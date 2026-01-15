import { Component, computed, signal, effect, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { InvoicesService, PurchaseInvoice } from '../../../../core/services/inventory/invoices';
import { InventoryLocationsService } from '../../../../core/services/locations/inventory-locations.service';

type Currency = 'MDL' | 'EUR' | 'USD' | 'RON';
type InvoiceStatus = 'RECEIVED' | 'PENDING' | 'DRAFT' | 'LOCKED';

type InvoiceRow = {
  id: number;
  invoice: string;
  date: string;
  vendor: string;
  amount: number;
  currency: Currency;
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
  imports: [UiSelect, DecimalPipe, RouterLink],
  templateUrl: './invoices-page.html',
})
export class InvoicesPage {
  private invoicesService = inject(InvoicesService);
  private locationsService = inject(InventoryLocationsService);

  page = signal(1);
  pageSize = signal(20);
  search = signal('');

  activeTab = signal<TabKey>('ALL');

  status = signal<'ALL' | InvoiceStatus>('ALL');
  currency = signal<'ALL' | Currency>('ALL');
  year = signal<'ALL' | '2025' | '2024'>('ALL');

  /** locations */
  locationOptions = signal<UiSelectOption<string | 'ALL'>[]>([
    { label: 'All locations', value: 'ALL' },
  ]);
  selectedLocation = signal<string | 'ALL'>('ALL'); // дефолтное значение

  /** selection */
  selectedInvoiceId = signal<number | null>(null);

  /** data */
  rows = signal<InvoiceRow[]>([]);
  totalCount = signal(0);

  tabs: Tab[] = [
    { key: 'ALL', label: 'All', count: 0 },
    { key: 'MDL', label: 'MDL', count: 0 },
    { key: 'EUR', label: 'EUR', count: 0 },
    { key: 'USD', label: 'USD', count: 0 },
  ];

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

  constructor() {
    // Загружаем счета при изменении пагинации / поиска
    effect(() => {
      this.page();
      this.pageSize();
      this.search();
      this.loadInvoices();
    });

    // Загружаем locations
    this.loadLocations();
  }

  /** Load locations и сразу ставим дефолт */
  loadLocations() {
    this.locationsService.getLocations().subscribe((locations) => {
      const opts: UiSelectOption<string | 'ALL'>[] = [
        { label: 'All locations', value: 'ALL' },
        ...locations.results.map((l) => ({
          label: `${l.code} — ${l.name}`,
          value: l.code,
        })),
      ];
      this.locationOptions.set(opts);

      // Если выбранное значение ещё не существует в новых опциях — ставим дефолт
      if (!opts.find((o) => o.value === this.selectedLocation())) {
        this.selectedLocation.set('ALL');
      }
    });
  }

  onLockSelected() {
    const invoiceId = this.selectedInvoiceId();

    if (!invoiceId) {
      alert('Select invoice');
      return;
    }

    this.invoicesService.lockInvoice(invoiceId).subscribe({
      next: () => {
        alert('Invoice successfully locked');
        this.rows.update((rows) =>
          rows.map((r) => (r.id === invoiceId ? { ...r, status: 'LOCKED' } : r))
        );
        this.selectedInvoiceId.set(null);
      },
      error: (err) => alert(err.error?.detail ?? 'Error'),
    });
  }
  /** Load invoices */
  loadInvoices() {
    this.invoicesService
      .getInvoices(undefined, this.search() || undefined, this.page(), this.pageSize())
      .subscribe((res) => {
        this.totalCount.set(res.count);

        const mapped = res.results.map(this.mapInvoice);
        this.rows.set(mapped);

        this.updateTabs(mapped);
      });
  }

  private mapInvoice = (i: PurchaseInvoice): InvoiceRow => ({
    id: i.id,
    invoice: i.doc_number,
    date: new Date(i.doc_date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
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

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    return this.rows().filter((r) => {
      const byTab = this.activeTab() === 'ALL' ? true : r.currency === this.activeTab();
      const bySearch =
        !q || r.invoice.toLowerCase().includes(q) || r.vendor.toLowerCase().includes(q);
      const byStatus = this.status() === 'ALL' ? true : r.status === this.status();
      const byCurrency = this.currency() === 'ALL' ? true : r.currency === this.currency();
      const byYear = this.year() === 'ALL' ? true : r.date.includes(this.year());
      return byTab && bySearch && byStatus && byCurrency && byYear;
    });
  });

  onSelectInvoice(id: number, e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.selectedInvoiceId.set(checked ? id : null);
  }

  onReceiveSelected() {
    const invoiceId = this.selectedInvoiceId();
    const locationCode = this.selectedLocation();

    if (!invoiceId) {
      alert('Select invoice');
      return;
    }

    if (!locationCode) {
      alert('Select location');
      return;
    }

    this.invoicesService.receiveInvoice(invoiceId, locationCode).subscribe({
      next: () => {
        alert('Invoice successfully received');
        this.rows.update((rows) =>
          rows.map((r) => (r.id === invoiceId ? { ...r, status: 'RECEIVED' } : r))
        );
        this.selectedInvoiceId.set(null);
      },
      error: (err) => alert(err.error?.detail ?? 'Error'),
    });
  }

  nextPage() {
    if (this.hasNext()) this.page.update((p) => p + 1);
  }

  prevPage() {
    if (this.hasPrev()) this.page.update((p) => p - 1);
  }

  badgeClass(s: InvoiceStatus) {
    return s === 'RECEIVED'
      ? 'bg-green-100 text-green-700 border-green-200'
      : s === 'DRAFT'
      ? 'bg-slate-100 text-slate-700 border-slate-200'
      : s === 'LOCKED'
      ? 'bg-purple-100 text-purple-700 border-purple-200'
      : 'bg-orange-100 text-orange-700 border-orange-200';
  }
}
