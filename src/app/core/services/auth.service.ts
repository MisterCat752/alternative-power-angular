import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthStore } from './auth.store';
import { User, LoginDto, RegisterDto } from './auth.types';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private auth: AuthStore) {}

  login(data: LoginDto): Observable<{ access: string; refresh: string }> {
    return this.http
      .post<{ access: string; refresh: string }>(`${this.baseUrl}/auth/token/`, data)
      .pipe(
        tap((res) => {
          this.auth.loginSuccess(res.access, { email: data.email } as User);
        })
      );
  }

  register(data: RegisterDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/auth/register/`, data);
  }

  logout() {
    this.auth.logout();
  }
}
