// users.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
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

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  createUser(payload: CreateUserPayload) {
    return this.http.post(`${this.baseUrl}/auth/register/`, payload);
  }

  getUsers(query: UsersQuery = {}): Observable<PaginatedResponse<User>> {
    let params = new HttpParams();

    if (query.page) params = params.set('page', query.page);
    if (query.page_size) params = params.set('page_size', query.page_size);
    if (query.search) params = params.set('search', query.search);

    if (query.groups?.length) {
      query.groups.forEach((g) => (params = params.append('groups', g)));
    }

    return this.http.get<PaginatedResponse<User>>(`${this.baseUrl}/manage/users/`, { params });
  }

  /** PATCH user */
  getUserById(id: string) {
    return this.http.get<User>(`${this.baseUrl}/manage/users/${id}/`);
  }
  getUserByDetail(id: string) {
    return this.http.get<UserDetail>(`${this.baseUrl}/manage/users/${id}/`);
  }

  updateUser(
    id: string,
    payload: {
      first_name?: string;
      last_name?: string;
      phone?: string;
      is_active?: boolean;
      account_type?: string;
      company_name?: string;
      is_email_verified?: boolean;
      groups_input?: string[];
    }
  ) {
    return this.http.patch(`${this.baseUrl}/manage/users/${id}/`, payload);
  }

  activateUser(userId: string) {
    return this.updateUser(userId, { is_active: true });
  }
  emailVerify(userId: string) {
    return this.updateUser(userId, { is_email_verified: true });
  }

  deactivateUser(userId: string) {
    return this.updateUser(userId, { is_active: false });
  }

  updateUserRoles(userId: string, roles: UserGroup[]) {
    return this.updateUser(userId, { groups_input: roles });
  }
}
