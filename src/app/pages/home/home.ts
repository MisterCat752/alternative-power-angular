import { Component } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card';
import { NgFor } from '@angular/common';
import { Slider } from '../../shared/slider/slider';
import { Container } from '../../shared/container/container';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, Slider, Container],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  slides = [
    'https://picsum.photos/id/1018/1200/500',
    'https://picsum.photos/id/1015/1200/500',
    'https://picsum.photos/id/1019/1200/500',
  ];

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
    spaceBetween: 5,
    navigation: true,
    pagination: true,
    loop: true,
    className: 'block w-full',
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 5 },
    },
  };

  trackByStr = (s: string) => s;
  trackByTitle = (p: any) => p.title;

  products = [
    {
      title:
        'Invertor Deye Hibrid 6KW monofazat + Baterie LPF 5.12KWh + 10 Panouri LONGI 610W Hi-MO X6',
      imageUrl: 'https://picsum.photos/id/1019/1200/500',
      inStock: false,
      price: 5900,
    },
    {
      title: 'Invertor DEYE Hibrid 5KW...',
      imageUrl: 'https://picsum.photos/id/1019/1200/500',
      inStock: true,
      price: 5500,
    },
    {
      title: 'Baterie 16.07kWh V-TAC LiFePO₄...',
      imageUrl: 'https://picsum.photos/id/1019/1200/500',
      inStock: true,
      price: 3200,
    },
    {
      title: 'Baterie 16.07kWh V-TAC LiFePO₄...',
      imageUrl: 'https://picsum.photos/id/1019/1200/500',
      inStock: true,
      price: 3200,
    },
    {
      title: 'Bat3erie 16.07kWh V-TAC LiFePO₄...',
      imageUrl: 'https://picsum.photos/id/1019/1200/500',
      inStock: true,
      price: 3200,
    },
    {
      title: 'Bater4ie 16.07kWh V-TAC LiFePO₄...',
      imageUrl: 'https://picsum.photos/id/1019/1200/500',
      inStock: true,
      price: 3200,
    },
    {
      title: 'Bater5ie 16.07kWh V-TAC LiFePO₄...',
      imageUrl: 'https://picsum.photos/id/1019/1200/500',
      inStock: true,
      price: 3200,
    },
  ];

  add(p: any) {
    console.log('Add to cart:', p);
  }
}
