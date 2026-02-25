import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MOCK_ORDERS } from '../../mock/mock-order-data';
import { OrderDetails } from '../../models/orders/orders.model';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private orders: OrderDetails[] = [...MOCK_ORDERS];

  // получить все заказы
  getOrders(): Observable<OrderDetails[]> {
    return of(this.orders).pipe(delay(500));
  }

  // получить только по статусу
  getOrdersByStatus(status: OrderDetails['status']): Observable<OrderDetails[]> {
    return this.getOrders().pipe(map((orders) => orders.filter((o) => o.status === status)));
  }

  // изменить статус заказа
  changeStatus(id: number, status: OrderDetails['status']): Observable<OrderDetails> {
    const order = this.orders.find((o) => o.id === id);

    if (!order) throw new Error('Order not found');

    order.status = status;

    return of(order).pipe(delay(300));
  }

  // получить один заказ
  getOrder(id: number): Observable<OrderDetails> {
    const order = this.orders.find((o) => o.id === id);

    if (!order) {
      throw new Error('Order not found');
    }

    return of(order).pipe(delay(300));
  }

  // создание заказа клиентом
  createOrder(order: Omit<OrderDetails, 'id'>): Observable<OrderDetails> {
    const newOrder: OrderDetails = {
      ...order,
      id: this.generateId(),
    };

    this.orders.unshift(newOrder);

    return of(newOrder).pipe(delay(500));
  }

  // обновление заказа
  updateOrder(order: OrderDetails): Observable<OrderDetails> {
    const index = this.orders.findIndex((o) => o.id === order.id);

    if (index === -1) {
      throw new Error('Order not found');
    }

    this.orders[index] = order;

    return of(order).pipe(delay(400));
  }

  // удаление
  deleteOrder(id: number): Observable<boolean> {
    this.orders = this.orders.filter((o) => o.id !== id);

    return of(true).pipe(delay(300));
  }

  // генерация id
  private generateId(): number {
    return Math.max(...this.orders.map((o) => o.id), 0) + 1;
  }
}
