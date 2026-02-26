import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterGroup } from '../../shared/filters-panel/filters-panel';
import { CATEGORY_FILTERS_CRUD_MOCK, CATEGORY_FILTERS_MOCK } from '../mock/filters.mock';
import { CategoryFilter } from '../models/filter.model';

@Injectable({ providedIn: 'root' })
export class CategoryFilterService {
  private filters = [...CATEGORY_FILTERS_CRUD_MOCK];
  getFilters(category: string): Observable<FilterGroup[]> {
    const groups: FilterGroup[] = this.filters
      .filter((f) => f.category === category)
      .map(
        (f): FilterGroup => ({
          key: f.key,
          title: f.title,
          type: f.type,
          opened: true,
          options: f.options?.map((o) => ({ label: o.label, value: o.value })),
        }),
      );

    return of(groups);
  }
  list(): Observable<CategoryFilter[]> {
    return of(this.filters);
  }

  get(id: number): Observable<CategoryFilter | undefined> {
    return of(this.filters.find((f) => f.id === id));
  }

  create(data: Omit<CategoryFilter, 'id'>) {
    const newItem: CategoryFilter = {
      id: Date.now(),
      ...data,
    };

    this.filters.push(newItem);
    return of(newItem);
  }

  update(id: number, data: Omit<CategoryFilter, 'id'>) {
    const index = this.filters.findIndex((f) => f.id === id);
    if (index !== -1) {
      this.filters[index] = { id, ...data };
    }
    return of(this.filters[index]);
  }

  delete(id: number) {
    this.filters = this.filters.filter((f) => f.id !== id);
    return of(true);
  }
}
