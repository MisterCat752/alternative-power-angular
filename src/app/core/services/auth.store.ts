import { Injectable, inject, signal, PLATFORM_ID, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserProfile } from './auth.types';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  token = signal<string | null>(null);
  refreshToken = signal<string | null>(null);
  user = signal<UserProfile | null>(null);

  private platformId = inject(PLATFORM_ID);

  /* =====================
      AVATAR COMPUTED
  ===================== */
  avatarUrl = computed<string>(() => {
    const profile = this.user();

    const defaultAvatar = 'https://i.pravatar.cc/150?img=8';

    if (!profile?.avatar) return defaultAvatar;

    return profile.avatar.startsWith('http')
      ? profile.avatar
      : `${environment.mediaUrl}${profile.avatar}`;
  });
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedAccess = localStorage.getItem('access_token');
      const savedRefresh = localStorage.getItem('refresh_token');
      const savedUser = localStorage.getItem('auth_user');

      if (savedAccess) this.token.set(savedAccess);
      if (savedRefresh) this.refreshToken.set(savedRefresh);
      if (savedUser) this.user.set(JSON.parse(savedUser));
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
