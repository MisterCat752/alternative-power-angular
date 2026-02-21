// core/services/brand.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Brand } from '../models/brand.model';
import { BRANDS_MOCK } from '../mock/brand.mock';

@Injectable({ providedIn: 'root' })
export class BrandService {
  private brands = [...BRANDS_MOCK];

  list(): Observable<Brand[]> {
    return of(this.brands);
  }

  get(id: number): Observable<Brand | undefined> {
    return of(this.brands.find((b) => b.id === id));
  }

  create(payload: Omit<Brand, 'id'>): Observable<Brand> {
    const maxId = this.brands.length ? Math.max(...this.brands.map((b) => b.id)) : 0;

    const newBrand: Brand = {
      id: maxId + 1,
      ...payload,
    };

    this.brands.push(newBrand);

    return of(newBrand);
  }

  update(id: number, payload: Omit<Brand, 'id'>): Observable<Brand | undefined> {
    const index = this.brands.findIndex((b) => b.id === id);

    if (index === -1) return of(undefined);

    this.brands[index] = { id, ...payload };

    return of(this.brands[index]);
  }

  delete(id: number): Observable<boolean> {
    const index = this.brands.findIndex((b) => b.id === id);

    if (index === -1) return of(false);

    this.brands.splice(index, 1);

    return of(true);
  }
}
