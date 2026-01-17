// pages/dashboard/sales/offer-details/offer-details.page.ts
import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { OffersService } from '../../../../core/services/offers/offer.service';
import { OfferDetails } from '../../../../core/models/offers/offer.model';

@Component({
  selector: 'app-offer-details',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe],
  templateUrl: './offer-details-page.html',
})
export class OfferDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(OffersService);

  offer = signal<OfferDetails | null>(null);

  groupedItems = computed(() => {
    const o = this.offer();
    if (!o) return {};

    return o.items.reduce((acc: any, item) => {
      acc[item.group] = acc[item.group] || [];
      acc[item.group].push(item);
      return acc;
    }, {});
  });
  groupTotals = computed<Record<string, number>>(() => {
    const groups = this.groupedItems();
    const result: Record<string, number> = {};

    Object.keys(groups).forEach((k) => {
      result[k] = groups[k].reduce((s: any, i: any) => s + i.total, 0);
    });

    return result;
  });
  subtotal = computed(() => this.offer()?.items.reduce((s, i) => s + i.total, 0) || 0);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getOffer(id).subscribe((o) => this.offer.set(o || null));
  }
}
