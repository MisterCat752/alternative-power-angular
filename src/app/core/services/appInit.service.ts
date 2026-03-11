import { inject, Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { ProfileService } from './profile.service';
import { firstValueFrom, catchError, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  private authStore = inject(AuthStore);
  private profileService = inject(ProfileService);

  init(): Promise<void> {
    const token = this.authStore.token();
    const user = this.authStore.user();

    if (!token) return Promise.resolve();
    if (user) return Promise.resolve();

    // эмуляция запроса профиля
    return firstValueFrom(
      this.profileService.loadProfile().pipe(
        tap((profile) => this.authStore.setUser(profile)),
        catchError(() => {
          this.authStore.logout();
          return of(null);
        }),
      ),
    ).then(() => void 0);
  }
}
