import { Component, inject, signal, computed } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card';
import { Slider } from '../../shared/slider/slider';
import { Container } from '../../shared/container/container';
import { ProductService } from '../../core/services/products/product.service';
import { Product } from '../../core/models/products/product.model';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, Slider, Container, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  /** hero */

  heroOpts = {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: true,
    pagination: true,
    loop: true,
    autoplayDelay: 2500,
    autoplayDisableOnInteraction: false,
    className: 'block w-full mt-6',
  };

  productOpts = {
    slidesPerView: 1,
    spaceBetween: 8,
    navigation: true,
    pagination: true,
    loop: false,
    className: 'block w-full',
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 5 },
    },
  };
  allowedCategories = ['longi-panels', 'vtac-batteries', 'accessories-cables'];
  /** продукты */
  private products = signal<Product[]>([]);

  /** категории → по 5 товаров */
  categories = computed(() => {
    const map = new Map<string, Product[]>();

    this.products().forEach((p) => {
      // ❗ фильтр по нужным категориям
      if (!this.allowedCategories.includes(p.category)) {
        return;
      }

      if (!map.has(p.category)) {
        map.set(p.category, []);
      }

      if (map.get(p.category)!.length < 5) {
        map.get(p.category)!.push(p);
      }
    });

    return this.allowedCategories
      .filter((cat) => map.has(cat)) // порядок сохраняется
      .map((category) => ({
        category,
        items: map.get(category)!,
      }));
  });
  constructor() {
    this.productService.getProducts().subscribe((data) => {
      this.products.set(data.filter((p) => p.settings?.published));
    });
  }
  heroProducts = computed(() => {
    return this.products()
      .filter((p) => p.settings?.published)
      .slice(0, 3); // первые 3 товара
  });
  trackByCategory = (c: { category: string }) => c.category;
  productTrackBy = (p: Product) => p.id;
  trackByStr = (src: string) => src;

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }
}
