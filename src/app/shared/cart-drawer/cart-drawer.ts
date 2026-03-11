import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartUiService } from '../../core/services/cart-ui';
import { CartService } from '../../core/services/cart.service';
import { signal } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './cart-drawer.html',
})
export class CartDrawerComponent {
  cartUi = inject(CartUiService);

  // mock item (потом заменишь на реальную корзину)
  item = {
    title: 'Acumulator Fotovoltaice LiFePo4, 16.07kWh, VT-16076B, V-TAC',
    sku: '12335',
    price: 10199.0,
    currency: 'lei',
    qty: 1,
    inStockText: 'În stoc furnizor',
    img: 'https://picsum.photos/id/1019/120/120',
  };
  cartService = inject(CartService);
  cart = signal<any>(null);

  constructor() {
    this.cartService.getCart().subscribe((c) => {
      console.log('Cart items:', c.items);
      this.cart.set(c);
    });
  }

  remove(id: number) {
    this.cartService.removeItem(id);
  }

  inc(id: number, q: number) {
    this.cartService.changeQty(id, q + 1);
  }

  dec(id: number, q: number) {
    this.cartService.changeQty(id, q - 1);
  }
  close() {
    this.cartUi.close();
  }

  subtotal() {
    return this.item.qty * this.item.price;
  }
}
