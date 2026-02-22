import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INVOICES_MOCK } from '../../mock/invoices.mock';
import { PurchaseInvoiceDetailsDto } from '../../models/invoice';
import { StockMovesService } from '../stock/inventory-stock.service';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  private invoices = [...INVOICES_MOCK];
  constructor(private stockMoves: StockMovesService) {}
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

  receiveInvoice(id: number, locationCode: string): Observable<{ detail: string }> {
    const inv = this.invoices.find((i) => i.id === id);
    if (!inv) return of({ detail: 'Invoice not found' }); // никогда не возвращаем null

    inv.status = 'RECEIVED';
    console.log(inv, 'inv');
    // HEADER MOVE
    this.stockMoves.createMove({
      from: 'SUPPLIER',
      to: locationCode,
      state: 'posted',
      source: 'invoice',
      sourceId: inv.id,
      invoiceNumber: inv.doc_number,
    });

    // PRODUCT MOVES
    for (const line of inv.lines) {
      this.stockMoves.createMove({
        productId: line.product.id,
        productName: line.product.product_name,
        qty: line.qty,
        from: 'SUPPLIER',
        to: locationCode,
        state: 'posted',
        source: 'invoice',
        sourceId: inv.id,
        invoiceNumber: inv.doc_number,
      });
    }

    return of({ detail: `Received in ${locationCode}` });
  }
}
