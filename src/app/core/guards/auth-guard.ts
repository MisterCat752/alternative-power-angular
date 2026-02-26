import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../services/auth.store';

export const AuthGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const auth = inject(AuthStore);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const router = inject(Router);

  const token = auth.token();
  const user = auth.user();

  if (!token || !user) {
    return router.parseUrl('/login');
  }

  return true;
};
