import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Container } from '../../container/container';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private el: ElementRef,
  ) {}

  ngOnInit() {
    this.categoryService.list().subscribe((cats) => {
      this.categories = this.buildTree(cats);
    });

    // закрытие при переходе
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.isOpen = false;
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }

  // закрытие при клике вне меню
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  // закрытие по ESC
  @HostListener('document:keydown.escape')
  onEsc() {
    this.isOpen = false;
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
