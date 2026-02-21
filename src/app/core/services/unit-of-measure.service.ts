import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UnitOfMeasure } from '../models/unit-of-measure.model';
import { UNITS_OF_MEASURE_MOCK } from '../mock/unit-of-measure.mock';

@Injectable({ providedIn: 'root' })
export class UnitOfMeasureService {
  private units: UnitOfMeasure[] = JSON.parse(localStorage.getItem('units') || 'null') ?? [
    ...UNITS_OF_MEASURE_MOCK,
  ];

  listUnits(): Observable<UnitOfMeasure[]> {
    return of(this.units);
  }

  getUnit(id: number): Observable<UnitOfMeasure | undefined> {
    return of(this.units.find((u) => u.id === id));
  }

  createUnit(unit: Omit<UnitOfMeasure, 'id'>): Observable<UnitOfMeasure> {
    const newUnit: UnitOfMeasure = {
      id: this.generateId(),
      ...unit,
    };

    this.units.push(newUnit);
    this.save();

    return of(newUnit);
  }

  updateUnit(id: number, unit: Omit<UnitOfMeasure, 'id'>): Observable<UnitOfMeasure | undefined> {
    const index = this.units.findIndex((u) => u.id === id);

    if (index === -1) return of(undefined);

    this.units[index] = { id, ...unit };
    this.save();

    return of(this.units[index]);
  }

  deleteUnit(id: number): Observable<boolean> {
    const index = this.units.findIndex((u) => u.id === id);

    if (index === -1) return of(false);

    this.units.splice(index, 1);
    this.save();

    return of(true);
  }

  private generateId(): number {
    if (!this.units.length) return 1;
    return Math.max(...this.units.map((u) => u.id)) + 1;
  }

  private save() {
    localStorage.setItem('units', JSON.stringify(this.units));
  }
}
