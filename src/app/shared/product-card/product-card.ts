import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/models/products/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgIf, MatIconModule, RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) imageUrl!: string;
  private wishlistService = inject(WishlistService);
  private snackBar = inject(MatSnackBar);
  wishlist = toSignal(this.wishlistService.getWishlist(), { initialValue: { items: [] } });
  // Статус наличия
  @Input() inStock = true;
  @Input() product!: Product;
  @Input() inStockText = 'În stoc';
  @Input() outOfStockText = 'Nu este în stoc';
  @Input() productId!: number;

  // Цена wishlist()?.items.some(i => i.id === product.id))
  @Input({ required: true }) price!: number;
  @Input() currency = '€';

  // Для события “в корзину” (чтобы родитель поймал)
  @Output() addToCart = new EventEmitter<void>();
  isInWishlist(productId: number): boolean {
    return this.wishlist().items.some((p) => p.id === productId);
  }
  onAddToCart() {
    this.addToCart.emit();
    this.snackBar
      .open('Товар добавлен в корзину', ' ', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar'],
      })
      .onAction()
      .subscribe(() => {
        // например открыть корзину
        // this.cartUi.open();
      });
  }
  onToggleWithList() {
    this.wishlistService.toggle(this.product);
  }
}
