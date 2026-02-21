// pages/dashboard/catalog/category-form/category-form.page.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../../../shared/form/number-input/number-input';
import { ImageInput } from '../../../../../shared/form/image-input/image-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';

import { CategoryService } from '../../../../../core/services/category.service';
import { Category } from '../../../../../core/models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormField,
    TextInput,
    NumberInput,
    ImageInput,
    UiSelect,
  ],
  templateUrl: './category-create-page.html',
})
export class CategoryFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(CategoryService);

  categoryId = signal<number | null>(null);
  isEdit = computed(() => this.categoryId() !== null);

  parentCategoryOptions = [
    { label: '— No parent —', value: null },
    { label: 'Solar Panels', value: 1 },
    { label: 'Inverters', value: 2 },
    { label: 'Batteries', value: 3 },
  ];

  form = this.fb.group({
    name: this.fb.control<string | null>('', Validators.required),
    slug: this.fb.control<string | null>(''),
    parentCategory: this.fb.control<number | null>(null),
    sortOrder: this.fb.control<number | null>(0),
    showInMenu: this.fb.control<boolean | null>(true),
    isActive: this.fb.control<boolean | null>(true),
    image: this.fb.control<string | null>(null),
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.categoryId.set(id ? Number(id) : null);
    if (!this.isEdit()) {
      this.form.get('name')?.valueChanges.subscribe((name) => {
        if (!this.form.get('slug')?.value) {
          const slug = name
            ?.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');

          this.form.patchValue({ slug }, { emitEvent: false });
        }
      });
    }
    if (this.isEdit()) {
      this.service.get(this.categoryId()!).subscribe((c) => c && this.form.patchValue(c));
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as Omit<Category, 'id'>;

    console.log('CATEGORY SUBMIT:', payload, 'Edit:', this.isEdit());

    if (this.isEdit()) {
      this.service
        .update(this.categoryId()!, payload)
        .subscribe(() => this.router.navigate(['/dashboard/catalog/categories']));
    } else {
      this.service
        .create(payload)
        .subscribe(() => this.router.navigate(['/dashboard/catalog/categories']));
    }
  }
}
