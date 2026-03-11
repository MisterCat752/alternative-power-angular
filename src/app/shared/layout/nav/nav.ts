import { Component, inject, signal, computed } from '@angular/core';
import { Container } from '../../container/container';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartUiService } from '../../../core/services/cart-ui';
import { AuthStore } from '../../../core/services/auth.store';
import { ProductService } from '../../../core/services/products/product.service';
import { Product } from '../../../core/models/products/product.model';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink, MatIconModule, MatButtonModule, Container],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
})
export class Nav {
  cartUi = inject(CartUiService);
  authStore = inject(AuthStore);
  private router = inject(Router);
  private productService = inject(ProductService);

  search = '';
  results = signal<Product[]>([]);
  searchOpen = signal(false);
  dropdownOpen = signal(false);

  /* ===========================
     AUTH STATE
  =========================== */
  user = computed(() => this.authStore.user());
  isLoggedIn = computed(() => !!this.authStore.token() && !!this.authStore.user());
  avatarUrl = computed(() => this.authStore.avatarUrl());

  /* ===========================
     SEARCH
  =========================== */
  onSearchChange() {
    if (!this.search.trim()) {
      this.results.set([]);
      this.searchOpen.set(false);
      return;
    }

    this.productService.getProducts({ search: this.search }).subscribe((res) => {
      this.results.set(res.slice(0, 5));
      this.searchOpen.set(true);
    });
  }

  goToProduct(p: Product) {
    this.search = '';
    this.searchOpen.set(false);
    this.results.set([]);
    this.router.navigate(['/product', p.id]);
  }

  /* ===========================
     DROPDOWN
  =========================== */
  toggleDropdown() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }

  logout() {
    this.authStore.logout();
    this.dropdownOpen.set(false);
    this.router.navigate(['/']);
  }
}
