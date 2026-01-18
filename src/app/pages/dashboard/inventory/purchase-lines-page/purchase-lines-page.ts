import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { RouterLink } from '@angular/router';

type Currency = 'MDL' | 'EUR' | 'USD';

type PurchaseLineRow = {
  date: string; // "Ноя 15"
  year: string; // "2025"
  invoice: string; // "EBC 000920396"
  product: string; // "151295"
  vendor: string; // "NAVARH BTB SRL"
  qty: number;
  uom: string; // "PCS"
  unitCost: number;
  currency: Currency;
};

@Component({
  selector: 'app-purchase-lines-page',
  standalone: true,
  imports: [UiSelect, RouterLink],
  templateUrl: './purchase-lines-page.html',
})
export class PurchaseLinesPage {
  tab = signal<'ALL' | Currency>('ALL');

  search = signal('');
  vendor = signal<'ALL' | string>('ALL');
  currency = signal<'ALL' | Currency>('ALL');
  year = signal<'ALL' | string>('ALL');

  vendorOpts: UiSelectOption<'ALL' | string>[] = [
    { label: 'Vendor', value: 'ALL' },
    { label: 'NAVARH BTB SRL', value: 'NAVARH BTB SRL' },
    { label: 'CEGOLTAR SRL', value: 'CEGOLTAR SRL' },
  ];

  currencyOpts: UiSelectOption<'ALL' | Currency>[] = [
    { label: 'Currency', value: 'ALL' },
    { label: 'MDL', value: 'MDL' },
    { label: 'EUR', value: 'EUR' },
    { label: 'USD', value: 'USD' },
  ];

  yearOpts: UiSelectOption<'ALL' | string>[] = [
    { label: 'Year', value: 'ALL' },
    { label: '2025', value: '2025' },
    { label: '2024', value: '2024' },
  ];

  rows = signal<PurchaseLineRow[]>([
    {
      date: 'Ноя 15',
      year: '2025',
      invoice: 'EBC 000920396',
      product: '151295',
      vendor: 'NAVARH BTB SRL',
      qty: 1,
      uom: 'PCS',
      unitCost: 111.99,
      currency: 'MDL',
    },
    {
      date: 'Ноя 15',
      year: '2025',
      invoice: 'EBC 000920396',
      product: '150222',
      vendor: 'NAVARH BTB SRL',
      qty: 1,
      uom: 'PCS',
      unitCost: 1564.17,
      currency: 'MDL',
    },
    {
      date: 'Ноя 12',
      year: '2025',
      invoice: 'EBC 000835038',
      product: '399416',
      vendor: 'NAVARH BTB SRL',
      qty: 5,
      uom: 'PCS',
      unitCost: 66.41,
      currency: 'MDL',
    },
    {
      date: 'Ноя 10',
      year: '2025',
      invoice: 'EBC000751248',
      product: '280567',
      vendor: 'CEGOLTAR SRL',
      qty: 28,
      uom: 'PCS',
      unitCost: 8.25,
      currency: 'MDL',
    },
  ]);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();

    return this.rows().filter((r) => {
      const byTab = this.tab() === 'ALL' ? true : r.currency === this.tab();
      const bySearch =
        !q ||
        r.invoice.toLowerCase().includes(q) ||
        r.product.toLowerCase().includes(q) ||
        r.vendor.toLowerCase().includes(q);

      const byVendor = this.vendor() === 'ALL' ? true : r.vendor === this.vendor();
      const byCur = this.currency() === 'ALL' ? true : r.currency === this.currency();
      const byYear = this.year() === 'ALL' ? true : r.year === this.year();

      return byTab && bySearch && byVendor && byCur && byYear;
    });
  });
}
