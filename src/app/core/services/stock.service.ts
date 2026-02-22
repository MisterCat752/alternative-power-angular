import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { StockMovesService } from './stock/inventory-stock.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private moves: StockMovesService) {}

  getStockMoves() {
    return this.moves.getMoves();
  }

  getProductStock() {
    return this.moves.getMoves().pipe(
      map((moves) => {
        const mapStock = new Map();

        for (const m of moves) {
          const key = `${m.productId}_${m.to}`;

          if (!mapStock.has(key)) {
            mapStock.set(key, {
              id: key,
              productId: m.productId,
              productName: m.productName,
              location: m.to,
              qty: 0,
              lastMove: m.createdAt,
            });
          }

          const row = mapStock.get(key);
          row.qty += m.qty;
          row.lastMove = m.createdAt;
        }

        return Array.from(mapStock.values());
      }),
    );
  }
}
