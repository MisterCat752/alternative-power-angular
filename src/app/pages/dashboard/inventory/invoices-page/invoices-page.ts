import { Component, computed, signal, effect, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { InvoicesService, PurchaseInvoice } from '../../../../core/services/inventory/invoices';
import { InventoryLocationsService } from '../../../../core/services/locations/inventory-locations.service';

type Currency = 'MDL' | 'EUR' | 'USD' | 'RON';
type InvoiceStatus = 'RECEIVED' | 'PENDING' | 'DRAFT' | 'LOCKED';
type ApiInvoiceStatus = 'draft' | 'received' | 'locked';

const UI_TO_API_STATUS: Record<Exclude<InvoiceStatus, 'PENDING'>, ApiInvoiceStatus> = {
  DRAFT: 'draft',
  RECEIVED: 'received',
  LOCKED: 'locked',
};

type InvoiceRow = {
  id: number;
  invoice: string;
  date: string;
  vendor_name: string;
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
  currency = signal<'ALL' | Currency>('ALL');
  page = signal(1);
  pageSize = signal(20);
  search = signal('');

  activeTab = signal<TabKey>('ALL');
  status = signal<'ALL' | InvoiceStatus>('ALL');

  /** locations */
  locationOptions = signal<UiSelectOption<string | 'ALL'>[]>([
    { label: 'All locations', value: 'ALL' },
  ]);
  selectedLocation = signal<string | 'ALL'>('ALL');

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

  currencyOpts: UiSelectOption<'ALL' | Currency>[] = [
    { label: 'Currency', value: 'ALL' },
    { label: 'MDL', value: 'MDL' },
    { label: 'EUR', value: 'EUR' },
    { label: 'USD', value: 'USD' },
    { label: 'RON', value: 'RON' },
  ];
  statusOpts: UiSelectOption<'ALL' | InvoiceStatus>[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Received', value: 'RECEIVED' },
    { label: 'Locked', value: 'LOCKED' },
  ];
  // year filter (пока только UI)
  year = signal<'ALL' | '2026' | '2025' | '2024'>('ALL');

  yearOpts: UiSelectOption<'ALL' | '2026' | '2025' | '2024'>[] = [
    { label: 'Year', value: 'ALL' },
    { label: '2026', value: '2026' },
    { label: '2025', value: '2025' },
    { label: '2024', value: '2024' },
  ];
  constructor() {
    effect(() => {
      this.page();
      this.pageSize();
      this.search();
      this.status();

      this.loadInvoices();
    });

    this.loadLocations();
  }

  loadLocations() {
    this.locationsService.getLocations().subscribe((locations) => {
      this.locationOptions.set([
        { label: 'All locations', value: 'ALL' },
        ...locations.results.map((l) => ({
          label: `${l.code} — ${l.name}`,
          value: l.code,
        })),
      ]);
    });
  }

  loadInvoices() {
    const uiStatus = this.status();
    const apiStatus =
      uiStatus === 'ALL' || uiStatus === 'PENDING' ? undefined : UI_TO_API_STATUS[uiStatus];

    this.invoicesService
      .getInvoices(apiStatus, this.search() || undefined, this.page(), this.pageSize())
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
    vendor_name: i.vendor_name ?? '—',
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
      count: t.key === 'ALL' ? this.totalCount() : rows.filter((r) => r.currency === t.key).length,
    }));
  }

  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
  hasPrev = computed(() => this.page() > 1);
  hasNext = computed(() => this.page() < this.totalPages());

  onSelectInvoice(id: number, e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.selectedInvoiceId.set(checked ? id : null);
  }

  onReceiveSelected() {
    const id = this.selectedInvoiceId();
    const location = this.selectedLocation();

    if (!id || !location) return;

    this.invoicesService.receiveInvoice(id, location).subscribe(() => {
      this.loadInvoices();
      this.selectedInvoiceId.set(null);
    });
  }

  onLockSelected() {
    const id = this.selectedInvoiceId();
    if (!id) return;

    this.invoicesService.lockInvoice(id).subscribe(() => {
      this.loadInvoices();
      this.selectedInvoiceId.set(null);
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
