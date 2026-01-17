import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type OfferStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

type OfferRow = {
  number: string;
  project: string;
  version: string;
  totalAmount: number;
  currency: 'MDL' | 'EUR' | 'USD';
  validUntil: string;
  createdBy: string; // letter
  status: OfferStatus;
};

type Tab = 'ALL' | 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

@Component({
  selector: 'app-offers-page',
  imports: [RouterLink],

  standalone: true,
  templateUrl: './offers-page.html',
})
export class OffersPage {
  tab = signal<Tab>('ALL');
  q = signal('');

  rows = signal<OfferRow[]>([
    {
      number: 'OF-20251211-031BA',
      project: '—',
      version: 'V1',
      totalAmount: 130117.48,
      currency: 'MDL',
      validUntil: 'Янв 10, 2026',
      createdBy: 'A',
      status: 'DRAFT',
    },
    {
      number: 'OF-20251210-EF978',
      project: '—',
      version: 'V2',
      totalAmount: 147272.49,
      currency: 'MDL',
      validUntil: 'Янв 09, 2026',
      createdBy: 'A',
      status: 'DRAFT',
    },
    {
      number: 'OF-20251210-B7BE1',
      project: '—',
      version: 'V1',
      totalAmount: 147272.49,
      currency: 'MDL',
      validUntil: 'Янв 09, 2026',
      createdBy: 'A',
      status: 'DRAFT',
    },
  ]);

  view = computed(() => {
    const q = this.q().trim().toLowerCase();
    return this.rows().filter((r) => {
      const byTab = this.tab() === 'ALL' ? true : r.status === this.tab();
      const byQ = !q || r.number.toLowerCase().includes(q);
      return byTab && byQ;
    });
  });

  statusBadge(s: OfferStatus) {
    if (s === 'ACCEPTED') return 'bg-green-100 text-green-700 border-green-200';
    if (s === 'REJECTED' || s === 'EXPIRED') return 'bg-red-100 text-red-700 border-red-200';
    if (s === 'SENT') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  }

  fmt(n: number) {
    return n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
