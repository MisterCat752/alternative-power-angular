import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User, UserProfile } from './auth.types';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  token = signal<string | null>(null);
  user = signal<UserProfile | null>(null);

  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('token');
      if (saved) this.token.set(saved);
    }
  }

  setUser(user: UserProfile) {
    this.user.set(user);
  }

  loginSuccess(token: string, user: User) {
    this.token.set(token);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  logout() {
    this.token.set(null);
    this.user.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
