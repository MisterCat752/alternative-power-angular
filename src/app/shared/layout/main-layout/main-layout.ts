import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from '../nav/nav';
import { TopBar } from '../top-bar/top-bar';
import { CartDrawerComponent } from '../../cart-drawer/cart-drawer';

@Component({
  selector: 'app-main-layout',
  imports: [Nav, TopBar, RouterOutlet, CartDrawerComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
