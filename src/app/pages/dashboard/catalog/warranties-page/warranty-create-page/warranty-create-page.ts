import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../../../shared/form/number-input/number-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';

@Component({
  selector: 'app-warranty-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, NumberInput, UiSelect],
  templateUrl: './warranty-create-page.html',
})
export class WarrantyCreatePage {
  private fb = inject(FormBuilder);

  // 🔹 форма гарантии
  form = this.fb.group({
    name: ['', Validators.required],
    provider: [null, Validators.required],
    durationYears: [1, [Validators.required, Validators.min(0)]],
    serviceType: [null, Validators.required],
    termsUrl: [''],
    notes: [''],
  });

  // 🔹 селекты
  providerOptions = [
    { label: 'Seller', value: 'seller' },
    { label: 'Manufacturer', value: 'manufacturer' },
  ];

  serviceTypeOptions = [
    { label: 'On-site', value: 'on_site' },
    { label: 'Carry-in', value: 'carry_in' },
  ];

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('WARRANTY FORM:', this.form.value);
  }
}
