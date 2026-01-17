import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../../../shared/form/number-input/number-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';
import { Warranty } from '../../../../../core/models/warranty.model';
import { WarrantyService } from '../../../../../core/services/warranty.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-warranty-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, NumberInput, UiSelect],
  templateUrl: './warranty-create-page.html',
})
export class WarrantyForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(WarrantyService);

  form!: FormGroup;
  warrantyId = signal<number | null>(null);
  isEdit = computed(() => this.warrantyId() !== null);

  providerOptions = [
    { label: 'Seller', value: 'seller' },
    { label: 'Manufacturer', value: 'manufacturer' },
  ];

  serviceTypeOptions = [
    { label: 'On-site', value: 'on_site' },
    { label: 'Carry-in', value: 'carry_in' },
  ];

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.warrantyId.set(idParam ? Number(idParam) : null);

    this.form = this.fb.group({
      name: ['', Validators.required],
      provider: [null, Validators.required],
      durationYears: [1, [Validators.required, Validators.min(0)]],
      serviceType: [null, Validators.required],
      termsUrl: [''],
      notes: [''],
    });

    if (this.isEdit()) {
      this.service.getWarranty(this.warrantyId()!).subscribe((w) => w && this.load(w));
    }
  }

  load(w: Warranty) {
    this.form.patchValue(w);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Omit<Warranty, 'id'> = this.form.value;

    console.log('Submitting Warranty:', payload, 'Edit mode:', this.isEdit());

    if (this.isEdit()) {
      this.service.updateWarranty(this.warrantyId()!, payload).subscribe((res) => {
        console.log('Warranty updated:', res);
        this.router.navigate(['/dashboard/catalog/warranties']);
      });
    } else {
      this.service.createWarranty(payload).subscribe((res) => {
        console.log('Warranty created:', res);
        this.router.navigate(['/dashboard/catalog/warranties']);
      });
    }
  }
}
