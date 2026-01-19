import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterGroup } from '../../shared/filters-panel/filters-panel';
import { CATEGORY_FILTERS_MOCK } from '../mock/filters.mock';

@Injectable({ providedIn: 'root' })
export class CategoryFilterService {
  getFilters(category: string): Observable<FilterGroup[]> {
    return of(CATEGORY_FILTERS_MOCK[category] ?? []);
  }
}
