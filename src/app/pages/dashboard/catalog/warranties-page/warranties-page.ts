import { Component } from '@angular/core';

type WarrantyRow = {
  name: string;
  years: number;
  months: number;
  provider: 'MANUFACTURER' | 'SELLER' | 'SERVICE';
  serviceType: 'CARRY-IN' | 'ON-SITE' | 'PICKUP';
};

@Component({
  selector: 'app-warranties-page',
  standalone: true,
  templateUrl: './warranties-page.html',
})
export class WarrantiesPage {
  rows: WarrantyRow[] = [
    {
      name: '10y manufacturer',
      years: 10,
      months: 120,
      provider: 'MANUFACTURER',
      serviceType: 'CARRY-IN',
    },
  ];
}
