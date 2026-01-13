import { Component, inject, signal } from '@angular/core';
import { Container } from '../../container/container';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartUiService } from '../../../services/cart-ui';
import { AuthStore } from '../../../core/services/auth.store';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule, Container],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  cartUi = inject(CartUiService);
  authStore = inject(AuthStore);

  // состояние дропдауна
  dropdownOpen = signal(false);
  get user() {
    return this.authStore.user();
  }

  get avatarUrl() {
    return this.authStore.avatarUrl();
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
