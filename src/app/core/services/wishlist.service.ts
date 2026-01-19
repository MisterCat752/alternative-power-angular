import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/products/product.model';
import { Wishlist } from '../models/wishlist.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlist: Wishlist = {
    items: [],
  };

  private wishlist$ = new BehaviorSubject<Wishlist>(this.wishlist);

  getWishlist() {
    return this.wishlist$.asObservable();
  }

  private emit() {
    this.wishlist$.next({ ...this.wishlist });
  }

  toggle(product: Product) {
    const exists = this.wishlist.items.find((p) => p.id === product.id);

    if (exists) {
      this.wishlist.items = this.wishlist.items.filter((p) => p.id !== product.id);
    } else {
      this.wishlist.items.push(product);
    }

    this.emit();
  }

  remove(id: number) {
    this.wishlist.items = this.wishlist.items.filter((p) => p.id !== id);
    this.emit();
  }

  clear() {
    this.wishlist.items = [];
    this.emit();
  }

  isInWishlist(id: number): boolean {
    return this.wishlist.items.some((p) => p.id === id);
  }
}
