import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActionMenu } from '../../../../shared/ui/action-menu/action-menu';
import { OffersService } from '../../../../core/services/offers/offer.service';
import { OfferDetails } from '../../../../core/models/offers/offer.model';

type OfferStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
type Tab = 'ALL' | 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

type OfferRow = {
  id: number;
  number: string;
  project: string;
  version: string;
  totalAmount: number;
  currency: string;
  validUntil: string;
  createdBy: string;
  status: OfferStatus;
};

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [RouterLink, ActionMenu],
  templateUrl: './offers-page.html',
})
export class OffersPage implements OnInit {
  tab = signal<Tab>('ALL');
  q = signal('');
  rows = signal<OfferDetails[]>([]);

  private service = inject(OffersService);
  constructor(private router: Router) {}

  ngOnInit() {
    this.loadOffers();
  }

  /** Загрузка всех офферов */
  loadOffers() {
    this.service.getOffers().subscribe((data) => {
      this.rows.set(data);
    });
  }

  /** Табличное отображение (mapped для UI) */
  view = computed<OfferRow[]>(() => {
    const q = this.q().trim().toLowerCase();
    return this.rows()
      .filter((r) => {
        const byTab = this.tab() === 'ALL' ? true : r.status.toUpperCase() === this.tab();
        const byQ = !q || r.code.toLowerCase().includes(q);
        return byTab && byQ;
      })
      .map((o) => ({
        id: o.id,
        number: o.code,
        project: o.project_name,
        version: o.version,
        totalAmount: o.total,
        currency: 'MDL',
        validUntil: new Date(o.valid_until).toLocaleDateString('ru-RU'),
        createdBy: o.created_by?.[0]?.toUpperCase() ?? '—',
        status: o.status.toUpperCase() as OfferStatus,
      }));
  });

  /** Цветовые бейджи статусов */
  statusBadge(s: OfferStatus) {
    if (s === 'ACCEPTED') return 'bg-green-100 text-green-700 border-green-200';
    if (s === 'REJECTED' || s === 'EXPIRED') return 'bg-red-100 text-red-700 border-red-200';
    if (s === 'SENT') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  }

  /** Форматирование суммы */
  fmt(n: number) {
    return n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  /** Обработка действий (view/edit/delete) */
  handleAction(row: OfferRow, action: string) {
    // Найти оригинальный OfferDetails по id
    const offer = this.rows().find((o) => o.id === row.id);
    if (!offer) return;

    switch (action) {
      case 'edit':
        this.router.navigate(['/dashboard/offers/edit', offer.id]);
        break;

      case 'delete':
        if (confirm('Delete this offer?')) {
          this.service.deleteOffer(offer.id).subscribe(() => {
            this.rows.update((r) => r.filter((x) => x.id !== offer.id));
          });
        }
        break;

      case 'view':
        this.router.navigate(['/dashboard/offers/detail', offer.id]);
        break;
    }
  }
}
