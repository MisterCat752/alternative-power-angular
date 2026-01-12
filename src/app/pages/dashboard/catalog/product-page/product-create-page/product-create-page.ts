import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormField } from '../../../../../shared/form/form-field/form-field';
import { ImageInput } from '../../../../../shared/form/image-input/image-input';
import { NumberInput } from '../../../../../shared/form/number-input/number-input';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';

@Component({
  selector: 'app-product-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, ImageInput, NumberInput, TextInput, UiSelect],
  templateUrl: './product-create-page.html',
  styleUrl: './product-create-page.css',
})
export class ProductCreatePage {
  // 🔹 Главная форма страницы
  form: FormGroup;
  activeSection: 'pricing' | 'stock' | 'settings' = 'pricing';

  // 🔹 селекты
  currencyOptions = [{ label: 'MDL', value: 'MDL' }];

  uomOptions = [
    { label: 'meter (m)', value: 'meter' },
    { label: 'Same as base UOM', value: 'same' },
  ];

  warrantyOptions = [{ label: 'No warranty', value: null }];

  // 🔹 Опции для селектов (пока мок)
  categoryOptions = [
    { label: 'Solar panels', value: 'solar' },
    { label: 'Batteries', value: 'battery' },
  ];

  brandOptions = [
    { label: 'Huawei', value: 'huawei' },
    { label: 'Growatt', value: 'growatt' },
  ];

  productTypeOptions = [
    { label: 'Single product', value: 'single' },
    { label: 'Bundle (Kit)', value: 'bundle' },
  ];

  colors = ['Black', 'White', 'Silver'];

  constructor(private fb: FormBuilder) {
    // 🔹 Инициализация формы
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      shortDescription: [''],

      image: [null],

      sku: [''],
      quantity: [0, Validators.min(0)],
      price: [0, Validators.min(0)],

      category: [null, Validators.required],
      brand: [null],
      productType: ['single'],

      pricing: this.fb.group({
        currency: ['MDL'],
        listPrice: [null],
        installerPrice: [null],
        salePrice: [null],
        saleEndsAt: [null],

        manualWebsitePrice: [null],
        websiteDiscount: [0],
        defaultMargin: [30],

        pricingProfile: [null],
        tva: [null],
        customs: [null],
        logistics: [null],
      }),

      stock: this.fb.group({
        baseUom: ['meter'],
        purchaseUom: ['same'],
      }),

      settings: this.fb.group({
        warranty: [null],
        invoice: [''],
        slug: [''],
        modelName: [''],

        published: [false],
        internal: [false],
        allowPreorder: [false],
      }),
    });
  }
}
