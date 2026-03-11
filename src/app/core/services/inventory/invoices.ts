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
    if (inv) {
      inv.status = 'LOCKED';
      this.stockMoves.getMovesByInvoice(id).subscribe((moves) => {
        moves.forEach((m) => (m.active = false));
      });
    }
    return of({ detail: 'Locked' });
  }

  unLockInvoice(id: number) {
    const inv = this.invoices.find((i) => i.id === id);
    if (inv) {
      inv.status = 'DRAFT';
      this.stockMoves.getMovesByInvoice(id).subscribe((moves) => {
        moves.forEach((m) => (m.active = false));
      });
    }
    return of({ detail: 'Unlocked' });
  }

  receiveInvoices(ids: number[], locationCode: string) {
    for (const id of ids) {
      const inv = this.invoices.find((i) => i.id === id);
      if (!inv) continue;

      // Если инвойс уже был received в другом месте — деактивируем старые движения
      if (inv.status === 'RECEIVED' && inv.source && inv.source !== locationCode) {
        this.stockMoves
          .getMovesByInvoice(inv.id)
          .subscribe((moves) => moves.forEach((m) => (m.active = false)));
      }

      inv.status = 'RECEIVED';
      inv.source = locationCode;

      // HEADER MOVE
      this.stockMoves.createMove({
        from: 'SUPPLIER',
        to: locationCode,
        state: 'posted',
        source: 'invoice',
        sourceId: inv.id,
        invoiceNumber: inv.doc_number,
        active: true,
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
          active: true,
        });
      }
    }

    return of({ detail: `Received ${ids.length} invoice(s) in ${locationCode}` });
  }
}
