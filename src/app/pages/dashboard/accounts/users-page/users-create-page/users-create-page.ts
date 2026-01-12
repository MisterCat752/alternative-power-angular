import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, UiSelect],
  templateUrl: './users-create-page.html',
})
export class UserCreatePage {
  private fb = inject(FormBuilder);

  // 🔹 форма пользователя
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    firstName: [''],
    lastName: [''],

    accountType: ['individual', Validators.required],
    companyName: [''],

    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],

    isActive: [true],

    roles: this.fb.group({
      customer: [false],
      sales: [false],
      salesManager: [false],
      warehouseClerk: [false],
      warehouseManager: [false],
      productManager: [false],
      manager: [false],
      admin: [false],
      translator: [false],
    }),
  });

  // 🔹 селект Account type
  accountTypeOptions = [
    { label: 'Individual', value: 'individual' },
    { label: 'Company', value: 'company' },
  ];

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('USER FORM:', this.form.value);
  }
}
