import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthStore } from './auth.store';
import { LoginDto, RegisterDto, UserProfile } from './auth.types';
import { UsersService } from '../services/users/users.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private authStore: AuthStore,
    private usersService: UsersService,
  ) {}

  /* ======================
        LOGIN
  ====================== */
  login(data: LoginDto): Observable<{ access: string; refresh: string }> {
    const user = (this.usersService as any).users.find((u: any) => u.email === data.email);

    if (!user || user.password !== data.password) {
      return throwError(() => ({
        error: { detail: 'Invalid email or password' },
      }));
    }

    if (!user.is_active) {
      return throwError(() => ({
        error: { detail: 'User is not active' },
      }));
    }

    const access = this.generateToken();
    const refresh = this.generateToken();

    const profile: UserProfile = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone ?? '',
      preferred_language: 'ro',
      account_type: user.account_type,
      avatar: user.avatar,
      date_joined: user.date_joined,
      email_verified_at: user.email_verified_at,
      is_email_verified: user.is_email_verified,
      is_manager: user.groups.includes('Manager'),
      is_staff: user.is_staff,
      groups: user.groups,
    };

    this.authStore.loginSuccess(access, refresh, profile);

    return of({ access, refresh }).pipe(delay(500));
  }

  refreshToken(): Observable<{ access: string }> {
    const refresh = this.authStore.refreshToken();
    if (!refresh) {
      return throwError(() => new Error('No refresh token'));
    }

    const newAccess = btoa(Math.random().toString());

    this.authStore.token.set(newAccess);
    localStorage.setItem('access_token', newAccess);

    return of({ access: newAccess }).pipe(delay(400));
  }
  /* ======================
        REGISTER
  ====================== */
  register(data: RegisterDto): Observable<{ message: string }> {
    const existingUser = (this.usersService as any).users.find((u: any) => u.email === data.email);

    if (existingUser) {
      return throwError(() => ({
        error: { detail: 'Email already exists' },
      }));
    }

    (this.usersService as any).users.unshift({
      id: crypto.randomUUID(),
      first_name: data.fullName || '',
      last_name: '',
      email: data.email,
      password: data.password,
      phone: null,
      account_type: 'individual',
      avatar: null,
      groups: ['Customer'],
      is_active: true,
      is_staff: false,
      is_email_verified: false,
      email_verified_at: null,
      date_joined: new Date().toISOString(),
    });

    return of({ message: 'User registered successfully' }).pipe(delay(500));
  }

  logout() {
    this.authStore.logout();
  }

  /* ======================
        FAKE TOKEN
  ====================== */
  private generateToken(): string {
    return btoa(Math.random().toString());
  }
}
