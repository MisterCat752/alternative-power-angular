import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_ORDER } from '../../mock/mock-order-data';
import { OrderDetails } from '../../models/orders/orders.model';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  getOrder(id: number): Observable<OrderDetails> {
    return of({ ...MOCK_ORDER, id }).pipe(delay(300)); // имитация задержки
  }

  saveOrder(order: OrderDetails): Observable<OrderDetails> {
    console.log('Saved order', order);
    return of({ ...order, id: order.id ?? Math.floor(Math.random() * 1000) }).pipe(delay(300));
  }
  getOrderDetails(id: number) {
    return of(MOCK_ORDER).pipe(delay(700));
  }
}
