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

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    // userType: ['' as any as UserType, [Validators.required]],
    // accept: [false, [Validators.requiredTrue]],
  });

  submit() {
    console.log('submit called'); // <--- проверка
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.form.value.password !== this.form.value.password2) {
      alert('Пароли не совпадают');
      return;
    }

    const data: RegisterDto = {
      email: this.form.value.email!,
      password: this.form.value.password!,
      fullName: '', // или this.form.value.fullName если есть
      preferred_language: 'ro',
    };

    this.auth.register(data).subscribe({
      next: (user) => {
        // alert(user.message); // message нет
        alert(`Регистрация прошла успешно: ${user}`);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        // здесь точно будет detail от DRF
        alert(err.error.detail || 'Ошибка регистрации');
      },
    });
  }
}
