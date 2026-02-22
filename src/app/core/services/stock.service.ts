import { Injectable } from '@angular/core';
import { STOCK_MOCK } from '../mock/stock.mock';
import { PRODUCTS_MOCK } from '../mock/product.mock';

@Injectable({ providedIn: 'root' })
export class StockService {
  getStock() {
    return STOCK_MOCK.map((s) => {
      const product = PRODUCTS_MOCK.find((p) => p.id === s.productId);

      return {
        ...s,
        productName: product?.title ?? 'Unknown product',
        image: product?.image ?? null,
      };
    });
  }

  getSummary() {
    const items = this.getStock();

    const totalQty = items.reduce((a, b) => a + b.qty, 0);

    return {
      totalItems: items.length,
      inStock: items.filter((i) => i.qty > 0).length,
      outStock: items.filter((i) => i.qty === 0).length,
      totalQty,
    };
  }
}
