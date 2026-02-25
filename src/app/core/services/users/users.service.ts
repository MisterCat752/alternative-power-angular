// users.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import {
  PaginatedResponse,
  UpdateUserPayload,
  User,
  UserGroup,
} from '../../models/users/user.model';
export interface CreateUserPayload {
  email: string;
  phone?: string;
  first_name: string;
  last_name: string;
  account_type: string;
  company_name?: string;
  password: string;
  is_active: boolean;
  groups: string[];
}
export interface UsersQuery {
  page?: number;
  page_size?: number;
  search?: string;
  groups?: UserGroup[]; // фильтр по группам
}

export type UserDetail = {
  id: string;

  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;

  account_type: 'individual' | 'company' | string;

  avatar: string | null;

  groups: string[];

  is_active: boolean;
  is_staff: boolean;

  is_email_verified: boolean;
  email_verified_at: string | null;

  date_joined: string; // ISO string
};

import { delay } from 'rxjs/operators';

import { USERS_MOCK } from '../../mock/users.mock';

export interface UsersQuery {
  page?: number;
  page_size?: number;
  search?: string;
  groups?: UserGroup[];
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: UserDetail[] = [...USERS_MOCK];

  /* =======================
     GET USERS (LIST)
  ======================= */
  getUsers(query: UsersQuery = {}): Observable<PaginatedResponse<User>> {
    let data = [...this.users];

    // search
    if (query.search) {
      const s = query.search.toLowerCase();
      data = data.filter(
        (u) =>
          u.email.toLowerCase().includes(s) ||
          u.first_name.toLowerCase().includes(s) ||
          u.last_name.toLowerCase().includes(s),
      );
    }

    // groups filter
    if (query.groups?.length) {
      data = data.filter((u) => u.groups.some((g) => query.groups!.includes(g as UserGroup)));
    }

    const page = query.page ?? 1;
    const pageSize = query.page_size ?? 25;

    const start = (page - 1) * pageSize;
    const paginated = data.slice(start, start + pageSize);

    // 👇 приводим к User (если User меньше чем UserDetail — это ок)
    const results: User[] = paginated as unknown as User[];

    return of({
      count: data.length,
      next: null,
      previous: null,
      results,
    }).pipe(delay(400));
  }

  /* =======================
     GET USER DETAIL
  ======================= */
  getUserByDetail(id: string): Observable<UserDetail> {
    const user = this.users.find((u) => u.id === id)!;
    return of({ ...user }).pipe(delay(300));
  }

  /* =======================
     UPDATE USER
  ======================= */
  updateLocalUser(id: string, patch: Partial<UserDetail>) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return;

    this.users[index] = {
      ...this.users[index],
      ...patch,
    };
  }

  activateUser(id: string) {
    this.updateLocalUser(id, { is_active: true });
    return of(true).pipe(delay(300));
  }
  createUser(payload: CreateUserPayload): Observable<UserDetail> {
    const newUser: UserDetail = {
      id: crypto.randomUUID(),

      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone ?? null,

      account_type: payload.account_type,
      avatar: null,

      groups: payload.groups,

      is_active: payload.is_active,
      is_staff: payload.groups.includes('Admin'),

      is_email_verified: false,
      email_verified_at: null,

      date_joined: new Date().toISOString(),
    };

    this.users.unshift(newUser);

    return of(newUser).pipe(delay(400));
  }

  /* =======================
   UPDATE USER
======================= */
  updateUser(id: string, patch: Partial<UserDetail>): Observable<UserDetail> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    this.users[index] = {
      ...this.users[index],
      ...patch,
    };

    return of(this.users[index]).pipe(delay(400));
  }
  deactivateUser(id: string) {
    this.updateLocalUser(id, { is_active: false });
    return of(true).pipe(delay(300));
  }

  emailVerify(id: string) {
    this.updateLocalUser(id, {
      is_email_verified: true,
      email_verified_at: new Date().toISOString(),
    });
    return of(true).pipe(delay(300));
  }

  updateUserRoles(userId: string, roles: UserGroup[]) {
    this.updateLocalUser(userId, { groups: roles });
    return of(true).pipe(delay(300));
  }
}
