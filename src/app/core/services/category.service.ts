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
    const maxId = this.categories.length ? Math.max(...this.categories.map((c) => c.id)) : 0;

    const newItem: Category = {
      id: maxId + 1,
      ...payload,
    };

    this.categories.push(newItem);

    return of(newItem);
  }

  update(id: number, payload: Omit<Category, 'id'>): Observable<Category | undefined> {
    const index = this.categories.findIndex((c) => c.id === id);

    if (index === -1) return of(undefined);

    this.categories[index] = { id, ...payload };

    return of(this.categories[index]);
  }

  delete(id: number): Observable<boolean> {
    const index = this.categories.findIndex((c) => c.id === id);

    if (index === -1) return of(false);

    this.categories.splice(index, 1);

    return of(true);
  }
}
