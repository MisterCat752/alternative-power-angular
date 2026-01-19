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
}
