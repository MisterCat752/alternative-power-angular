import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Container } from '../../shared/container/container';
import { ProductCardComponent } from '../../shared/product-card/product-card';
import {
  FiltersPanelComponent,
  FilterGroup,
  FiltersValue,
} from '../../shared/filters-panel/filters-panel';
import { ProductService } from '../../core/services/products/product.service';
import { Product } from '../../core/models/products/product.model';
import { CATEGORY_FILTERS_MOCK } from '../../core/mock/filters.mock';
import { CategoryFilterService } from '../../core/services/filter.service';
import { CartService } from '../../core/services/cart.service';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [Container, MatIcon, ProductCardComponent, FiltersPanelComponent, RouterLink],
  templateUrl: './catalog.html',
})
export class CatalogPage {
  private productService = inject(ProductService);
  private categoryFilterService = inject(CategoryFilterService);
  private route = inject(ActivatedRoute);
  mobileFiltersOpen = false;
  filterGroups = CATEGORY_FILTERS_MOCK;
  categorySlug = signal<string>('accumulators');
  filters = signal<FiltersValue>({});
  perPage = signal(12);
  view = signal<'grid' | 'list'>('grid');
  sort = signal<'default' | 'priceAsc' | 'priceDesc'>('default');

  // список продуктов из сервиса
  products = signal<Product[]>([]);
  filtered = computed(() => this.productService.filterProducts(this.products(), this.filters()));
  // итоговый список после сортировки/лимита
  visibleProducts = computed(() => {
    let list = [...this.filtered()];

    // сортировка
    if (this.sort() === 'priceAsc') list.sort((a, b) => a.price - b.price);
    if (this.sort() === 'priceDesc') list.sort((a, b) => b.price - a.price);

    return list.slice(0, this.perPage());
  });

  groups: FilterGroup[] = [];

  constructor() {
    // читаем slug категории из URL
    this.route.paramMap.subscribe((p) => {
      const slug = p.get('categorySlug') || 'accumulators';
      this.categorySlug.set(slug);
      this.filters.set({});
      this.loadProducts(slug);
      this.loadFilters(slug);
    });
  }
  cartService = inject(CartService);

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }
  // получаем продукты через сервис
  loadProducts(categorySlug: string) {
    this.productService.getProducts({ category: categorySlug }).subscribe((res) => {
      this.products.set(res);
    });

    // подставим фильтры по категории (можно расширить)
    const filtersByCategory: Record<string, FilterGroup[]> = {
      accumulators: [
        { key: 'price', title: 'Price range', type: 'price', opened: true },
        { key: 'brands', title: 'Brands', type: 'checkbox', opened: true, options: [] }, // можно динамически заполнить из products
      ],
      inverters: [
        { key: 'price', title: 'Price range', type: 'price', opened: true },
        { key: 'brands', title: 'Brands', type: 'checkbox', opened: true, options: [] },
      ],
    };
    this.groups = filtersByCategory[categorySlug] ?? [];
  }
  loadFilters(category: string) {
    this.categoryFilterService.getFilters(category).subscribe((f) => {
      this.groups = f;
    });
  }
  trackByTitle = (p: Product) => p.title;

  onFiltersChange(v: FiltersValue) {
    this.filters.set(v);

    // фильтруем по выбранным фильтрам
    this.productService
      .getProducts({
        category: this.categorySlug(),
        search: v['search'] as string,
      })
      .subscribe((res) => this.products.set(res));
  }
}
