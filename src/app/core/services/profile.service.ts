import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AuthStore } from './auth.store';
import { UserProfile } from './auth.types';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private auth = inject(AuthStore);
  private baseUrl = environment.baseUrl;

  loadProfile() {
    return this.http
      .get<UserProfile>(`${this.baseUrl}/users/me/`)
      .pipe(tap((user) => this.auth.setUser(user)));
  }

  updateProfile(data: any) {
    return this.http
      .patch<UserProfile>(`${this.baseUrl}/users/me/`, data)
      .pipe(tap((user) => this.auth.setUser(user)));
  }
}
