import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '../../../core/models/cart.model';
import { CartService } from '../../../core/services/cart.service';
import { FormField } from '../../../shared/form/form-field/form-field';
import { TextInput } from '../../../shared/form/text-input/text-input';
import { OrderDetails } from '../../../core/models/orders/orders.model';
import { OrdersService } from '../../../core/services/orders/order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail {
  private cartService = inject(CartService);
  private ordersService = inject(OrdersService);
  private router = inject(Router);

  form: FormGroup;
  cart = signal<Cart | null>(null);
  loading = signal(false);
  success = signal(false);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['', Validators.required],
      comments: [''],
    });

    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((c) => this.cart.set(c));
  }

  submit() {
    if (this.form.invalid || !this.cart()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const cart = this.cart()!;
    const formValue = this.form.value;

    const newOrder: Omit<OrderDetails, 'id'> = {
      code: `SO-${Date.now()}`,
      status: 'pending',
      date: new Date().toISOString(),
      currency: 'EUR',
      subtotal: cart.cartTotal,
      total: cart.cartTotal,
      items: cart.items.map((item, index) => ({
        id: item.id ?? index + 1, // гарантируем number
        sku: item.sku ?? 'N/A',
        unit_price: Number(item.unitPrice), // убираем any
        quantity: item.quantity,
        total: item.total,
      })),
      customer: {
        name: `${formValue.firstName} ${formValue.lastName}`,
        email: formValue.email,
        phone: formValue.phone,
      },
      shipping: {
        email: formValue.email,
        phone: formValue.phone,
        address: formValue.address,
      },
    };

    this.ordersService.createOrder(newOrder).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        // this.cartService.clearCart();
      },
    });
  }
}
