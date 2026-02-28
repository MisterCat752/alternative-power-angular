import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../../core/services/auth.store';
import { UserProfile } from '../../../core/services/auth.types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
})
export class Profile {
  constructor(private authStore: AuthStore) {}

  // signal с профилем пользователя, реактивно получаем из стора
  profile$ = computed<UserProfile | null>(() => this.authStore.user());

  // computed аватар
  avatarUrl = computed<string>(() =>
    this.profile$()?.avatar ? 'https://i.pravatar.cc/150?img=8' : 'https://i.pravatar.cc/150?img=8',
  );

  // computed имя для отображения
  fullName = computed(() => {
    const profile = this.profile$();
    return profile ? `${profile.first_name} ${profile.last_name}` : '';
  });

  email = computed(() => this.profile$()?.email ?? '');
  phone = computed(() => this.profile$()?.phone ?? '');
  accountType = computed(() => this.profile$()?.account_type ?? '');
  groups = computed(() => this.profile$()?.groups.join(', ') ?? '');
}
