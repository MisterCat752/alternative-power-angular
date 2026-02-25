import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { OfferDetails } from '../../models/offers/offer.model';
import { OFFERS_MOCK } from '../../mock/offers.mock';

@Injectable({ providedIn: 'root' })
export class OffersService {
  private offers: OfferDetails[] = [...OFFERS_MOCK];

  /* =========================
     LIST
  ========================= */
  getOffers(): Observable<OfferDetails[]> {
    return of([...this.offers]).pipe(delay(400));
  }

  /* =========================
     DETAILS
  ========================= */
  getOffer(id: number): Observable<OfferDetails | undefined> {
    const offer = this.offers.find((o) => o.id === id);
    return of(offer ? { ...offer } : undefined).pipe(delay(300));
  }

  /* =========================
     CREATE
  ========================= */
  createOffer(payload: Partial<OfferDetails>): Observable<OfferDetails> {
    const newOffer: OfferDetails = {
      id: Date.now(),
      created_at: String(Date.now()),
      created_by: String(Date.now()),
      code: payload.code || this.generateCode(),
      version: payload.version || 'V1',
      project_name: payload.project_name || '',
      project_owner: payload.project_owner || '',
      status: 'DRAFT',
      valid_until: payload.valid_until || '',
      total: payload.total || 0,
      items: (payload.items || []).map((i: any) => ({
        ...i,
        total: i.qty * i.unit_price,
      })),
    };

    this.offers.unshift(newOffer);

    return of(newOffer).pipe(delay(400));
  }

  /* =========================
     UPDATE
  ========================= */
  updateOffer(id: number, payload: Partial<OfferDetails>): Observable<OfferDetails> {
    const index = this.offers.findIndex((o) => o.id === id);
    if (index === -1) throw new Error('Offer not found');

    const items = (payload.items || this.offers[index].items).map((i: any) => ({
      ...i,
      total: i.qty * i.unit_price,
    }));

    const total = items.reduce((s, i) => s + i.total, 0);

    const updated: OfferDetails = {
      ...this.offers[index],
      ...payload,
      items,
      total,
    };

    this.offers[index] = updated;

    return of(updated).pipe(delay(400));
  }

  /* =========================
     DELETE
  ========================= */
  deleteOffer(id: number): Observable<boolean> {
    this.offers = this.offers.filter((o) => o.id !== id);
    return of(true).pipe(delay(300));
  }

  /* =========================
     STATUS CHANGE
  ========================= */
  updateStatus(id: number, status: OfferDetails['status']) {
    const index = this.offers.findIndex((o) => o.id === id);
    if (index === -1) return of(false);

    this.offers[index].status = status;
    return of(true).pipe(delay(300));
  }

  /* =========================
     UTILS
  ========================= */
  private generateCode(): string {
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `OF-${new Date().getFullYear()}-${random}`;
  }
}
