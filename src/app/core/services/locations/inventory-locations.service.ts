import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOCATIONS_MOCK } from '../../mock/locations.mock';
import { ILocation, InventoryLocation } from '../../models/inventory-location.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryLocationsService {
  private locations = [...LOCATIONS_MOCK];

  getLocations(): Observable<ILocation> {
    return of({
      count: this.locations.length,
      next: null,
      previous: null,
      results: this.locations,
    });
  }

  createLocation(body: { code: string; name: string; usage: string; parent: number | null }) {
    const newLoc: InventoryLocation = {
      id: Date.now(),
      code: body.code,
      name: body.name,
      usage: body.usage,
      parent: body.parent,
      is_active: true,
      products: 0,
    };

    this.locations.push(newLoc);

    return of(newLoc);
  }

  updateLocation(id: number, body: Partial<InventoryLocation>) {
    const index = this.locations.findIndex((l) => l.id === id);

    if (index !== -1) {
      this.locations[index] = { ...this.locations[index], ...body };
    }

    return of(this.locations[index]);
  }

  deleteLocation(id: number) {
    this.locations = this.locations.filter((l) => l.id !== id);

    return of({ success: true });
  }
}
