// src/app/core/services/integrations.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface SyncLog {
  id: number;
  sync_type: 'products' | 'invoices' | 'currencies' | 'other';
  status: 'started' | 'success' | 'failed';
  user: string;
  started_at: string;
  completed_at: string | null;
  records_processed: number;
  records_created: number;
  records_updated: number;
  records_failed: number;
  message: string;
  error_details: string;
}
export interface ISyncLogs {
  count: number;
  next: string | null;
  previous: string | null;
  results: SyncLog[];
}
export interface InvoiceSyncResult {
  vendors_created: number;
  vendors_updated: number;
  invoices_created: number;
  invoices_updated: number;
  lines_created: number;
  lines_updated: number;
  errors: string[];
}
@Injectable({
  providedIn: 'root',
})
export class IntegrationsService {
  private apiUrl = `${environment.baseUrl}/integrations/invoices`;

  constructor(private http: HttpClient) {}

  /** Получить список всех синхронизаций */
  getSyncLogs(): Observable<ISyncLogs> {
    return this.http.get<ISyncLogs>(`${this.apiUrl}/sync-logs/`);
  }

  /** 🔥 Запуск синхронизации инвойсов */
  syncInvoices(): Observable<InvoiceSyncResult> {
    return this.http.post<InvoiceSyncResult>(`${this.apiUrl}/sync/`, {});
  }
}
