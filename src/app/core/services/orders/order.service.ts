import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_ORDER } from '../../mock/mock-order-data';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  getOrderDetails(id: number) {
    return of(MOCK_ORDER).pipe(delay(700));
  }
}
