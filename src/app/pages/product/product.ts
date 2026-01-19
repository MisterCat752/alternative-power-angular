import { Component, inject } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { Container } from '../../shared/container/container';
import { Slider } from '../../shared/slider/slider';
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
  // mock (потом заменишь на API)
  private productService = inject(ProductService);

  product: any = null;
  specGroups: any[] = [];
  ngOnInit() {
    this.productService.getProduct(1).subscribe((p) => {
      if (!p) return;

      this.product = {
        brand: p.brand,
        title: p.title,
        price: p.pricing.salePrice ?? p.price,
        currency: p.pricing.currency === 'EUR' ? '€' : p.pricing.currency,
        inStock: p.quantity > 0,
        warranty: p.settings.warranty ?? '-',
        description: p.description,
        specifications: p.specifications ?? [],
        images: ['https://picsum.photos/id/1011/900/900', 'https://picsum.photos/id/1012/900/900'],
      };
      this.specGroups = this.product.specifications;
    });
  }

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
