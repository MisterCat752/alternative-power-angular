// core/services/unit-of-measure.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UnitOfMeasure } from '../models/unit-of-measure.model';
import { UNITS_OF_MEASURE_MOCK } from '../mock/unit-of-measure.mock';

@Injectable({ providedIn: 'root' })
export class UnitOfMeasureService {
  private units = [...UNITS_OF_MEASURE_MOCK];

  getUnit(id: number): Observable<UnitOfMeasure | undefined> {
    return of(this.units.find((u) => u.id === id));
  }

  createUnit(unit: Omit<UnitOfMeasure, 'id'>): Observable<UnitOfMeasure> {
    const newUnit: UnitOfMeasure = {
      id: Math.max(...this.units.map((u) => u.id)) + 1,
      ...unit,
    };
    this.units.push(newUnit);
    return of(newUnit);
  }

  updateUnit(id: number, unit: Omit<UnitOfMeasure, 'id'>): Observable<UnitOfMeasure | undefined> {
    const index = this.units.findIndex((u) => u.id === id);
    if (index === -1) return of(undefined);
    this.units[index] = { id, ...unit };
    return of(this.units[index]);
  }

  listUnits(): Observable<UnitOfMeasure[]> {
    return of(this.units);
  }
}
