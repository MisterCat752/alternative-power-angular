import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';
import { UserProfile } from './auth.types';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private auth = inject(AuthStore);

  private API_URL = 'http://192.168.0.150:8000/api/users/me/';

  loadProfile() {
    // ❗ никаких токенов, никаких headers
    return this.http.get<UserProfile>(this.API_URL).pipe(
      tap((user) => {
        this.auth.setUser(user);
      })
    );
  }
}
