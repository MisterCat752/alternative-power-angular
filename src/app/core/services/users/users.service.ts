// users.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PaginatedResponse, User, UserGroup } from '../../models/users/user.model';
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

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  // users.service.ts
  createUser(payload: CreateUserPayload) {
    return this.http.post(`${this.baseUrl}/auth/register/`, payload);
  }
  getUsers(query: UsersQuery = {}): Observable<PaginatedResponse<User>> {
    let params = new HttpParams();

    if (query.page) {
      params = params.set('page', query.page);
    }

    if (query.page_size) {
      params = params.set('page_size', query.page_size);
    }

    if (query.search) {
      params = params.set('search', query.search);
    }

    /**
     * Django обычно принимает:
     * ?groups=Customer&groups=Manager
     */
    if (query.groups?.length) {
      query.groups.forEach((group) => {
        params = params.append('group', group);
      });
    }

    return this.http.get<PaginatedResponse<User>>(`${this.baseUrl}/manage/users/`, { params });
  }
}
