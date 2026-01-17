import { inject, Injectable, signal } from '@angular/core';
import { AuthStore } from '../core/services/auth.store';
import { ProfileService } from '../core/services/profile.service';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AppInitService {
  private authStore = inject(AuthStore);
  private profileService = inject(ProfileService);

  init(): Promise<void> {
    const token = this.authStore.token();
    if (!token) return Promise.resolve(); // нет токена — не ждём

    // загружаем профиль и ждём результата
    return firstValueFrom(
      this.profileService.loadProfile().pipe(
        tap((profile) => this.authStore.setUser(profile)),
        catchError(() => {
          this.authStore.logout();
          return of(null);
        })
      )
    ).then(() => void 0);
  }
}
