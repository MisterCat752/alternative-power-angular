import { Component, inject, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InvoicesService } from '../../../../../core/services/inventory/invoices';

type InvoiceStatus = 'DRAFT' | 'RECEIVED' | 'LOCKED' | 'PENDING';

interface InvoiceLine {
  id: number;
  line_no: number;
  qty: string;
  unit_cost: string;
  line_sum: string;
  product: {
    id: number;
    code: string;
    name: string;
    uom: string;
  };
}

export interface InvoiceDetailsDto {
  id: number;
  doc_number: string;
  doc_date: string;
  currency: string;
  channel: string;
  doc_sum: string;
  status: string;
  vendor: {
    id: number;
    name: string;
    email: string;
    vat_id: string;
  };
  lines: InvoiceLine[];
}

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe],
  templateUrl: './invoice-details.html',
})
export class InvoiceDetails {
  private route = inject(ActivatedRoute);
  private invoicesService = inject(InvoicesService);

  invoice = signal<InvoiceDetailsDto | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.invoicesService.getInvoiceById(id).subscribe({
      next: (res) => {
        this.invoice.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Invoice not found');
        this.loading.set(false);
      },
    });
  }

  badgeClass(status: string) {
    switch (status) {
      case 'draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'received':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'locked':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  }
}
