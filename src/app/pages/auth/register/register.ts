// src/app/pages/register/register.page.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterDto } from '../../../core/services/auth.types';

type UserType = 'PERSON' | 'COMPANY';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  submitted = false;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.form.value.password !== this.form.value.password2) {
      alert('Passwords do not match');
      return;
    }

    const data: RegisterDto = {
      email: this.form.value.email!,
      password: this.form.value.password!,
      fullName: '',
      preferred_language: 'en',
    };

    this.auth.register(data).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => alert(err.error.detail || 'Registration error'),
    });
  }
}
