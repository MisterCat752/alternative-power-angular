import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ILocation, InventoryLocation } from '../../models/inventory-location.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryLocationsService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  /**
   * GET /api/inventory/locations/
   * Auth: JWT Bearer (через interceptor)
   */
  getLocations(): Observable<ILocation> {
    return this.http.get<ILocation>(`${this.baseUrl}/inventory/locations/`);
  }

  createLocation(body: { code: string; name: string; usage: string; parent: number | null }) {
    return this.http.post(`${this.baseUrl}/inventory/locations/`, body);
  }

  updateLocation(
    id: number,
    body: Partial<{
      code: string; // <-- добавляем сюда
      name: string;
      usage: string;
      parent: number | null;
    }>
  ) {
    return this.http.patch(`${this.baseUrl}/inventory/locations/${id}/`, body);
  }

  deleteLocation(id: number) {
    return this.http.delete(`${this.baseUrl}/inventory/locations/${id}/`);
  }
}
