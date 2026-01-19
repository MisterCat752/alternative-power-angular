import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgIf, MatIconModule, RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) imageUrl!: string;

  // Статус наличия
  @Input() inStock = true;
  @Input() inStockText = 'În stoc';
  @Input() outOfStockText = 'Nu este în stoc';
  @Input() productId!: number;

  // Цена
  @Input({ required: true }) price!: number;
  @Input() currency = '€';

  // Для события “в корзину” (чтобы родитель поймал)
  @Output() addToCart = new EventEmitter<void>();

  onAddToCart() {
    this.addToCart.emit();
  }
}
