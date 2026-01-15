import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PurchaseInvoiceDetailsDto } from '../../models/invoice';

// Интерфейс
export interface Location {
  code: string;
  name: string;
  type: 'internal' | 'external' | string;
}
export interface PurchaseInvoice {
  id: number;
  vendor_name: string;
  doc_number: string;
  doc_date: string;
  currency: 'MDL' | 'USD' | 'EUR' | 'RON';
  channel: 'resale' | 'project' | 'internal';
  doc_sum: string;
  status: 'draft' | 'received' | 'locked';
  external_id: string;
  changed_after_receipt: boolean;
  last_sync_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private apiUrl = `${environment.baseUrl}/inventory`;

  constructor(private http: HttpClient) {}

  getInvoices(
    status?: string,
    search?: string,
    page: number = 1,
    pageSize: number = 20
  ): Observable<PaginatedResponse<PurchaseInvoice>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    if (status) params = params.set('status', status);
    if (search) params = params.set('search', search);

    return this.http.get<PaginatedResponse<PurchaseInvoice>>(`${this.apiUrl}/purchase-invoices/`, {
      params,
    });
  }

  getInvoiceById(id: number) {
    return this.http.get<PurchaseInvoiceDetailsDto>(`${this.apiUrl}/purchase-invoices/${id}/`);
  }

  lockInvoice(id: number): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${this.apiUrl}/purchase-invoices/${id}/lock/`, {});
  }

  receiveInvoice(id: number, locationCode: string = 'WH/MAIN'): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${this.apiUrl}/purchase-invoices/${id}/receive/`, {
      location_code: locationCode,
    });
  }

  // InvoicesService или InventoryService
  getLocations(): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/locations/`);
  }
}
