import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';

type VendorStatus = 'ACTIVE' | 'INACTIVE';

type VendorRow = {
  name: string;
  email?: string;
  phone?: string;
  status: VendorStatus;
};

@Component({
  selector: 'app-vendors-page',
  standalone: true,
  imports: [UiSelect],
  templateUrl: './vendors-page.html',
})
export class VendorsPage {
  tab = signal<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  search = signal('');

  status = signal<'ALL' | VendorStatus>('ALL');

  statusOpts: UiSelectOption<'ALL' | VendorStatus>[] = [
    { label: 'Status', value: 'ALL' },
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'INACTIVE', value: 'INACTIVE' },
  ];

  rows = signal<VendorRow[]>([
    { name: 'AGENTIA SERVICII PUBLICE', status: 'ACTIVE' },
    { name: 'ALINER-SERVICE SRL', status: 'ACTIVE' },
    { name: 'AMARA SOLAR RENOVABLES S.L.', status: 'ACTIVE' },
    { name: 'AUTO MOTION SERVICE SRL', status: 'ACTIVE' },
    { name: 'AUTO-SAN PRIM S.R.L.', status: 'ACTIVE' },
    { name: 'AVECOR ENERGY SRL', status: 'ACTIVE' },
    { name: 'BICOMPLEX', status: 'ACTIVE' },
    { name: 'COMPANY INACTIVE DEMO', status: 'INACTIVE' },
  ]);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();

    return this.rows().filter((r) => {
      const byTab = this.tab() === 'ALL' ? true : r.status === this.tab();
      const byStatus = this.status() === 'ALL' ? true : r.status === this.status();
      const bySearch = !q || r.name.toLowerCase().includes(q);
      return byTab && byStatus && bySearch;
    });
  });
}
