import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../../core/services/cart.service';
import { Cart, CartItem } from '../../../core/models/cart.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './cart-detail.html',
})
export class CartPage {
  private cartService = inject(CartService);

  cart = signal<Cart | null>(null);

  constructor() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCarts().subscribe((carts) => {
      if (carts.length > 0) this.cart.set(carts[0]);
    });
  }

  updateQuantity(item: CartItem, delta: number) {
    if (!this.cart()) return;

    const updatedItems = this.cart()!.items.map((i) => {
      if (i.id === item.id) {
        const newQty = i.quantity + delta;
        return {
          ...i,
          quantity: newQty > 0 ? newQty : 1,
          total: i.unitPrice * (newQty > 0 ? newQty : 1),
        };
      }
      return i;
    });

    const updatedCart = {
      ...this.cart()!,
      items: updatedItems,
      totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      cartTotal: updatedItems.reduce((sum, i) => sum + i.total, 0),
    };

    this.cartService.updateCart(updatedCart);
    this.cart.set(updatedCart);
  }

  removeItem(item: CartItem) {
    if (!this.cart()) return;

    const updatedItems = this.cart()!.items.filter((i) => i.id !== item.id);

    const updatedCart = {
      ...this.cart()!,
      items: updatedItems,
      totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      cartTotal: updatedItems.reduce((sum, i) => sum + i.total, 0),
    };

    this.cartService.updateCart(updatedCart);
    this.cart.set(updatedCart);
  }
}
