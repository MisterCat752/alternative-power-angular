import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/products/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private carts: Cart[] = [
    {
      id: 80,
      customerEmail: 'gherasimovalexandru@hotmail.com',
      status: 'Active',
      items: [
        {
          id: 1,
          name: 'Product 1',
          sku: '921474',
          unitPrice: 26254.59,
          quantity: 1,
          total: 26254.59,
        },
        {
          id: 2,
          name: 'Product 2',
          sku: '942275',
          unitPrice: 2066.05,
          quantity: 1,
          total: 2066.05,
        },
      ],
      totalItems: 2,
      cartTotal: 28320.64,
      createdAt: '2026-01-07T01:57:00Z',
      updatedAt: '2026-01-07T01:57:00Z',
    },
  ];

  private carts$ = new BehaviorSubject<Cart[]>(this.carts);
  private cart: Cart = {
    id: 1,
    customerEmail: 'guest@shop.com',
    status: 'Active',
    items: [],
    totalItems: 0,
    cartTotal: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  private cart$ = new BehaviorSubject<Cart>(this.cart);

  getCart() {
    return this.cart$.asObservable();
  }

  private recalc() {
    this.cart.totalItems = this.cart.items.reduce((s, i) => s + i.quantity, 0);
    this.cart.cartTotal = this.cart.items.reduce((s, i) => s + i.total, 0);
    this.cart.updatedAt = new Date().toISOString();
    this.cart$.next({ ...this.cart });
  }

  addProduct(product: Product) {
    const existing = this.cart.items.find((i) => i.id === product.id);

    if (existing) {
      existing.quantity++;
      existing.total = existing.quantity * existing.unitPrice;
    } else {
      const item: CartItem = {
        id: product.id,
        name: product.title,
        sku: product.sku || '-',
        unitPrice: product.price,
        quantity: 1,
        total: product.price,
      };
      this.cart.items.push(item);
    }

    this.recalc();
  }

  removeItem(id: number) {
    this.cart.items = this.cart.items.filter((i) => i.id !== id);
    this.recalc();
  }

  changeQty(id: number, qty: number) {
    const item = this.cart.items.find((i) => i.id === id);
    if (!item) return;

    item.quantity = qty;
    item.total = qty * item.unitPrice;
    if (item.quantity <= 0) this.removeItem(id);

    this.recalc();
  }

  clear() {
    this.cart.items = [];
    this.recalc();
  }
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
