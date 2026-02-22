import { Component, computed, effect, inject, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { StatCard } from '../../../../shared/stat-card/stat-card';
import {
  InventoryStockService,
  StockMove,
} from '../../../../core/services/stock/inventory-stock.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type LocKey = 'ALL' | 'WH_MAIN' | 'WH_STORE' | 'WH_TRANSIT' | 'WH_DAMAGED' | 'WH_RETURNS';

@Component({
  selector: 'app-stock-page',
  standalone: true,
  imports: [UiSelect, StatCard, CommonModule, RouterLink],
  templateUrl: './stock-moves-page.html',
})
export class StockMovesPage {
  private stockApi = inject(InventoryStockService);

  search = signal('');
  location = signal<LocKey>('ALL');
  state = signal<'ALL' | 'draft' | 'posted' | 'canceled'>('ALL');

  page = signal(1);
  pageSize = signal(10);

  rows = signal<StockMove[]>([]);
  total = signal(0);
  loading = signal(false);

  totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));

  locationOpts: UiSelectOption<LocKey>[] = [
    { label: 'All', value: 'ALL' },
    { label: 'WH Main', value: 'WH_MAIN' },
    { label: 'WH Store', value: 'WH_STORE' },
    { label: 'WH Transit', value: 'WH_TRANSIT' },
    { label: 'WH Damaged', value: 'WH_DAMAGED' },
    { label: 'WH Returns', value: 'WH_RETURNS' },
  ];

  stateOpts: UiSelectOption<'ALL' | 'draft' | 'posted' | 'canceled'>[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Draft', value: 'draft' },
    { label: 'Posted', value: 'posted' },
    { label: 'Canceled', value: 'canceled' },
  ];

  constructor() {
    effect(() => {
      this.page();
      this.search();
      this.location();
      this.state();
      this.loadMoves();
    });
  }

  loadMoves() {
    this.loading.set(true);

    this.stockApi
      .getStockMoves({
        search: this.search(),
        location_code: this.location(),
        state: this.state(),
        page: this.page(),
        page_size: this.pageSize(),
      })
      .subscribe((res) => {
        this.rows.set(res.results);
        this.total.set(res.count);
        console.log(this.rows(), 'rows');
        this.loading.set(false);
      });
  }

  stats = computed(() => [
    {
      title: 'Total moves',
      value: this.total(),
      icon: '📦',
    },
  ]);

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
    }
  }
}
