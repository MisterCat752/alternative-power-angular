// core/services/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PRODUCTS_MOCK } from '../../mock/product.mock';
import { Product } from '../../models/products/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProduct(id: number): Observable<Product | undefined> {
    return of(PRODUCTS_MOCK.find((p) => p.id === id));
  }
  deleteProduct(sku: string): Observable<void> {
    const index = PRODUCTS_MOCK.findIndex((p) => p.sku === sku);
    if (index !== -1) {
      PRODUCTS_MOCK.splice(index, 1);
    }
    return of(void 0);
  }
  getProducts(params?: { search?: string; category?: string }): Observable<Product[]> {
    let data = PRODUCTS_MOCK;

    if (params?.category) {
      data = data.filter((p) => p.category === params.category);
    }

    if (params?.search) {
      const s = params.search.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.brand?.toLowerCase().includes(s) ||
          p.sku?.toLowerCase().includes(s),
      );
    }

    return of(data);
  }
  createProduct(product: Product): Observable<Product> {
    product.id = PRODUCTS_MOCK.length + 1;
    PRODUCTS_MOCK.push(product);
    return of(product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const index = PRODUCTS_MOCK.findIndex((p) => p.id === id);
    if (index !== -1) {
      PRODUCTS_MOCK[index] = { ...product, id };
      return of(PRODUCTS_MOCK[index]);
    }
    return of(product);
  }

  filterProducts(products: Product[], filters: any): Product[] {
    if (!filters || Object.keys(filters).length === 0) return products;

    return products.filter((product) => {
      const specMap: Record<string, string[]> = {};

      product.specifications?.forEach((group) => {
        group.items.forEach((item) => {
          const key = item.label.toLowerCase();
          if (!specMap[key]) specMap[key] = [];
          specMap[key].push(item.value.toLowerCase());
        });
      });

      // проверяем каждый активный фильтр
      for (const key in filters) {
        const filterValue = filters[key];
        if (!filterValue || !filterValue.length) continue;

        const productValues = specMap[key];
        if (!productValues) return false;

        const match = filterValue.some((v: string) =>
          productValues.some((pv) => pv.includes(v.toLowerCase())),
        );

        if (!match) return false;
      }

      return true;
    });
  }
}
