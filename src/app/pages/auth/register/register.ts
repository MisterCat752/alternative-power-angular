import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

type UserType = 'PERSON' | 'COMPANY';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
})
export class RegisterPage {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    userType: ['' as any as UserType, [Validators.required]],
    accept: [false, [Validators.requiredTrue]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.form.value.password !== this.form.value.password2) {
      alert('Пароли не совпадают');
      return;
    }
    console.log('register', this.form.value);
  }
}
