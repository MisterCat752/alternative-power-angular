import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, throwError } from 'rxjs';
import { AuthStore } from './auth.store';
import { LoginDto, RegisterDto, UserProfile } from './auth.types';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authStore: AuthStore) {}

  login(data: LoginDto): Observable<{ access: string; refresh: string }> {
    return this.http
      .post<{ access: string; refresh: string }>(`${this.baseUrl}/auth/token/`, data)
      .pipe(
        tap((res) => {
          this.authStore.loginSuccess(res.access, res.refresh, null);
        })
      );
  }

  refreshToken(): Observable<{ access: string }> {
    const token = this.authStore.refreshToken(); // получаем текущее значение сигнала
    if (!token) return throwError(() => new Error('No refresh token available'));

    return this.http.post<{ access: string }>(`${this.baseUrl}/auth/token/refresh/`, {
      refresh: token,
    });
  }

  register(data: RegisterDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/auth/register/`, data);
  }

  logout() {
    this.authStore.logout();
  }
}
