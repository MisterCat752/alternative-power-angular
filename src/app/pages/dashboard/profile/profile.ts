import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileService } from '../../../core/services/profile.service';
import { UserProfile } from '../../../core/services/auth.types';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  private profileService = inject(ProfileService);

  profile$: Observable<UserProfile> | null = null;
  avatarUrl$!: Observable<string | null>;
  ngOnInit() {
    this.profile$ = this.profileService.loadProfile();
    this.avatarUrl$ = this.profile$?.pipe(
      map((profile) => {
        if (!profile?.avatar) return null;
        return profile.avatar.startsWith('http')
          ? profile.avatar
          : `${environment.mediaUrl}${profile.avatar}`;
      }),
      tap((url) => console.log('Avatar URL:', url))
    );
  }
}
