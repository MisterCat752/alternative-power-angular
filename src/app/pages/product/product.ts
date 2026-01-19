import { Component, inject } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { Container } from '../../shared/container/container';
import { ProductService } from '../../core/services/products/product.service';
import { Product } from '../../core/models/products/product.model';

type Spec = { label: string; value: string };

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [Container, RouterLink, MatIconModule, NgClass],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductPage {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  product: Product | null = null;
  specGroups: any[] = [];

  ngOnInit() {
    // Подписка на параметр id из URL
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('slug');
      const productId = idParam ? parseInt(idParam, 10) : 1; // по умолчанию 1
      this.loadProduct(productId);
    });
  }

  private loadProduct(id: number) {
    this.productService.getProduct(id).subscribe((p) => {
      if (!p) return;

      this.product = p;
      this.specGroups = p.specifications ?? [];
    });
  }
  get images(): string[] {
    if (!this.product) return [];
    // Если есть массив изображений, возвращаем его
    if (Array.isArray(this.product.images) && this.product.images.length > 0) {
      return this.product.images;
    }
    // fallback на одиночное изображение, если есть только product.image
    if (typeof this.product.image === 'string') {
      return [this.product.image];
    }
    // иначе — заглушки
    return ['https://picsum.photos/id/1011/900/900', 'https://picsum.photos/id/1012/900/900'];
  }
  // UI
  activeIndex = 0;
  showFullDesc = false;
  activeTab: 'specs' | 'docs' | 'desc' = 'specs';

  specs: Spec[] = [
    { label: 'Мощность', value: '20 кВт' },
    { label: 'Фазы', value: '3' },
    { label: 'Тип', value: 'Hybrid' },
    { label: 'Напряжение', value: '230/400V' },
  ];

  docs = [
    { name: 'Datasheet.pdf', url: '#' },
    { name: 'Manual.pdf', url: '#' },
  ];

  trackByImg = (s: string) => s;

  setActive(i: number) {
    this.activeIndex = i;
  }

  toggleDesc() {
    this.showFullDesc = !this.showFullDesc;
  }

  addToCart() {
    console.log('add to cart', this.product);
  }
}
