import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebar } from '../../sidebar/dashboard-sidebar/dashboard-sidebar';
import { ProfileService } from '../../../../core/services/profile.service';
import { AuthStore } from '../../../../core/services/auth.store';
import { tap } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, DashboardSidebar, CommonModule],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout implements OnInit {
  private profileService = inject(ProfileService);
  authStore = inject(AuthStore);
  ngOnInit() {
    this.profileService
      .loadProfile()
      .pipe(tap((profile) => console.log('Profile from API (tap):', profile)))
      .subscribe({
        error: (err) => {
          if (err.status === 403) {
            console.error('Email not verified');
          }
        },
      });
  }
}
