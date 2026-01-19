import { Component, inject, signal } from '@angular/core';
import { Container } from '../../container/container';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CartUiService } from '../../../services/cart-ui';
import { AuthStore } from '../../../core/services/auth.store';
import { ProductService } from '../../../core/services/products/product.service';
import { Product } from '../../../core/models/products/product.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink, MatIconModule, MatButtonModule, Container],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  cartUi = inject(CartUiService);
  authStore = inject(AuthStore);
  private router = inject(Router);
  private productService = inject(ProductService);

  search = '';
  results = signal<Product[]>([]);
  searchOpen = signal(false);
  // состояние дропдауна
  dropdownOpen = signal(false);
  get user() {
    return this.authStore.user();
  }

  get avatarUrl() {
    return this.authStore.avatarUrl();
  }
  onSearchChange() {
    if (!this.search.trim()) {
      this.results.set([]);
      this.searchOpen.set(false);
      return;
    }

    this.productService.getProducts({ search: this.search }).subscribe((res) => {
      this.results.set(res.slice(0, 5)); // топ 5
      this.searchOpen.set(true);
    });
  }

  goToProduct(p: Product) {
    this.search = '';
    this.searchOpen.set(false);
    this.results.set([]);
    this.router.navigate(['/product', p.id]);
  }
  logout() {
    this.authStore.logout();
  }

  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }
}
