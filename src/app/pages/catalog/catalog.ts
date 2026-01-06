import { Component, computed, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

import { Container } from '../../shared/container/container';
import { ProductCardComponent } from '../../shared/product-card/product-card';
import {
  FiltersPanelComponent,
  FilterGroup,
  FiltersValue,
} from '../../shared/filters-panel/filters-panel';

type Product = {
  title: string;
  imageUrl: string;
  inStock: boolean;
  price: number;
  brand?: string;
};

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [Container, RouterLink, ProductCardComponent, FiltersPanelComponent],
  templateUrl: './catalog.html',
})
export class CatalogPage {
  categorySlug = signal<string>('accumulators');

  // для демо: фильтры разные на разные категории
  private filtersByCategory: Record<string, FilterGroup[]> = {
    accumulators: [
      { key: 'price', title: 'Price range', type: 'price', opened: true },
      {
        key: 'availability',
        title: 'Availability',
        type: 'checkbox',
        opened: true,
        options: [
          { label: 'In stock', value: 'in', count: 24 },
          { label: 'Pre-book', value: 'pre', count: 3 },
          { label: 'Out of stock', value: 'out', count: 7 },
        ],
      },
      {
        key: 'brands',
        title: 'Brands',
        type: 'checkbox',
        opened: true,
        options: [
          { label: 'DEYE', value: 'deye', count: 13 },
          { label: 'LONGI', value: 'longi', count: 12 },
          { label: 'V-TAC', value: 'vtac', count: 24 },
        ],
      },
      {
        key: 'productType',
        title: 'Product Type',
        type: 'checkbox',
        opened: false,
        options: [
          { label: 'Bundle (Kit)', value: 'kit' },
          { label: 'External / Imported', value: 'imported' },
          { label: 'Service', value: 'service' },
          { label: 'Stockable', value: 'stockable' },
        ],
      },
    ],
    inverters: [
      { key: 'price', title: 'Price range', type: 'price', opened: true },
      {
        key: 'brands',
        title: 'Brands',
        type: 'checkbox',
        opened: true,
        options: [
          { label: 'DEYE', value: 'deye' },
          { label: 'Growatt', value: 'growatt' },
          { label: 'Huawei', value: 'huawei' },
        ],
      },
      {
        key: 'phase',
        title: 'Phase',
        type: 'checkbox',
        opened: true,
        options: [
          { label: '1 phase', value: '1' },
          { label: '3 phase', value: '3' },
        ],
      },
    ],
  };

  groups = computed(
    () => this.filtersByCategory[this.categorySlug()] ?? this.filtersByCategory['accumulators']
  );

  // выбранные фильтры
  filters = signal<FiltersValue>({});

  // настройки тулбара
  perPage = signal(12);
  view = signal<'grid' | 'list'>('grid');
  sort = signal<'default' | 'priceAsc' | 'priceDesc'>('default');

  // mock products (потом заменишь на API)
  products = signal<Product[]>([
    {
      title: 'Acumulator LiFePo4 5.12kWh V-TAC',
      imageUrl: 'https://picsum.photos/id/1040/900/600',
      inStock: true,
      price: 4829.83,
      brand: 'vtac',
    },
    {
      title: 'Acumulator LiFePo4 5.12kWh V-TAC (Rack)',
      imageUrl: 'https://picsum.photos/id/1041/900/600',
      inStock: true,
      price: 4829.83,
      brand: 'vtac',
    },
    {
      title: 'Acumulator LiFePo4 5.12kWh V-TAC (White)',
      imageUrl: 'https://picsum.photos/id/1042/900/600',
      inStock: false,
      price: 4829.83,
      brand: 'vtac',
    },
    {
      title: 'Battery Deye 10kWh',
      imageUrl: 'https://picsum.photos/id/1043/900/600',
      inStock: true,
      price: 6500,
      brand: 'deye',
    },
    {
      title: 'Battery LONGI 5kWh',
      imageUrl: 'https://picsum.photos/id/1044/900/600',
      inStock: true,
      price: 3200,
      brand: 'longi',
    },
  ]);

  // итоговый список (пока демо: только сорт + лимит; фильтры подключим когда будешь готов)
  visibleProducts = computed(() => {
    let list = [...this.products()];

    if (this.sort() === 'priceAsc') list.sort((a, b) => a.price - b.price);
    if (this.sort() === 'priceDesc') list.sort((a, b) => b.price - a.price);

    return list.slice(0, this.perPage());
  });

  trackByTitle = (p: Product) => p.title;

  constructor(route: ActivatedRoute) {
    route.paramMap.subscribe((p) => {
      this.categorySlug.set(p.get('categorySlug') || 'accumulators');
      this.filters.set({});
    });
  }

  onFiltersChange(v: FiltersValue) {
    this.filters.set(v);
    console.log('filters', v);
  }
}
