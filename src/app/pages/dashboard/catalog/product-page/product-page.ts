import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ActionMenu } from '../../../../shared/ui/action-menu/action-menu';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/products/product.service';
import { Product } from '../../../../core/models/products/product.model';
import { CategoryService } from '../../../../core/services/category.service';
import { BrandService } from '../../../../core/services/brand.service';
type Currency = 'EUR' | 'MDL';
type Row = {
  id: number;
  sku: string;
  name: string;
  img?: string;
  invoice: number;
  landed: number;
  website: number;
  websiteMdl: number;
  curr: 'EUR' | 'MDL';
  category?: string;
  brand?: string;
  stock: number;
  invoiceCode?: string;
};

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [NgClass, ActionMenu, CommonModule, RouterLink],
  templateUrl: './product-page.html',
})
export class ProductsPage implements OnInit {
  categories: Record<string, string> = {};
  brands: Record<string, string> = {};
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router,
  ) {}

  rows = signal<Row[]>([]);
  search = signal('');

  ngOnInit(): void {
    this.loadProducts();
    this.loadDictionaries();
    this.loadProducts();
  }

  loadDictionaries() {
    this.categoryService.list().subscribe((res) => {
      res.forEach((c) => {
        this.categories[c.id] = c.name;
      });
    });

    this.brandService.list().subscribe((res) => {
      res.forEach((b) => {
        this.brands[b.id] = b.name;
      });
    });
  }
  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      const mapped = products.map((p) => this.mapProductToRow(p));
      this.rows.set(mapped);
    });
  }

  mapProductToRow(p: Product): Row {
    const invoiceValue = p.settings?.invoice ? Number(p.settings.invoice) : (p.price ?? 0);
    const basePrice = invoiceValue || 0;
    const currency: Currency = p.pricing?.currency === 'MDL' ? 'MDL' : 'EUR';

    return {
      id: p.id,
      sku: p.sku ?? '',
      name: p.title ?? '',
      img: p.image ?? '',

      invoice: basePrice,
      landed: basePrice * 1.2,

      website: invoiceValue,
      websiteMdl: basePrice * 19.7,

      curr: currency,

      category: p.category ? (this.categories[p.category] ?? p.category) : '',
      brand: p.brand ? (this.brands[p.brand] ?? p.brand) : '',

      stock: p.quantity ?? 0,
      invoiceCode: p.sku ?? '',
    };
  }

  filtered = computed(() => {
    const q = this.search().toLowerCase().trim();
    if (!q) return this.rows();

    return this.rows().filter((r) =>
      [r.sku, r.name, r.category, r.brand, r.invoiceCode].join(' ').toLowerCase().includes(q),
    );
  });

  onSearch(value: string) {
    this.search.set(value);
  }

  refresh() {
    this.loadProducts();
  }

  handleAction(row: Row, action: string) {
    switch (action) {
      case 'edit':
        // Редирект на страницу редактирования с id продукта
        this.router.navigate([`/dashboard/catalog/products/edit/${row.id}`]);
        break;

      case 'delete':
        if (confirm(`Are you sure you want to delete product "${row.name}"?`)) {
          // Найти продукт по sku (или id, если есть)
          const product = this.rows().find((r) => r.sku === row.sku);
          if (product) {
            this.productService.deleteProduct(product.sku).subscribe(() => {
              alert('Product deleted');
              this.refresh();
            });
          }
        }
        break;

      case 'view':
        console.log('view', row);
        break;
    }
  }
}
