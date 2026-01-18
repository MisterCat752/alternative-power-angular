import { Component, computed, effect, inject, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { StatCard } from '../../../../shared/stat-card/stat-card';
import {
  InventoryStockService,
  StockItem,
  StockMove,
} from '../../../../core/services/stock/inventory-stock.service';
import { InventoryLocationsService } from '../../../../core/services/locations/inventory-locations.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type LocKey = 'ALL' | 'WH_MAIN' | 'WH_STORE' | 'WH_TRANSIT' | 'WH_DAMAGED' | 'WH_RETURNS';
type Direction = 'all' | 'in' | 'out';
@Component({
  selector: 'app-stock-page',
  standalone: true,
  imports: [UiSelect, StatCard, CommonModule, RouterLink],
  templateUrl: './stock-moves-page.html',
})
export class StockMovesPage {
  private stockApi = inject(InventoryStockService);
  private locationsApi = inject(InventoryLocationsService);
  totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));
  // filters
  location = signal<string | 'ALL'>('ALL');
  location2 = signal<string | 'ALL'>('ALL');
  direction = signal<Direction>('all');
  state = signal<'ALL' | 'draft' | 'posted' | 'canceled'>('ALL');
  search = signal('');
  page = signal(1);
  pageSize = signal(25);

  total = signal(0);
  rows = signal<StockMove[]>([]);
  loading = signal(false);

  locOpts = signal<UiSelectOption<string | 'ALL'>[]>([{ label: 'All locations', value: 'ALL' }]);
  locOpts2 = signal<UiSelectOption<string | 'ALL'>[]>([{ label: 'All locations', value: 'ALL' }]);
  directionOpts: UiSelectOption<Direction>[] = [
    { label: 'All', value: 'all' },
    { label: 'Inbound', value: 'in' },
    { label: 'Outbound', value: 'out' },
  ];

  stateOpts: UiSelectOption<'ALL' | 'draft' | 'posted' | 'canceled'>[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Draft', value: 'draft' },
    { label: 'Posted', value: 'posted' },
    { label: 'Canceled', value: 'canceled' },
  ];

  constructor() {
    this.loadLocations();

    effect(() => {
      this.page();
      this.location();
      this.direction();
      this.state();

      this.loadMoves();
    });
  }

  loadLocations() {
    this.locationsApi.getLocations().subscribe((res) => {
      const options = [
        { label: 'All locations', value: 'ALL' },
        ...res.results.map((l) => ({
          label: `${l.code} — ${l.name}`,
          value: l.code,
        })),
      ];
      this.locOpts.set(options);
      this.locOpts2.set(options); // 🆕 дублируем для второго селекта
    });
  }

  loadMoves() {
    this.loading.set(true);

    const locValue = this.location() === 'ALL' ? undefined : this.location();
    const loc2Value = this.location2() === 'ALL' ? undefined : this.location2();

    this.stockApi
      .getStockMoves({
        page: this.page(),
        page_size: this.pageSize(),
        location_code: locValue, // старый
        location: loc2Value, // новый
        direction: this.direction() === 'all' ? undefined : this.direction(),
        state: this.state() === 'ALL' ? undefined : this.state(),
      })
      .subscribe({
        next: (res) => {
          this.rows.set(res.results);
          this.total.set(res.count);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
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
    this.page.update((p) => p + 1);
  }

  prevPage() {
    this.page.update((p) => Math.max(1, p - 1));
  }
}
