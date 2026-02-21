// core/services/warranty.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Warranty } from '../models/warranty.model';
import { WARRANTIES_MOCK } from '../mock/warranties.mock';

@Injectable({ providedIn: 'root' })
export class WarrantyService {
  private warranties = [...WARRANTIES_MOCK];

  getWarranty(id: number): Observable<Warranty | undefined> {
    return of(this.warranties.find((w) => w.id === id));
  }

  createWarranty(warranty: Omit<Warranty, 'id'>): Observable<Warranty> {
    const newWarranty: Warranty = {
      id: Math.max(...this.warranties.map((w) => w.id)) + 1,
      ...warranty,
    };
    this.warranties.push(newWarranty);
    return of(newWarranty);
  }

  updateWarranty(id: number, warranty: Omit<Warranty, 'id'>): Observable<Warranty | undefined> {
    const index = this.warranties.findIndex((w) => w.id === id);
    if (index === -1) return of(undefined);
    this.warranties[index] = { id, ...warranty };
    return of(this.warranties[index]);
  }

  listWarranties(): Observable<Warranty[]> {
    return of(this.warranties);
  }
  deleteWarranty(id: number): Observable<boolean> {
    const index = this.warranties.findIndex((w) => w.id === id);

    if (index === -1) return of(false);

    this.warranties.splice(index, 1);

    return of(true);
  }
}
