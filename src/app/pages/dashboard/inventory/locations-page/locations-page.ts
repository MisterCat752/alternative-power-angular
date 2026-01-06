import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';

type UsageType = 'INTERNAL' | 'SUPPLIER' | 'CUSTOMER' | 'VIRTUAL';
type Status = 'ACTIVE' | 'EMPTY';

type LocationRow = {
  code: string;
  name: string;
  usageType: UsageType;
  parent: 'ROOT' | string;
  products: number;
  status: Status;
};

@Component({
  selector: 'app-locations-page',
  standalone: true,
  imports: [UiSelect],
  templateUrl: './locations-page.html',
})
export class LocationsPage {
  tab = signal<'ALL' | UsageType>('ALL');

  search = signal('');
  parent = signal<'ALL' | string>('ALL');
  usage = signal<'ALL' | UsageType>('ALL');

  parentOpts: UiSelectOption<'ALL' | string>[] = [
    { label: 'Parent Location', value: 'ALL' },
    { label: 'ROOT', value: 'ROOT' },
  ];

  usageOpts: UiSelectOption<'ALL' | UsageType>[] = [
    { label: 'Usage Type', value: 'ALL' },
    { label: 'INTERNAL', value: 'INTERNAL' },
    { label: 'SUPPLIER', value: 'SUPPLIER' },
    { label: 'CUSTOMER', value: 'CUSTOMER' },
    { label: 'VIRTUAL', value: 'VIRTUAL' },
  ];

  rows = signal<LocationRow[]>([
    {
      code: 'CUSTOMERS',
      name: 'Customer Locations',
      usageType: 'CUSTOMER',
      parent: 'ROOT',
      products: 0,
      status: 'EMPTY',
    },
    {
      code: 'MAIN',
      name: 'Main Warehouse',
      usageType: 'INTERNAL',
      parent: 'ROOT',
      products: 1,
      status: 'ACTIVE',
    },
    {
      code: 'SCRAPPED',
      name: 'Scrapped / Lost',
      usageType: 'VIRTUAL',
      parent: 'ROOT',
      products: 0,
      status: 'EMPTY',
    },
    {
      code: 'SUPPLIER',
      name: 'Supplier Location',
      usageType: 'SUPPLIER',
      parent: 'ROOT',
      products: 0,
      status: 'ACTIVE',
    },
    {
      code: 'VIRTUAL',
      name: 'Virtual Location',
      usageType: 'VIRTUAL',
      parent: 'ROOT',
      products: 0,
      status: 'EMPTY',
    },
    {
      code: 'WH/DAMAGED',
      name: 'Damaged Goods',
      usageType: 'INTERNAL',
      parent: 'ROOT',
      products: 0,
      status: 'EMPTY',
    },
    {
      code: 'WH/MAIN',
      name: 'Main Warehouse',
      usageType: 'INTERNAL',
      parent: 'ROOT',
      products: 1226,
      status: 'ACTIVE',
    },
  ]);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();

    return this.rows().filter((r) => {
      const byTab = this.tab() === 'ALL' ? true : r.usageType === this.tab();
      const bySearch = !q || r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q);
      const byParent = this.parent() === 'ALL' ? true : r.parent === this.parent();
      const byUsage = this.usage() === 'ALL' ? true : r.usageType === this.usage();
      return byTab && bySearch && byParent && byUsage;
    });
  });
}
