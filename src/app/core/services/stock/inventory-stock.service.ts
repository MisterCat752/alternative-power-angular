import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

export interface StockItem {
  product: number;
  product_code: string;
  product_name: string;

  location: number;
  location_code: string;

  qty_on_hand: string; // decimal как строка
}

export interface StockResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: StockItem[];
}
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
export type StockOrdering = 'qty_on_hand' | '-qty_on_hand' | 'product__code' | '-product__code';

@Injectable({ providedIn: 'root' })
export class InventoryStockService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getStock(params: {
    search?: string;
    location_code?: string;
    ordering?: StockOrdering;
    page?: number;
    page_size?: number;
  }) {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== 'ALL') {
        httpParams = httpParams.set(key, value as string);
      }
    });

    return this.http.get<StockResponse>(`${this.baseUrl}/inventory/stock/`, { params: httpParams });
  }

  // 🆕 НОВОЕ — stock moves
  getStockMoves(params: {
    location_code?: string;
    location?: string;
    direction?: string;
    state?: string;
    product?: number;
    page?: number;
    page_size?: number;
  }) {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== 'ALL') {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return this.http.get<StockMoveResponse>(`${this.baseUrl}/inventory/stock-moves/`, {
      params: httpParams,
    });
  }
}
