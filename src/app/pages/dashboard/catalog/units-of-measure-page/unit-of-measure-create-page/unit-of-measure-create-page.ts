import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../../../shared/form/number-input/number-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';

@Component({
  selector: 'app-unit-of-measure-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, NumberInput, UiSelect],
  templateUrl: './unit-of-measure-create-page.html',
})
export class UnitOfMeasureCreatePage {
  private fb = inject(FormBuilder);

  // 🔹 форма
  form = this.fb.group({
    category: [null, Validators.required],
    unitName: ['', Validators.required],
    symbol: ['', Validators.required],
    ratioToBase: [1, [Validators.required, Validators.min(0.000001)]],

    continuousUnit: [false],
    packagingUnit: [false],
  });

  // 🔹 селект категории (пока мок)
  categoryOptions = [
    { label: 'Length', value: 'length' },
    { label: 'Weight', value: 'weight' },
    { label: 'Quantity', value: 'quantity' },
  ];

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('UNIT OF MEASURE FORM:', this.form.value);
  }
}
