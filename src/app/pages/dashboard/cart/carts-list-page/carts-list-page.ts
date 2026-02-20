import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type CartStatus = 'ACTIVE' | 'SUBMITTED';

type CartRow = {
  id: number;
  customerEmail: string;
  customerInitial: string;
  items: number;
  status: CartStatus;
  lastUpdated: string; // "Jan 7, 2026"
};

type TabKey = 'ALL' | 'ACTIVE' | 'SUBMITTED';

@Component({
  selector: 'app-carts-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carts-list-page.html',
})
export class CartsListPage {
  tab = signal<TabKey>('ALL');
  search = signal('');

  rows = signal<CartRow[]>([
    {
      id: 81,
      customerEmail: 'test52@gmail.com',
      customerInitial: 'T',
      items: 2,
      status: 'ACTIVE',
      lastUpdated: 'Jan 7, 2026',
    },
    {
      id: 80,
      customerEmail: 'nikitareznov@gmail.com',
      customerInitial: 'A',
      items: 2,
      status: 'ACTIVE',
      lastUpdated: 'Jan 7, 2026',
    },
  ]);

  stats = computed(() => {
    const all = this.rows();
    const active = all.filter((x) => x.status === 'ACTIVE').length;
    const submitted = all.filter((x) => x.status === 'SUBMITTED').length;
    return { total: all.length, active, submitted };
  });

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const t = this.tab();

    return this.rows().filter((r) => {
      const byTab =
        t === 'ALL' ? true : t === 'ACTIVE' ? r.status === 'ACTIVE' : r.status === 'SUBMITTED';

      const bySearch = !q || String(r.id).includes(q) || r.customerEmail.toLowerCase().includes(q);

      return byTab && bySearch;
    });
  });

  setTab(t: TabKey) {
    this.tab.set(t);
  }
}
