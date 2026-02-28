// src/app/pages/login/login.page.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginDto } from '../../../core/services/auth.types';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, RouterLink],
  templateUrl: './login.html',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  hide = true;
  loading = false;
  submitted = false; // ← добавляем флаг отправки

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    this.submitted = true; // ← форма была отправлена
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: LoginDto = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };
    this.loading = true;
    this.auth.login(data).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard/profile']);
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
