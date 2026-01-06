import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartUiService } from '../../services/cart-ui';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [NgIf, MatIconModule],
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

  close() {
    this.cartUi.close();
  }

  subtotal() {
    return this.item.qty * this.item.price;
  }
}
