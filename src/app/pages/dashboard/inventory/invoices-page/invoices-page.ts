import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { DecimalPipe } from '@angular/common';

type Currency = 'MDL' | 'EUR' | 'USD';
type InvoiceStatus = 'RECEIVED' | 'PENDING';

type InvoiceRow = {
  invoice: string;
  date: string; // "Ноя 15, 2025"
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
  imports: [UiSelect, DecimalPipe],
  templateUrl: './invoices-page.html',
})
export class InvoicesPage {
  tabs: Tab[] = [
    { key: 'ALL', label: 'All', count: 360 },
    { key: 'MDL', label: 'MDL', count: 330 },
    { key: 'EUR', label: 'EUR', count: 17 },
    { key: 'USD', label: 'USD', count: 13 },
  ];

  activeTab = signal<TabKey>('ALL');
  search = signal('');

  status = signal<'ALL' | InvoiceStatus>('ALL');
  currency = signal<'ALL' | Currency>('ALL');
  year = signal<'ALL' | '2025' | '2024'>('ALL');

  statusOpts: UiSelectOption<'ALL' | InvoiceStatus>[] = [
    { label: 'Status', value: 'ALL' },
    { label: 'Received', value: 'RECEIVED' },
    { label: 'Pending', value: 'PENDING' },
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

  rows = signal<InvoiceRow[]>([
    {
      invoice: 'EBC 000920396',
      date: 'Ноя 15, 2025',
      vendor: 'N  NAVARH BTB SRL',
      amount: 2011.39,
      currency: 'MDL',
      status: 'RECEIVED',
    },
    {
      invoice: 'EBC 000835038',
      date: 'Ноя 12, 2025',
      vendor: 'N  NAVARH BTB SRL',
      amount: 398.44,
      currency: 'MDL',
      status: 'RECEIVED',
    },
    {
      invoice: 'EBC000759599',
      date: 'Ноя 10, 2025',
      vendor: 'C  CEGOLTAR SRL',
      amount: 385.5,
      currency: 'MDL',
      status: 'RECEIVED',
    },
    {
      invoice: 'EBC 000692166',
      date: 'Ноя 7, 2025',
      vendor: 'C  COMPASS F.T.S. SRL',
      amount: 3072.0,
      currency: 'MDL',
      status: 'RECEIVED',
    },
    {
      invoice: 'INV-USD-001',
      date: 'Окт 1, 2025',
      vendor: 'S  STILIST GRUP SRL',
      amount: 1200,
      currency: 'USD',
      status: 'PENDING',
    },
  ]);

  totalInvoices = computed(() => this.rows().length);
  totalValue = computed(() => this.rows().reduce((s, r) => s + r.amount, 0));
  avgInvoice = computed(() => (this.rows().length ? this.totalValue() / this.rows().length : 0));
  pendingCount = computed(() => this.rows().filter((r) => r.status === 'PENDING').length);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();

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
    return s === 'RECEIVED'
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-orange-100 text-orange-700 border-orange-200';
  }

  onSync() {
    console.log('sync invoices');
  }
  onReceiveAll() {
    console.log('receive all');
  }
  onDeleteSelected() {
    console.log('delete selected');
  }
}
