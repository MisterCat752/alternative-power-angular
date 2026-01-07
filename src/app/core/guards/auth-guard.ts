import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../services/auth.store';

export const AuthGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const auth = inject(AuthStore);

  // SSR: nu avem localStorage, deci NU redirecționăm.
  if (!isPlatformBrowser(platformId)) {
    console.log('[authGuard] Running on server (SSR), allowing access');
    return true;
  }

  const router = inject(Router);
  const token = auth.token();

  console.log('[authGuard] Browser check - Token exists:', !!token);

  if (!token) {
    console.log('[authGuard] No token found, redirecting to /login');
    return router.parseUrl('/login');
  }

  console.log('[authGuard] Token found, access granted');
  return true;
};
