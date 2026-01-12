// src/app/core/services/avatar.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthStore } from '../auth.store';
import { UserProfile } from '../auth.types';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  private http = inject(HttpClient);
  private auth = inject(AuthStore);
  private baseUrl = environment.baseUrl;

  updateAvatar(file: File, additionalData?: Record<string, any>) {
    const formData = new FormData();
    formData.append('avatar', file);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    return this.http
      .patch<UserProfile>(`${this.baseUrl}/users/me/`, formData)
      .pipe(tap((user) => this.auth.setUser(user)));
  }
}
