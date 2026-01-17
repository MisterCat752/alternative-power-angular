// core/services/category.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { CATEGORIES_MOCK } from '../mock/category.mock';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categories = [...CATEGORIES_MOCK];

  list(): Observable<Category[]> {
    return of(this.categories);
  }

  get(id: number): Observable<Category | undefined> {
    return of(this.categories.find((c) => c.id === id));
  }

  create(payload: Omit<Category, 'id'>): Observable<Category> {
    const newItem: Category = {
      id: Math.max(...this.categories.map((c) => c.id)) + 1,
      ...payload,
    };
    this.categories.push(newItem);
    return of(newItem);
  }

  update(id: number, payload: Omit<Category, 'id'>): Observable<Category | undefined> {
    const i = this.categories.findIndex((c) => c.id === id);
    if (i === -1) return of(undefined);
    this.categories[i] = { id, ...payload };
    return of(this.categories[i]);
  }
}
