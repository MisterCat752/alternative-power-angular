// pages/dashboard/catalog/brand-form/brand-form.page.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { ImageInput } from '../../../../../shared/form/image-input/image-input';

import { BrandService } from '../../../../../core/services/brand.service';
import { Brand } from '../../../../../core/models/brand.model';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormField, TextInput, ImageInput],
  templateUrl: './brand-create-page.html',
})
export class BrandFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(BrandService);

  brandId = signal<number | null>(null);
  isEdit = computed(() => this.brandId() !== null);

  form = this.fb.group({
    name: ['', Validators.required],
    slug: [''],
    country: [''],
    website: [''],
    logo: [null as string | null],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.brandId.set(id ? Number(id) : null);

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
      this.service.get(this.brandId()!).subscribe((b) => b && this.form.patchValue(b));
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Omit<Brand, 'id'> = this.form.value as any;

    console.log('Brand payload:', payload, 'Edit:', this.isEdit());

    if (this.isEdit()) {
      this.service.update(this.brandId()!, payload).subscribe((res) => {
        console.log('Updated brand:', res);
        this.router.navigate(['/dashboard/catalog/brands']);
      });
    } else {
      this.service.create(payload).subscribe((res) => {
        console.log('Created brand:', res);
        this.router.navigate(['/dashboard/catalog/brands']);
      });
    }
  }
}
