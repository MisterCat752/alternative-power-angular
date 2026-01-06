import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Container } from '../../container/container';
interface Category {
  name: string;
  subcategories?: string[];
}
@Component({
  selector: 'app-top-bar',
  imports: [NgIf, NgFor, MatIconModule, Container],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  isOpen = false;

  categories: Category[] = [
    { name: 'Инверторы', subcategories: ['Инверторы Deye'] },
    { name: 'Солнечные Панели', subcategories: ['Солнечные Панели Longi'] },
    {
      name: 'Аккумуляторы',
      subcategories: ['Аккумуляторы Deye', 'Аккумуляторы Dyness', 'Аккумуляторы V-TAC'],
    },
    { name: 'Солнечный комплект', subcategories: ['Kituri fotovoltaice hibrid'] },
    { name: 'Аксессуары', subcategories: ['Кабели', 'Соединители'] },
    { name: 'Услуги' },
    { name: 'Подписки на обслуживание' },
    { name: 'Посмотреть все продукты' },
  ];

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
