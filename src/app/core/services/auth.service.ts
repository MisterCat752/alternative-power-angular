// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthStore } from './auth.store';
import { User, LoginDto, RegisterDto } from './auth.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://192.168.0.150:8000/api/auth'; // базовый URL API

  constructor(private http: HttpClient, private auth: AuthStore) {}

  login(data: LoginDto): Observable<{ access: string; refresh: string }> {
    return this.http.post<{ access: string; refresh: string }>(`${this.base}/token/`, data).pipe(
      tap((res) => {
        // сохраняем токен в store
        this.auth.loginSuccess(res.access, { email: data.email } as User);
      })
    );
  }

  register(data: RegisterDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/register/`, data);
  }

  logout() {
    this.auth.logout();
  }
}
