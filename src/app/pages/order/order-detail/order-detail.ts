import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cart } from '../../../core/models/cart.model';
import { CartService } from '../../../core/services/cart.service';
import { FormField } from '../../../shared/form/form-field/form-field';
import { TextInput } from '../../../shared/form/text-input/text-input';
import { NumberInput } from '../../../shared/form/number-input/number-input';
@Component({
  selector: 'app-order-detail',
  imports: [ReactiveFormsModule, FormField, NumberInput, TextInput],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail {
  form: FormGroup;
  private cartService = inject(CartService);

  cart = signal<Cart | null>(null);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      comments: [''],
    });
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((c) => this.cart.set(c));
  }
  submit() {
    if (this.form.valid) {
      console.log('Order Data:', this.form.value);
      console.log('Cart Items:', this.cart()?.items);
      // Тут будет вызов API создания заказа
    } else {
      this.form.markAllAsTouched();
    }
  }
}

function toSignal<T>(arg0: Observable<Cart>) {
  throw new Error('Function not implemented.');
}
