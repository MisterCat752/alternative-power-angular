import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDetail, UsersService } from '../../../../../core/services/users/users.service';
import { User } from '../../../../../core/models/users/user.model';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-page.html',
})
export class UserDetailPage {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  user = signal<UserDetail | null>(null);
  loading = signal(true);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;

      this.loading.set(true);

      this.usersService.getUserByDetail(id).subscribe({
        next: (user) => {
          this.user.set(user);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
    });
  }

  activate() {
    const user = this.user();
    if (!user) return;

    this.usersService.activateUser(user.id).subscribe(() => {
      this.user.update((u) => (u ? { ...u, is_active: true } : u));
    });
  }

  deactivate() {
    const user = this.user();
    if (!user) return;

    this.usersService.deactivateUser(user.id).subscribe(() => {
      this.user.update((u) => (u ? { ...u, is_active: false } : u));
    });
  }
}
