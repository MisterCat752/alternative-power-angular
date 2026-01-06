import { Component } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { Container } from '../../shared/container/container';
import { Slider } from '../../shared/slider/slider';

type Spec = { label: string; value: string };

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [Container, Slider, RouterLink, MatIconModule, NgIf, NgClass],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductPage {
  // mock (потом заменишь на API)
  product = {
    brand: 'Deye',
    title: 'Инвертор Deye Hybrid 20кВт SUN-20K-SG05LP3-EU-SM2',
    price: 3500,
    currency: '€',
    inStock: true,
    warranty: '10 ani',
    description: [
      '100% несбалансированный выход',
      'Возможность подключения по переменному току для модернизации существующей солнечной системы',
      'Максимум 10 параллельных модулей для работы как с сетью, так и без нее',
      'Поддержка параллельного подключения нескольких аккумуляторов',
    ],
    images: ['https://picsum.photos/id/1011/900/900', 'https://picsum.photos/id/1012/900/900'],
  };

  // состояние галереи
  activeIndex = 0;
  showFullDesc = false;
  activeTab: 'specs' | 'docs' = 'specs';

  // настройки слайдера миниатюр
  thumbsOpts = {
    slidesPerView: 1,
    spaceBetween: 12,
    navigation: true,
    pagination: false,
    loop: false,
    className: 'block w-[92px]',
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 2 },
    },
  };

  // мок характеристик/доков
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
