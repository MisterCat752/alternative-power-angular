import { Component, computed, inject, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { RouterLink } from '@angular/router';
import { ActionMenu } from '../../../../shared/ui/action-menu/action-menu';
import { StockService } from '../../../../core/services/stock.service';
import { ProductService } from '../../../../core/services/products/product.service';
import { Product } from '../../../../core/models/products/product.model';
import { DecimalPipe } from '@angular/common';
type StockRow = {
  id: string;
  productId: number;
  productName: string;
  location: string;
  qty: number;
  lastMove: string;
};
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
  imports: [UiSelect, RouterLink, ActionMenu, DecimalPipe],
  templateUrl: './product-stock-page.html',
})
export class ProductStockPage {
  private stockService = inject(StockService);
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  rows = signal<StockRow[]>([]);

  constructor() {
    this.stockService.getProductStock().subscribe((data) => {
      const productMoves = data.filter((m) => m.productId && !m.invoiceNumber);
      this.rows.set(productMoves);
    });

    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
    });
  }
  productPriceMap = computed(() => {
    const map = new Map<number, number>();

    for (const p of this.products()) {
      const price = p.pricing?.salePrice || p.price || 0;
      map.set(p.id, price);
    }

    return map;
  });
  totalStockValue = computed(() => {
    const priceMap = this.productPriceMap();

    return this.rows().reduce((sum, r) => {
      const price = priceMap.get(r.productId) || 0;
      return sum + r.qty * price;
    }, 0);
  });
  search = signal('');
  totalItems = computed(() => this.rows().length);

  itemsInStock = computed(() => this.rows().filter((r) => r.qty > 0).length);

  itemsOutOfStock = computed(() => this.rows().filter((r) => r.qty <= 0).length);

  uniqueSkus = computed(() => {
    const ids = new Set(this.rows().map((r) => r.productId));
    return ids.size;
  });

  totalQty = computed(() => this.rows().reduce((sum, r) => sum + r.qty, 0));
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
      const matchSearch = !q || r.productName.toLowerCase().includes(q);

      const matchLocation = this.location() === 'ALL' ? true : r.location === this.location();

      const matchStatus = this.stockStatus() === 'ALL' ? true : r.qty > 0;

      return matchSearch && matchLocation && matchStatus;
    });
  });
}
