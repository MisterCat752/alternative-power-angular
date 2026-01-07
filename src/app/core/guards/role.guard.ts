// src/app/core/guards/role.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthStore } from '../services/auth.store';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  const requiredGroup = route.data['requiredGroup'] as string;

  const user = auth.user();
  const tokenExists = !!auth.token();

  // Сначала проверяем авторизацию
  if (!tokenExists || !user) {
    console.log('[RoleGuard] Пользователь не залогинен, редирект на /login');
    return router.parseUrl('/auth/login');
  }

  // Если группа обязательна, проверяем
  if (requiredGroup && !user.groups?.includes(requiredGroup)) {
    console.log(`[RoleGuard] Нет нужной группы (${requiredGroup}), редирект на /dashboard`);
    return router.parseUrl('/dashboard'); // или страница "Access Denied"
  }

  console.log('[RoleGuard] Доступ разрешен');
  return true;
};
