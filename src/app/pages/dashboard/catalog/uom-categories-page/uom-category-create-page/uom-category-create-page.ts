import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';
import { UomCategory } from '../../../../../core/models/uom-category/uom-category.model';
import { UomCategoryService } from '../../../../../core/services/uom-category/uom-category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-uom-category-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, UiSelect],
  templateUrl: './uom-category-create-page.html',
})
export class UomCategoryForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(UomCategoryService);

  form!: FormGroup;
  categoryId = signal<number | null>(null);
  isEdit = computed(() => this.categoryId() !== null);

  baseUomOptions = [
    { label: 'meter (m)', value: 'meter' },
    { label: 'kilogram (kg)', value: 'kilogram' },
    { label: 'piece (pcs)', value: 'piece' },
  ];

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.categoryId.set(idParam ? Number(idParam) : null);

    this.form = this.fb.group({
      name: ['', Validators.required],
      baseUom: [null, Validators.required],
    });

    if (this.isEdit()) {
      this.service.getCategory(this.categoryId()!).subscribe((c) => c && this.load(c));
    }
  }

  load(category: UomCategory) {
    this.form.patchValue(category);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Omit<UomCategory, 'id'> = this.form.value;

    console.log('Submitting UOM Category:', payload, 'Edit mode:', this.isEdit());

    if (this.isEdit()) {
      this.service.updateCategory(this.categoryId()!, payload).subscribe((res) => {
        console.log('Updated category:', res);
        this.router.navigate(['/dashboard/catalog/uom-categories']);
      });
    } else {
      this.service.createCategory(payload).subscribe((res) => {
        console.log('Created category:', res);
        this.router.navigate(['/dashboard/catalog/uom-categories']);
      });
    }
  }
}
