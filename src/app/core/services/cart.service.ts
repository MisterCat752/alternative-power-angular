import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private carts: Cart[] = [
    {
      id: 80,
      customerEmail: 'gherasimovalexandru@hotmail.com',
      status: 'Active',
      items: [
        { name: 'Product 1', sku: '921474', unitPrice: 26254.59, quantity: 1, total: 26254.59 },
        { name: 'Product 2', sku: '942275', unitPrice: 2066.05, quantity: 1, total: 2066.05 },
      ],
      totalItems: 2,
      cartTotal: 28320.64,
      createdAt: '2026-01-07T01:57:00Z',
      updatedAt: '2026-01-07T01:57:00Z',
    },
  ];

  private carts$ = new BehaviorSubject<Cart[]>(this.carts);

  getCarts(): Observable<Cart[]> {
    return this.carts$.asObservable();
  }

  getCartById(id: number): Cart | undefined {
    return this.carts.find((c) => c.id === id);
  }

  updateCart(updatedCart: Cart) {
    const index = this.carts.findIndex((c) => c.id === updatedCart.id);
    if (index !== -1) {
      this.carts[index] = { ...updatedCart };
      this.carts$.next(this.carts);
    } else {
      this.carts.push(updatedCart);
      this.carts$.next(this.carts);
    }
  }
}
