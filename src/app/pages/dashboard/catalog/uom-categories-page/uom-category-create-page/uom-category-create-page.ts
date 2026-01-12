import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';

@Component({
  selector: 'app-uom-category-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, UiSelect],
  templateUrl: './uom-category-create-page.html',
})
export class UomCategoryCreatePage {
  form!: FormGroup;
  // 🔹 селект базовой единицы
  baseUomOptions = [
    { label: 'meter (m)', value: 'meter' },
    { label: 'kilogram (kg)', value: 'kg' },
    { label: 'piece (pcs)', value: 'pcs' },
  ];

  // 🔹 форма
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      baseUom: [null, Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('UOM CATEGORY FORM:', this.form.value);
  }
}
