import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../../../shared/form/number-input/number-input';
import { ImageInput } from '../../../../../shared/form/image-input/image-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';

@Component({
  selector: 'app-category-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, NumberInput, ImageInput, UiSelect],
  templateUrl: './category-create-page.html',
})
export class CategoryCreatePage {
  private fb = inject(FormBuilder);

  // 🔹 форма категории
  form = this.fb.group({
    name: ['', Validators.required],
    slug: [''],
    parentCategory: [null], // optional
    sortOrder: [0],
    showInMenu: [true],
    isActive: [true],
    image: [null],
  });

  // 🔹 мок родительских категорий
  parentCategoryOptions = [
    { label: '— No parent —', value: null },
    { label: 'Solar Panels', value: 1 },
    { label: 'Inverters', value: 2 },
    { label: 'Batteries', value: 3 },
  ];

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('CATEGORY FORM:', this.form.value);
  }
}
