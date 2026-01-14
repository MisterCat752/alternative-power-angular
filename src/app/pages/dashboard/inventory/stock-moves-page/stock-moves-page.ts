import { Component, computed, effect, inject, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { StatCard } from '../../../../shared/stat-card/stat-card';
import {
  InventoryStockService,
  StockItem,
} from '../../../../core/services/stock/inventory-stock.service';
import { InventoryLocationsService } from '../../../../core/services/locations/inventory-locations.service';

type LocKey = 'ALL' | 'WH_MAIN' | 'WH_STORE' | 'WH_TRANSIT' | 'WH_DAMAGED' | 'WH_RETURNS';

@Component({
  selector: 'app-stock-page',
  standalone: true,
  imports: [UiSelect, StatCard],
  templateUrl: './stock-moves-page.html',
})
export class StockMovesPage {
  private stockApi = inject(InventoryStockService);
  private locationsApi = inject(InventoryLocationsService);
  search = signal('');
  location = signal<string>('ALL');

  page = signal(1);
  pageSize = signal(25);

  total = signal(0);
  rows = signal<StockItem[]>([]);
  loading = signal(false);

  locOpts = signal<UiSelectOption<string | 'ALL'>[]>([{ label: 'All locations', value: 'ALL' }]);

  constructor() {
    this.loadLocations();
  }
  loadLocations() {
    this.locationsApi.getLocations().subscribe((locations) => {
      this.locOpts.set([
        { label: 'All locations', value: 'ALL' },
        ...locations.map((l) => ({
          label: `${l.code} — ${l.name}`,
          value: l.code, // 👈 ВАЖНО
        })),
      ]);
    });
  }
  stats = computed(() => [
    {
      title: 'Total records',
      value: this.total(),
      icon: '📦',
    },
  ]);

  load = effect(() => {
    this.loading.set(true);

    this.stockApi
      .getStock({
        search: this.search(),
        location_code: this.location() === 'ALL' ? undefined : this.location(),
        page: this.page(),
        page_size: this.pageSize(),
        ordering: '-qty_on_hand',
      })
      .subscribe({
        next: (res) => {
          this.rows.set(res.results);
          this.total.set(res.count);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  });
}
