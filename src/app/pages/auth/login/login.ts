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

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Приводим типы явно
    const data: LoginDto = {
      email: this.form.value.email!, // ! гарантирует TS, что не null
      password: this.form.value.password!,
    };
    this.loading = true;
    this.auth.login(data).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard/profile']); // после логина редирект на домашнюю
      },
      error: (err) => {
        this.loading = false;
        alert(err.error.detail || 'Ошибка логина');
      },
    });
  }
}
