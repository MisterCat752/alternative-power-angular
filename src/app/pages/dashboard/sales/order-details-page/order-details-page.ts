import { Component, computed, effect, inject, signal } from '@angular/core';
import { OrderDetails } from '../../../../core/models/orders/orders.model';
import { OrdersService } from '../../../../core/services/orders/order.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-details-page',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './order-details-page.html',
  styleUrl: './order-details-page.css',
})
export class OrderDetailsPage {
  private ordersService = inject(OrdersService);
  private route = inject(ActivatedRoute);
  // Сигнал для заказа
  order = signal<OrderDetails | null>(null);
  idFromUrl = signal<number | null>(null);

  // Computed, чтобы шаблон работал с локальной переменной
  o = computed(() => this.order());

  // Можно добавить вычисляемые свойства
  totalItems = computed(() => this.order()?.items.length ?? 0);
  totalAmount = computed(() => this.order()?.total ?? 0);
  constructor() {
    // Получаем id из URL
    // Лог для проверки загрузки
    console.log('ID from constructor:', this.idFromUrl);

    effect(() => {
      if (this.o()) console.log('Order loaded', this.o());
    });
  }

  ngOnInit() {
    this.idFromUrl.set(Number(this.route.snapshot.paramMap.get('id')));

    console.log('ID from ngOnInit:', this.idFromUrl);

    this.ordersService.getOrderDetails(1).subscribe((res) => {
      this.order.set(res);
    });
  }
}
