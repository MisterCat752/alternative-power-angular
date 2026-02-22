import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INVOICES_MOCK } from '../../mock/invoices.mock';
import { PurchaseInvoiceDetailsDto } from '../../models/invoice';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  private invoices = [...INVOICES_MOCK];

  getInvoices(
    status?: string,
    search?: string,
    page: number = 1,
    pageSize: number = 20,
  ): Observable<PaginatedResponse<PurchaseInvoiceDetailsDto>> {
    let data = [...this.invoices];

    if (status) {
      data = data.filter((i) => i.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      data = data.filter((i) => i.doc_number.toLowerCase().includes(q));
    }

    const start = (page - 1) * pageSize;
    const paginated = data.slice(start, start + pageSize);

    return of({
      count: data.length,
      next: null,
      previous: null,
      results: paginated,
    });
  }

  getInvoiceById(id: string | null): Observable<PurchaseInvoiceDetailsDto> {
    const invoice = INVOICES_MOCK.find((i) => i.id === Number(id));

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    return of(invoice);
  }

  lockInvoice(id: number) {
    const inv = this.invoices.find((i) => i.id === id);
    if (inv) inv.status = 'LOCKED';
    return of({ detail: 'Locked' });
  }

  unLockInvoice(id: number) {
    const inv = this.invoices.find((i) => i.id === id);
    if (inv) inv.status = 'DRAFT';
    return of({ detail: 'Unlocked' });
  }

  receiveInvoice(id: number, locationCode: string) {
    const inv = this.invoices.find((i) => i.id === id);

    if (inv) {
      inv.status = 'RECEIVED';
    }

    return of({ detail: `Received in ${locationCode}` });
  }
}
