// core/services/offers/offer.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OfferDetails } from '../../models/offers/offer.model';
import { OFFERS_MOCK } from '../../mock/offers.mock';

@Injectable({ providedIn: 'root' })
export class OffersService {
  private offers = [...OFFERS_MOCK];

  getOffer(id: number): Observable<OfferDetails | undefined> {
    return of(this.offers.find((o) => o.id === id));
  }

  createOffer(data: Partial<OfferDetails>): Observable<OfferDetails> {
    const id = Math.max(...this.offers.map((o) => o.id)) + 1;

    const code = this.generateCode();

    const items = (data.items || []).map((i: any) => ({
      ...i,
      total: i.qty * i.unit_price,
    }));

    const subtotal = items.reduce((s, i) => s + i.total, 0);

    const newOffer: OfferDetails = {
      id,
      code,
      version: data.version || 'v1',
      created_at: new Date().toISOString(),
      valid_until: data.valid_until || '',
      project_name: data.project_name || '',
      project_owner: data.project_owner || '',
      status: data.status || 'Draft',
      created_by: 'mock@system.local',
      items,
      subtotal,
      total: subtotal,
    };

    this.offers.unshift(newOffer);

    return of(newOffer);
  }

  updateOffer(id: number, data: Partial<OfferDetails>): Observable<OfferDetails> {
    const index = this.offers.findIndex((o) => o.id === id);
    if (index === -1) throw new Error('Offer not found');

    const items = (data.items || []).map((i: any) => ({
      ...i,
      total: i.qty * i.unit_price,
    }));

    const subtotal = items.reduce((s, i) => s + i.total, 0);

    const updated: OfferDetails = {
      ...this.offers[index],
      ...data,
      items,
      subtotal,
      total: subtotal,
    };

    this.offers[index] = updated;

    return of(updated);
  }

  private generateCode(): string {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);

    return `OF-${y}${m}${day}-${rand}`;
  }
}
