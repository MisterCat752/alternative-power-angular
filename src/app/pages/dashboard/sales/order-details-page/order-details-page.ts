import { Component, computed, effect, inject, signal } from '@angular/core';
import { OrderDetails } from '../../../../core/models/orders/orders.model';
import { OrdersService } from '../../../../core/services/orders/order.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-order-details-page',
  imports: [RouterLink, DecimalPipe],
  standalone: true,
  templateUrl: './order-details-page.html',
})
export class OrderDetailsPage {
  private ordersService = inject(OrdersService);
  private route = inject(ActivatedRoute);

  order = signal<OrderDetails | null>(null);
  selectedStatus = signal<OrderDetails['status'] | null>(null);

  o = computed(() => this.order());

  totalItems = computed(() => this.order()?.items.length ?? 0);
  totalAmount = computed(() => this.order()?.total ?? 0);

  statusOptions: OrderDetails['status'][] = [
    'draft',
    'pending',
    'processing',
    'completed',
    'cancelled',
  ];

  ngOnInit() {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));

    this.ordersService.getOrder(orderId).subscribe((res) => {
      this.order.set(res);
      this.selectedStatus.set(res.status);
    });
  }

  updateStatus() {
    if (!this.order() || !this.selectedStatus()) return;

    const id = this.order()!.id;
    const newStatus = this.selectedStatus()!;

    this.ordersService.changeStatus(id, newStatus).subscribe((updated) => {
      this.order.set({ ...updated });
    });
  }

  statusBadgeClass(status: OrderDetails['status']) {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-orange-100 text-orange-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
    }
  }
}
