import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserProfile } from './auth.types';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  token = signal<string | null>(null);
  refreshToken = signal<string | null>(null);
  user = signal<UserProfile | null>(null);

  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedAccess = localStorage.getItem('access_token');
      const savedRefresh = localStorage.getItem('refresh_token');
      if (savedAccess) this.token.set(savedAccess);
      if (savedRefresh) this.refreshToken.set(savedRefresh);
    }
  }

  setUser(user: UserProfile) {
    this.user.set(user);
  }

  loginSuccess(access: string, refresh: string, user: UserProfile | null = null) {
    this.token.set(access);
    this.refreshToken.set(refresh);
    if (user) this.user.set(user);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
    }
  }

  logout() {
    this.token.set(null);
    this.refreshToken.set(null);
    this.user.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }
}
