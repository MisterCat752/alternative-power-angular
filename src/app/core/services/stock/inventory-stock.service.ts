import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { STOCK_MOVES_MOCK } from '../../mock/stock-moves.mock';

export interface StockMove {
  id: number;
  posted_at: string;
  state: 'draft' | 'posted' | 'canceled';
  invoice: string | null;
  external_id: string;

  qty: string;
  uom_display: string;

  product: number;
  product_code: string;
  product_name: string;

  source_code: string | null;
  dest_code: string | null;
}

export interface StockMoveResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: StockMove[];
}

@Injectable({ providedIn: 'root' })
export class InventoryStockService {
  private moves = [...STOCK_MOVES_MOCK];

  getStockMoves(params: {
    search?: string;
    location_code?: string;
    state?: string;
    page?: number;
    page_size?: number;
  }): Observable<StockMoveResponse> {
    let data = [...this.moves];

    if (params.search) {
      const q = params.search.toLowerCase();

      data = data.filter(
        (m) => m.product_code.toLowerCase().includes(q) || m.product_name.toLowerCase().includes(q),
      );
    }

    if (params.location_code && params.location_code !== 'ALL') {
      data = data.filter(
        (m) => m.source_code === params.location_code || m.dest_code === params.location_code,
      );
    }

    if (params.state && params.state !== 'ALL') {
      data = data.filter((m) => m.state === params.state);
    }

    const page = params.page ?? 1;
    const pageSize = params.page_size ?? 25;

    const start = (page - 1) * pageSize;
    const results = data.slice(start, start + pageSize);

    return of({
      count: data.length,
      next: null,
      previous: null,
      results,
    });
  }
}
