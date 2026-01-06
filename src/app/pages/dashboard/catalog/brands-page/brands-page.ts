import { Component } from '@angular/core';

type BrandRow = {
  name: string;
  slug: string;
  website?: string;
  country?: string;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

@Component({
  selector: 'app-brands-page',
  standalone: true,
  templateUrl: './brands-page.html',
})
export class BrandsPage {
  rows: BrandRow[] = [
    { name: 'DEYE', slug: 'deye', website: '—', country: '—' },
    { name: 'LONGI', slug: 'longi', website: '—', country: '—' },
    { name: 'V-TAC', slug: 'v-tac', website: '—', country: '—' },
  ];

  initials = initials;
}
