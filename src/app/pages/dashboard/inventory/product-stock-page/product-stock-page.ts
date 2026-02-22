import { Component, computed, inject, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { RouterLink } from '@angular/router';
import { ActionMenu } from '../../../../shared/ui/action-menu/action-menu';
import { StockService } from '../../../../core/services/stock.service';

type LocationKey =
  | 'ALL'
  | 'CUSTOMERS'
  | 'MAIN'
  | 'SCRAPPED'
  | 'SUPPLIER'
  | 'VIRTUAL'
  | 'WH_DAMAGED'
  | 'WH_MAIN'
  | 'WH_RETURNS'
  | 'WH_STORE'
  | 'WH_TRANSIT';

type StockStatusKey = 'ALL' | 'IN_STOCK_ONLY';

@Component({
  selector: 'app-product-stock-page',
  standalone: true,
  imports: [UiSelect, RouterLink, ActionMenu],
  templateUrl: './product-stock-page.html',
})
export class ProductStockPage {
  private stockService = inject(StockService);

  rows = signal(this.stockService.getStock());

  search = signal('');

  location = signal<LocationKey>('ALL');
  stockStatus = signal<StockStatusKey>('ALL');

  locationOptions: UiSelectOption<LocationKey>[] = [
    { label: 'All locations', value: 'ALL' },
    { label: 'Customers', value: 'CUSTOMERS' },
    { label: 'Main', value: 'MAIN' },
    { label: 'Scrapped', value: 'SCRAPPED' },
    { label: 'Supplier', value: 'SUPPLIER' },
    { label: 'Virtual', value: 'VIRTUAL' },
    { label: 'WH Damaged', value: 'WH_DAMAGED' },
    { label: 'WH Main', value: 'WH_MAIN' },
    { label: 'WH Returns', value: 'WH_RETURNS' },
    { label: 'WH Store', value: 'WH_STORE' },
    { label: 'WH Transit', value: 'WH_TRANSIT' },
  ];

  stockStatusOpts: UiSelectOption<StockStatusKey>[] = [
    { label: 'All', value: 'ALL' },
    { label: 'In stock only', value: 'IN_STOCK_ONLY' },
  ];

  filtered = computed(() => {
    const q = this.search().toLowerCase();

    return this.rows().filter((r) => {
      const matchSearch =
        !q || r.sku.toLowerCase().includes(q) || r.productName.toLowerCase().includes(q);

      const matchLocation = this.location() === 'ALL' ? true : r.location === this.location();

      const matchStatus = this.stockStatus() === 'ALL' ? true : r.qty > 0;

      return matchSearch && matchLocation && matchStatus;
    });
  });
}
