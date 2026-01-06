import { Component } from '@angular/core';

type CategoryRow = {
  name: string;
  slug: string;
  parent?: string;
  status: 'ACTIVE' | 'INACTIVE';
};

@Component({
  selector: 'app-categories-page',
  standalone: true,
  templateUrl: './categories-page.html',
})
export class CategoriesPage {
  rows: CategoryRow[] = [
    { name: 'Inverters', slug: 'inverters', status: 'ACTIVE' },
    { name: 'Solar panels', slug: 'solar-panels', status: 'ACTIVE' },
    { name: 'Batteries', slug: 'batteries', status: 'ACTIVE' },
    { name: 'Accessories', slug: 'accessories', status: 'ACTIVE' },
    { name: 'Kits', slug: 'kits', status: 'ACTIVE' },
    { name: 'External imports', slug: 'external-imports', status: 'INACTIVE' },
    { name: 'Hybrid inverters', slug: 'inverters-hybrid', parent: 'inverters', status: 'ACTIVE' },
  ];
}
