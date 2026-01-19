import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WishlistService } from '../../../core/services/wishlist.service';
import { Product } from '../../../core/models/products/product.model';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wish-list-detail',
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './wish-list-detail.html',
  styleUrl: './wish-list-detail.css',
})
export class WishListDetail {
  private wishlistService = inject(WishlistService);

  wishlist = signal<Product[]>([]);

  constructor() {
    this.load();
  }

  load() {
    this.wishlistService.getWishlist().subscribe((w) => this.wishlist.set(w.items));
  }

  remove(product: Product) {
    this.wishlistService.remove(product.id);
    this.load();
  }

  clear() {
    this.wishlistService.clear();
    this.load();
  }
}
