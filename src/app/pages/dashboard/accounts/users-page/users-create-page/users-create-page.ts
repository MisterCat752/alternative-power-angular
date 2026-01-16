import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';
import { UsersService } from '../../../../../core/services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../core/models/users/user.model';

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

type RoleControl = keyof typeof ROLE_CONTROL_TO_GROUP_MAP;

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, UiSelect],
  templateUrl: './users-create-page.html',
})
export class UserCreatePage implements OnInit {
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  @Input() status: string = '';
  mode: 'create' | 'edit' = 'create';
  userId?: string;

  /* =======================
     FORM
  ======================= */

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

  /* =======================
     INIT
  ======================= */

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.userId) {
      this.mode = 'edit';
      this.loadUser(this.userId);
    }
  }

  /* =======================
     LOAD USER (EDIT)
  ======================= */

  private loadUser(id: string) {
    this.usersService.getUserById(id).subscribe((user: User) => {
      this.form.patchValue({
        email: user.email,
        phone: user.phone,
        firstName: user.first_name,
        lastName: user.last_name,
        isActive: user.is_active,
      });

      // 🔹 роли
      const rolesForm = this.form.get('roles')!;
      user.groups.forEach((group) => {
        const controlKey = Object.entries(ROLE_CONTROL_TO_GROUP_MAP).find(
          ([, g]) => g === group
        )?.[0] as RoleControl | undefined;

        if (controlKey) {
          rolesForm.get(controlKey)?.setValue(true);
        }
      });

      // 🔹 пароль в edit не обязателен
      this.form.get('password')?.clearValidators();
      this.form.get('confirmPassword')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
      this.form.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  /* =======================
     SUBMIT
  ======================= */

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const rolesGroup = value.roles!;

    const groups = Object.entries(rolesGroup)
      .filter(([, checked]) => checked)
      .map(([key]) => ROLE_CONTROL_TO_GROUP_MAP[key as keyof typeof ROLE_CONTROL_TO_GROUP_MAP]);

    if (this.mode === 'create') {
      this.createUser(value, groups);
    } else {
      this.updateUser(value, groups);
    }
  }

  /* =======================
     CREATE
  ======================= */

  private createUser(value: any, groups: string[]) {
    this.usersService
      .createUser({
        email: value.email!,
        phone: value.phone || undefined,
        first_name: value.firstName!,
        last_name: value.lastName!,
        account_type: value.accountType === 'company' ? 'Company' : 'individual',
        company_name: value.accountType === 'company' ? value.companyName || undefined : undefined,
        password: value.password!,
        is_active: value.isActive!,
        groups,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard/accounts/users']);
        },
        error: (err) => {
          console.error('Create user failed', err);
        },
      });
  }

  /* =======================
     UPDATE (PATCH)
  ======================= */

  private updateUser(value: any, groups: string[]) {
    this.usersService
      .updateUser(this.userId!, {
        first_name: value.firstName!,
        last_name: value.lastName!,
        phone: value.phone || undefined,
        is_active: value.isActive!,
        groups_input: groups,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard/accounts/users']);
        },
        error: (err) => {
          console.error('Update user failed', err);
        },
      });
  }
}
