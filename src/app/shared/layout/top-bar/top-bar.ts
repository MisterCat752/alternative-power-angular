import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Container } from '../../container/container';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { RouterLink } from '@angular/router';

interface MenuCategory extends Category {
  children?: MenuCategory[];
}

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [Container, RouterLink, MatIconModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar implements OnInit {
  isOpen = false;
  categories: MenuCategory[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.list().subscribe((cats) => {
      this.categories = this.buildTree(cats);
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  private buildTree(categories: Category[]): MenuCategory[] {
    const map = new Map<number, MenuCategory>();
    const roots: MenuCategory[] = [];

    categories.forEach((c) => map.set(c.id, { ...c, children: [] }));

    map.forEach((cat) => {
      if (cat.parentCategory) {
        map.get(cat.parentCategory)?.children?.push(cat);
      } else {
        roots.push(cat);
      }
    });

    return roots.sort((a, b) => a.sortOrder - b.sortOrder);
  }
}
