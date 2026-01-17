import { inject, signal } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthStore } from '../services/auth.store';
import { firstValueFrom, timer } from 'rxjs';

export const RoleGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthStore);
  const router = inject(Router);
  const requiredGroup = route.data['requiredGroup'] as string;

  const tokenExists = !!auth.token();

  if (!tokenExists) {
    console.log('[RoleGuard] Нет токена, редирект на /login');
    return router.parseUrl('/login');
  }

  // Ждём пока user загрузится (макс 3 сек)
  const waitForUser = async () => {
    const start = Date.now();
    while (!auth.user() && Date.now() - start < 1000) {
      await new Promise((res) => setTimeout(res, 0)); // polling
    }
    return auth.user();
  };

  const user = await waitForUser();

  if (!user) {
    console.log('[RoleGuard] Профиль не загрузился, редирект на /login');
    return router.parseUrl('/login');
  }

  if (requiredGroup && !user.groups?.includes(requiredGroup)) {
    console.log(`[RoleGuard] Нет нужной группы (${requiredGroup}), редирект на /dashboard`);
    return router.parseUrl('/dashboard');
  }

  console.log('[RoleGuard] Доступ разрешен');
  return true;
};
