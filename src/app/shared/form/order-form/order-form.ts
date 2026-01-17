// src/app/pages/dashboard/sales/order-form/order-form.page.ts

import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextInput } from '../text-input/text-input';
import { NumberInput } from '../number-input/number-input';
import { OrdersService } from '../../../core/services/orders/order.service';
import { OrderDetails, OrderProduct } from '../../../core/models/orders/orders.model';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextInput, NumberInput, CommonModule, FormField],
  templateUrl: './order-form.html',
})
export class OrderForm implements OnInit {
  private fb = inject(FormBuilder);
  private ordersService = inject(OrdersService);
  private route = inject(ActivatedRoute);
  form!: FormGroup;
  orderId = signal<number | null>(null);
  isEdit = computed(() => this.orderId() !== null);
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.orderId.set(id ? Number(id) : null);
    this.form = this.fb.group({
      orderNumber: [''],
      total: [0],
      status: [''],
      date: [''],
      customer: this.fb.group({
        name: [''],
        email: [''],
        phone: [''],
      }),
      shipping: this.fb.group({
        email: [''],
        phone: [''],
        address: [''],
      }),
      items: this.fb.array([]),
    });

    if (this.isEdit()) {
      this.ordersService.getOrder(this.orderId()!).subscribe((order) => this.loadOrder(order));
    } else {
      this.addItem();
    }
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(item?: OrderProduct) {
    this.items.push(
      this.fb.group({
        sku: [item?.sku || ''],
        unit: [item?.unit_price || 0],
        qty: [item?.quantity || 0],
        total: [item?.total || 0],
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }
  getError(control: string) {
    const c = this.form.get(control);
    return c && c.invalid && c.touched ? 'Required field' : '';
  }

  getNestedError(group: string, control: string) {
    const c = this.form.get(`${group}.${control}`);
    return c && c.invalid && c.touched ? 'Required field' : '';
  }
  loadOrder(order: OrderDetails) {
    this.form.patchValue({
      orderNumber: order.code,
      total: order.total,
      status: order.status,
      date: order.date,
      customer: order.customer,
      shipping: order.shipping,
    });

    this.items.clear();
    order.items.forEach((item) => this.addItem(item));
  }

  submit() {
    const value: OrderDetails = this.form.value;
    this.ordersService.saveOrder(value).subscribe((saved) => {
      console.log('Order saved', saved);
    });
  }
}
