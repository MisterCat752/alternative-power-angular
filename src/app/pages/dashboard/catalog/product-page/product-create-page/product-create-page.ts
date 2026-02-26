import { Component, computed, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { FormField } from '../../../../../shared/form/form-field/form-field';
import { ImageInput } from '../../../../../shared/form/image-input/image-input';
import { NumberInput } from '../../../../../shared/form/number-input/number-input';
import { TextInput } from '../../../../../shared/form/text-input/text-input';
import { UiSelect } from '../../../../../shared/ui/ui-select/ui-select';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../core/services/products/product.service';

import { CategoryService } from '../../../../../core/services/category.service';
import { BrandService } from '../../../../../core/services/brand.service';
import { WarrantyService } from '../../../../../core/services/warranty.service';
import { UnitOfMeasureService } from '../../../../../core/services/unit-of-measure.service';

import { Product } from '../../../../../core/models/products/product.model';

@Component({
  selector: 'app-product-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, ImageInput, NumberInput, TextInput, UiSelect],
  templateUrl: './product-create-page.html',
})
export class ProductForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private service = inject(ProductService);
  private categoryService = inject(CategoryService);
  private brandService = inject(BrandService);
  private warrantyService = inject(WarrantyService);
  private uomService = inject(UnitOfMeasureService);

  form!: FormGroup;

  productId = signal<number | null>(null);
  isEdit = computed(() => this.productId() !== null);

  activeSection: 'pricing' | 'stock' | 'settings' = 'pricing';

  currencyOptions = [{ label: 'MDL', value: 'MDL' }];

  categoryOptions: any[] = [];
  brandOptions: any[] = [];
  warrantyOptions: any[] = [];
  uomOptions: any[] = [];

  productTypeOptions = [
    { label: 'Single product', value: 'single' },
    { label: 'Bundle (Kit)', value: 'bundle' },
  ];

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId.set(idParam ? Number(idParam) : null);

    this.initForm();
    this.loadSelects();

    if (this.isEdit()) {
      this.service.getProduct(this.productId()!).subscribe((p) => {
        if (p) {
          this.loadProduct(p);
          this.cdr.detectChanges();
        }
      });
    }
  }

  /* ================= FORM INIT ================= */

  initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      shortDescription: [''],
      image: [null],
      sku: [this.generateSku()],
      quantity: [0, Validators.min(0)],
      price: [0, Validators.min(0)],
      category: [null, Validators.required],
      brand: [null],
      productType: ['single'],

      specifications: this.fb.array([]),

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
        baseUom: [null],
        purchaseUom: [null],
      }),

      settings: this.fb.group({
        warranty: [null],
        invoice: ['435'],
        slug: [''],
        modelName: [''],
        published: [false],
        internal: [false],
        allowPreorder: [false],
      }),
    });
  }

  /* ================= SPEC HELPERS ================= */

  get specifications(): FormArray {
    return this.form.get('specifications') as FormArray;
  }

  getSpecItems(groupIndex: number): FormArray {
    return this.specifications.at(groupIndex).get('items') as FormArray;
  }

  addSpecGroup() {
    this.specifications.push(
      this.fb.group({
        group: [''],
        items: this.fb.array([]),
      }),
    );
  }

  removeSpecGroup(index: number) {
    this.specifications.removeAt(index);
  }

  addSpecItem(groupIndex: number) {
    this.getSpecItems(groupIndex).push(
      this.fb.group({
        label: [''],
        value: [''],
      }),
    );
  }

  removeSpecItem(groupIndex: number, itemIndex: number) {
    this.getSpecItems(groupIndex).removeAt(itemIndex);
  }

  /* ================= LOAD PRODUCT ================= */

  loadProduct(p: Product) {
    this.form.patchValue({
      ...p,
    });

    if (p.specifications?.length) {
      p.specifications.forEach((group) => {
        const groupForm = this.fb.group({
          group: [group.group],
          items: this.fb.array([]),
        });

        group.items.forEach((item) => {
          (groupForm.get('items') as FormArray).push(
            this.fb.group({
              label: [item.label],
              value: [item.value],
            }),
          );
        });

        this.specifications.push(groupForm);
      });
    }
  }

  /* ================= SELECT DATA ================= */

  generateSku(): string {
    return crypto.randomUUID();
  }

  loadSelects() {
    this.categoryService.list().subscribe((res) => {
      this.categoryOptions = res.map((c) => ({
        label: c.name,
        value: c.slug,
      }));
    });

    this.brandService.list().subscribe((res) => {
      this.brandOptions = res.map((b) => ({
        label: b.name,
        value: b.slug,
      }));
    });

    this.warrantyService.listWarranties().subscribe((res) => {
      this.warrantyOptions = res.map((w) => ({
        label: `${w.name} (${w.durationYears}y)`,
        value: w.id,
      }));
    });

    this.uomService.listUnits().subscribe((res) => {
      this.uomOptions = res.map((u) => ({
        label: `${u.unitName} (${u.symbol})`,
        value: u.id,
      }));
    });
  }

  /* ================= SUBMIT ================= */

  submit() {
    const payload: Product = this.form.value;

    if (this.isEdit()) {
      this.service
        .updateProduct(this.productId()!, payload)
        .subscribe(() => this.router.navigate(['/dashboard/catalog/products']));
    } else {
      this.service
        .createProduct(payload)
        .subscribe(() => this.router.navigate(['/dashboard/catalog/products']));
    }
  }
}
