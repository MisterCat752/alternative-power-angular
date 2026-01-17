import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TextInput } from '../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../shared/form/number-input/number-input';
import { FormField } from '../../../shared/form/form-field/form-field';

import { OffersService } from '../../../core/services/offers/offer.service';
import { OfferDetails } from '../../../core/models/offers/offer.model';

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
      status: ['Draft'],
      valid_until: [''],
      items: this.fb.array([]),
    });

    if (this.isEdit()) {
      this.service.getOffer(this.offerId()!).subscribe((o) => o && this.load(o));
    } else {
      this.addItem();
    }
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  public removeItem = (i: number) => {
    this.items.removeAt(i);
  };

  public addItem = (item?: any) => {
    this.items.push(
      this.fb.group({
        group: [item?.group || 'Main Equipment'],
        name: [item?.name || ''],
        sku: [item?.sku || ''],
        qty: [item?.qty || 1],
        unit_price: [item?.unit_price || 0],
        total: [item?.total || 0],
      })
    );
  };

  public isEdit = computed(() => this.offerId() !== null);

  load(o: OfferDetails) {
    this.form.patchValue(o);
    this.items.clear();
    o.items.forEach((i) => this.addItem(i));
  }

  submit() {
    const payload = this.form.value;

    if (this.isEdit()) {
      this.service
        .updateOffer(this.offerId()!, payload)
        .subscribe(() => this.router.navigate(['/dashboard/offers']));
    } else {
      this.service
        .createOffer(payload)
        .subscribe(() => this.router.navigate(['/dashboard/offers']));
    }
  }
}
