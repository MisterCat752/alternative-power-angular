import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudFormPage } from '../../../../core/models/crud-form-page.model';
import { Cart, CartItem } from '../../../../core/models/cart.model';
import { CartService } from '../../../../core/services/cart.service';
import { TextInput } from '../../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../../shared/form/number-input/number-input';
import { FormField } from '../../../../shared/form/form-field/form-field';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInput, NumberInput, FormField],
  templateUrl: './cart-form.html',
})
export class CartForm extends CrudFormPage<Cart> {
  private service = inject(CartService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Сигнал для ID корзины
  cartId = signal<number | null>(null);
  isEdit = computed(() => this.cartId() !== null);

  form: FormGroup = this.fb.group({
    customerEmail: ['', [Validators.required, Validators.email]],
    status: ['Active', Validators.required],
    items: this.fb.array([]),
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.cartId.set(idParam ? Number(idParam) : null);

    if (this.isEdit()) {
      const cart = this.loadEntity(this.cartId()!);
      if (cart) {
        this.form.patchValue({
          customerEmail: cart.customerEmail,
          status: cart.status,
        });
      }
    }
  }

  override submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Partial<Cart> = this.form.value;

    if (this.isEdit()) {
      this.updateEntity(this.cartId()!, payload);
    } else {
      this.createEntity(payload);
    }

    this.router.navigate(['/dashboard/cart/cart-list']);
  }

  // --- остальные методы (loadEntity, createEntity, updateEntity, createItemGroup, addItem, removeItem) ---
  protected loadEntity(id: number): Cart | undefined {
    const cart = this.service.getCartById(id);
    if (cart) {
      const itemsArray = this.form.get('items') as FormArray;
      itemsArray.clear();
      cart.items.forEach((item) => itemsArray.push(this.createItemGroup(item)));
    }
    return cart;
  }

  protected createEntity(data: Partial<Cart>): any {
    const newCart: Cart = {
      id: Date.now(),
      customerEmail: data.customerEmail!,
      status: data.status as 'Active' | 'Inactive',
      items: (data.items as CartItem[]) || [],
      totalItems: (data.items as CartItem[])?.length || 0,
      cartTotal: this.calculateTotal(data.items as CartItem[]),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.service.updateCart(newCart);
    return newCart;
  }

  protected updateEntity(id: number, data: Partial<Cart>): any {
    const updatedCart: Cart = {
      ...(this.service.getCartById(id) as Cart),
      customerEmail: data.customerEmail!,
      status: data.status as 'Active' | 'Inactive',
      items: (data.items as CartItem[]) || [],
      totalItems: (data.items as CartItem[])?.length || 0,
      cartTotal: this.calculateTotal(data.items as CartItem[]),
      updatedAt: new Date().toISOString(),
    };
    this.service.updateCart(updatedCart);
    return updatedCart;
  }

  private createItemGroup(item: CartItem): FormGroup {
    return this.fb.group({
      name: [item.name, Validators.required],
      sku: [item.sku, Validators.required],
      unitPrice: [item.unitPrice, Validators.required],
      quantity: [item.quantity, Validators.required],
      total: [item.total],
    });
  }

  private calculateTotal(items: CartItem[]): number {
    return items?.reduce((acc, item) => acc + item.total, 0) || 0;
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(item?: CartItem) {
    this.items.push(
      this.createItemGroup(item || { name: '', sku: '', unitPrice: 0, quantity: 1, total: 0 })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  cartTotal = computed(() =>
    this.items.value.reduce((sum: number, i: CartItem) => sum + i.total, 0)
  );
}
