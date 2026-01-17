// core/services/uom-category.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UOM_CATEGORIES_MOCK } from '../../mock/uom-categories.mock';
import { UomCategory } from '../../models/uom-category/uom-category.model';

@Injectable({ providedIn: 'root' })
export class UomCategoryService {
  private categories = [...UOM_CATEGORIES_MOCK];

  getCategory(id: number): Observable<UomCategory | undefined> {
    return of(this.categories.find((c) => c.id === id));
  }

  createCategory(category: Omit<UomCategory, 'id'>): Observable<UomCategory> {
    const newCategory: UomCategory = {
      id: Math.max(...this.categories.map((c) => c.id)) + 1,
      ...category,
    };
    this.categories.push(newCategory);
    return of(newCategory);
  }

  updateCategory(
    id: number,
    category: Omit<UomCategory, 'id'>
  ): Observable<UomCategory | undefined> {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) return of(undefined);
    this.categories[index] = { id, ...category };
    return of(this.categories[index]);
  }

  listCategories(): Observable<UomCategory[]> {
    return of(this.categories);
  }
}
