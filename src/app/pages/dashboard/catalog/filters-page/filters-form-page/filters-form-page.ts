import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../../../shared/form/number-input/number-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';

import { CategoryFilterService } from '../../../../../core/services/filter.service';
import { CategoryService } from '../../../../../core/services/category.service';
import { CategoryFilter } from '../../../../../core/models/filter.model';
import { Category } from '../../../../../core/models/category.model';

@Component({
  selector: 'app-filters-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormField, TextInput, NumberInput, UiSelect],
  templateUrl: './filters-form-page.html',
})
export class FiltersFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private filterService = inject(CategoryFilterService);
  private categoryService = inject(CategoryService);

  filterId = signal<number | null>(null);
  isEdit = computed(() => this.filterId() !== null);

  CategoryOptions: { label: string; value: string }[] = [];

  form = this.fb.group({
    category: this.fb.control<string | null>('', Validators.required),
    key: this.fb.control<string | null>('', Validators.required),
    title: this.fb.control<string | null>('', Validators.required),
    type: this.fb.control<'checkbox' | 'price'>('checkbox'),
    options: this.fb.array([]),
    isActive: this.fb.control<boolean>(true),
  });

  get options() {
    return this.form.get('options') as FormArray;
  }

  ngOnInit() {
    // Определяем редактирование или создание
    const id = this.route.snapshot.paramMap.get('id');
    this.filterId.set(id ? Number(id) : null);

    // Загружаем категории
    this.categoryService.list().subscribe((cats: Category[]) => {
      this.CategoryOptions = cats.map((c) => ({ label: c.name, value: c.slug }));

      if (this.isEdit()) {
        // редактирование
        this.filterService.get(this.filterId()!).subscribe((f) => {
          if (!f) return;

          this.form.patchValue({
            category: f.category,
            key: f.key,
            title: f.title,
            type: f.type,
            isActive: f.isActive,
          });

          // Заполняем FormArray
          f.options.forEach((opt) => this.addOption(opt.label, opt.value));
        });
      } else {
        // создание: ставим первую категорию по умолчанию
        if (this.CategoryOptions.length) {
          this.form.patchValue({ category: this.CategoryOptions[0].value });
        }

        // хотя бы одна пустая опция
        this.addOption('', '');
      }
    });
  }

  addOption(label = '', value = '') {
    this.options.push(
      this.fb.group({
        label: this.fb.control(label, Validators.required),
        value: this.fb.control(value, Validators.required),
      }),
    );
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;

    const options: { label: string; value: string }[] = (raw.options || [])
      .filter((o: any) => o && o.label && o.value)
      .map((o: any) => ({ label: o.label, value: o.value }));

    const payload: Omit<CategoryFilter, 'id'> = {
      category: raw.category!,
      key: raw.key!,
      title: raw.title!,
      type: raw.type!,
      options,
      isActive: raw.isActive!,
    };

    if (this.isEdit()) {
      this.filterService
        .update(this.filterId()!, payload)
        .subscribe(() => this.router.navigate(['/dashboard/catalog/filters']));
    } else {
      this.filterService
        .create(payload)
        .subscribe(() => this.router.navigate(['/dashboard/catalog/filters']));
    }
  }
}
