import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileService } from '../../../core/services/profile.service';
import { UserProfile } from '../../../core/services/auth.types';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthStore } from '../../../core/services/auth.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  private profileService = inject(ProfileService);
  private authStore = inject(AuthStore);
  profile$: Observable<UserProfile> | null = null;
  ngOnInit() {
    this.profile$ = this.profileService.loadProfile();
  }
  // Avatar можно использовать напрямую из computed signal
  get avatarUrl() {
    return this.authStore.avatarUrl();
  }
}
