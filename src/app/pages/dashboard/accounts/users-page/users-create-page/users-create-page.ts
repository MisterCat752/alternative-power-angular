import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';
import { UsersService } from '../../../../../core/services/users/users.service';

/* =======================
   ROLE MAP
======================= */

const ROLE_CONTROL_TO_GROUP_MAP = {
  customer: 'Customer',
  sales: 'Sales',
  salesManager: 'Sales Manager',
  warehouseClerk: 'Warehouse Clerk',
  warehouseManager: 'Warehouse Manager',
  productManager: 'Product Manager',
  manager: 'Manager',
  admin: 'Admin',
  translator: 'Translator',
} as const;

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, UiSelect],
  templateUrl: './users-create-page.html',
})
export class UserCreatePage {
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],

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

  accountTypeOptions = [
    { label: 'Individual', value: 'individual' },
    { label: 'Company', value: 'company' },
  ];

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const rolesGroup = value.roles!;

    // 🔹 собираем группы
    const groups = Object.entries(rolesGroup)
      .filter(([, checked]) => checked)
      .map(([key]) => ROLE_CONTROL_TO_GROUP_MAP[key as keyof typeof ROLE_CONTROL_TO_GROUP_MAP]);

    const payload = {
      email: value.email!,
      phone: value.phone || undefined,
      first_name: value.firstName!,
      last_name: value.lastName!,
      account_type: value.accountType === 'company' ? 'Company' : 'individual',
      company_name: value.accountType === 'company' ? value.companyName || undefined : undefined,
      password: value.password!,
      is_active: value.isActive!,
      groups,
    };

    this.usersService.createUser(payload).subscribe({
      next: () => {
        console.log('User created');
        this.form.reset({ isActive: true, accountType: 'individual' });
      },
      error: (err) => {
        console.error('Create user failed', err);
      },
    });
  }
}
