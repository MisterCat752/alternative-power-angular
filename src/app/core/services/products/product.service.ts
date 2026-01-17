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
