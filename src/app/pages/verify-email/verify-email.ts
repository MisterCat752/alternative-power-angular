// src/app/pages/verify-email/verify-email.page.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './verify-email.html',
})
export class VerifyEmailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private router = inject(Router);

  status: 'pending' | 'success' | 'error' = 'pending';
  message = 'Верификация email...';

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.status = 'error';
      this.message = 'Токен не найден.';
      return;
    }

    this.http
      .post<{ detail?: string }>('http://192.168.0.150:8000/api/auth/verify-email/', { token })
      .subscribe({
        next: (res) => {
          this.status = 'success';
          this.message = 'Email успешно подтверждён! Теперь можно войти.';
        },
        error: (err) => {
          this.status = 'error';
          this.message = err.error.detail || 'Ошибка при подтверждении email.';
        },
      });
  }
}
