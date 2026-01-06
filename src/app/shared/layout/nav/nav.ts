import { Component, inject } from '@angular/core';
import { Container } from '../../container/container';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartUiService } from '../../../services/cart-ui';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule, Container],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  cartUi = inject(CartUiService);
}
