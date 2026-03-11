import { Injectable, inject, signal, PLATFORM_ID, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserProfile } from './auth.types';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private platformId = inject(PLATFORM_ID);

  /* =====================
      STATE
  ===================== */

  token = signal<string | null>(null);
  refreshToken = signal<string | null>(null);
  user = signal<UserProfile | null>(null);

  /* =====================
      AUTH STATE
  ===================== */

  isAuthenticated = computed(() => {
    return !!this.token() && !!this.user();
  });

  /* =====================
      AVATAR
  ===================== */

  avatarUrl = computed<string>(() => {
    const profile = this.user();

    const defaultAvatar = 'https://i.pravatar.cc/150?img=8';

    if (!profile?.avatar) return defaultAvatar;

    return profile.avatar.startsWith('http')
      ? profile.avatar
      : `${environment.mediaUrl}${profile.avatar}`;
  });

  /* =====================
      INIT FROM STORAGE
  ===================== */

  constructor() {
    this.initFromStorage();
  }

  initFromStorage() {
    if (!isPlatformBrowser(this.platformId)) return;

    const savedAccess = localStorage.getItem('access_token');
    const savedRefresh = localStorage.getItem('refresh_token');
    const savedUser = localStorage.getItem('auth_user');

    if (savedAccess) {
      this.token.set(savedAccess);
    }

    if (savedRefresh) {
      this.refreshToken.set(savedRefresh);
    }

    if (savedUser) {
      try {
        this.user.set(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('auth_user');
      }
    }
  }

  /* =====================
      SET USER
  ===================== */

  setUser(user: UserProfile) {
    this.user.set(user);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
  }

  /* =====================
      LOGIN SUCCESS
  ===================== */

  loginSuccess(access: string, refresh: string, user: UserProfile | null = null) {
    this.token.set(access);
    this.refreshToken.set(refresh);

    if (user) {
      this.user.set(user);
    }

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      if (user) {
        localStorage.setItem('auth_user', JSON.stringify(user));
      }
    }
  }

  /* =====================
      UPDATE ACCESS TOKEN
  ===================== */

  updateAccessToken(token: string) {
    this.token.set(token);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', token);
    }
  }

  /* =====================
      LOGOUT
  ===================== */

  logout() {
    this.token.set(null);
    this.refreshToken.set(null);
    this.user.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('auth_user');
    }
  }
}
