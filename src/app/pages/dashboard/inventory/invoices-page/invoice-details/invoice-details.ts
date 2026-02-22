import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InvoicesService } from '../../../../../core/services/inventory/invoices';
import { PurchaseInvoiceDetailsDto, InvoiceStatus } from '../../../../../core/models/invoice';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe, MatIconModule],
  templateUrl: './invoice-details.html',
})
export class InvoiceDetails {
  private route = inject(ActivatedRoute);
  private invoicesService = inject(InvoicesService);

  invoice = signal<PurchaseInvoiceDetailsDto | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  lineItemsCount = computed(() => this.invoice()?.lines?.length ?? 0);

  total = computed(() => this.invoice()?.lines?.reduce((sum, l) => sum + l.line_sum, 0) ?? 0);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

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

  badgeClass(status: InvoiceStatus) {
    switch (status) {
      case 'DRAFT':
        return 'bg-slate-100 text-slate-700 border-slate-200';

      case 'RECEIVED':
        return 'bg-green-100 text-green-700 border-green-200';

      case 'LOCKED':
        return 'bg-purple-100 text-purple-700 border-purple-200';

      case 'PENDING':
        return 'bg-orange-100 text-orange-700 border-orange-200';

      default:
        return '';
    }
  }
}
