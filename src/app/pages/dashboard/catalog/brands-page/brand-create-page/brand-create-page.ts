import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { ImageInput } from '../../../../../shared/form/image-input/image-input';

@Component({
  selector: 'app-brand-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, ImageInput],
  templateUrl: './brand-create-page.html',
})
export class BrandCreatePage {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    slug: [''],
    country: [''],
    website: [''],
    logo: [null],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('BRAND FORM:', this.form.value);
  }
}
