import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TextInput } from '../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../shared/form/number-input/number-input';
import { FormField } from '../../../shared/form/form-field/form-field';

import { OffersService } from '../../../core/services/offers/offer.service';
import { OfferDetails, OfferItem } from '../../../core/models/offers/offer.model';

@Component({
  selector: 'app-offer-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TextInput, NumberInput, FormField],
  templateUrl: './offer-form.html',
})
export class OfferForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(OffersService);

  offerId = signal<number | null>(null);
  form!: FormGroup;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.offerId.set(id ? Number(id) : null);

    this.form = this.fb.group({
      code: [''],
      version: ['v1'],
      project_name: [''],
      project_owner: [''],
      status: ['DRAFT'],
      valid_until: [''],
      items: this.fb.array([]),
    });

    if (this.isEdit()) {
      this.service.getOffer(this.offerId()!).subscribe((o) => o && this.load(o));
    } else {
      this.addItem(); // добавить пустой блок для нового оффера
    }
  }

  /** Проверка редактирования */
  public isEdit = computed(() => this.offerId() !== null);

  /** Доступ к FormArray items */
  get items() {
    return this.form.get('items') as FormArray;
  }

  /** Добавление нового item (с поддержкой заполнения) */
  public addItem(item?: Partial<OfferItem>) {
    this.items.push(
      this.fb.group({
        group: [item?.group || 'Main Equipment'],
        name: [item?.name || ''],
        sku: [item?.sku || ''],
        qty: [item?.qty || 1],
        unit_price: [item?.unit_price || 0],
        total: [item?.total || 0],
      }),
    );
  }

  /** Удаление item по индексу */
  public removeItem(index: number) {
    this.items.removeAt(index);
  }

  /** Загрузка данных оффера в форму */
  load(o: OfferDetails) {
    this.form.patchValue({
      code: o.code,
      version: o.version,
      project_name: o.project_name,
      project_owner: o.project_owner,
      status: o.status.toUpperCase(),
      valid_until: new Date(o.valid_until).toISOString().substring(0, 10),
    });

    this.items.clear();
    o.items.forEach((i) => this.addItem(i));
  }

  /** Отправка формы */
  submit() {
    const payload: Partial<OfferDetails> = {
      ...this.form.value,
      items: this.form.value.items.map((i: any) => ({
        ...i,
        total: i.qty * i.unit_price,
      })),
      total: this.form.value.items.reduce((sum: number, i: any) => sum + i.qty * i.unit_price, 0),
    };

    if (this.isEdit()) {
      this.service.updateOffer(this.offerId()!, payload).subscribe(() => {
        this.router.navigate(['/dashboard/offers']);
      });
    } else {
      this.service.createOffer(payload).subscribe(() => {
        this.router.navigate(['/dashboard/offers']);
      });
    }
  }
}
