// pages/dashboard/inventory/unit-of-measure-form/unit-of-measure-form.page.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../../../shared/form/number-input/number-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';
import { UnitOfMeasureService } from '../../../../../core/services/unit-of-measure.service';
import { UnitOfMeasure } from '../../../../../core/models/unit-of-measure.model';

@Component({
  selector: 'app-unit-of-measure-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormField, TextInput, NumberInput, UiSelect],
  templateUrl: './unit-of-measure-create-page.html',
})
export class UnitOfMeasureForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(UnitOfMeasureService);

  form!: FormGroup;
  unitId = signal<number | null>(null);
  isEdit = computed(() => this.unitId() !== null);

  categoryOptions = [
    { label: 'Length', value: 'length' },
    { label: 'Weight', value: 'weight' },
    { label: 'Quantity', value: 'quantity' },
  ];

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.unitId.set(idParam ? Number(idParam) : null);

    this.form = this.fb.group({
      category: [null, Validators.required],
      unitName: ['', Validators.required],
      symbol: ['', Validators.required],
      ratioToBase: [1, [Validators.required, Validators.min(0.000001)]],
      continuousUnit: [false],
      packagingUnit: [false],
    });

    if (this.isEdit()) {
      this.service.getUnit(this.unitId()!).subscribe((u) => u && this.load(u));
    }
  }

  load(u: UnitOfMeasure) {
    this.form.patchValue(u);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Omit<UnitOfMeasure, 'id'> = this.form.value;

    console.log('Submitting Unit of Measure:', payload, 'Edit mode:', this.isEdit());

    if (this.isEdit()) {
      this.service.updateUnit(this.unitId()!, payload).subscribe((res) => {
        console.log('Unit updated:', res);
        this.router.navigate(['/dashboard/catalog/units-of-measure']);
      });
    } else {
      this.service.createUnit(payload).subscribe((res) => {
        console.log('Unit created:', res);
        this.router.navigate(['/dashboard/catalog/units-of-measure']);
      });
    }
  }
}
