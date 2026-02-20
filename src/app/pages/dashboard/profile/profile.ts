import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../../core/services/auth.types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  profile$ = signal<UserProfile | null>(null);

  ngOnInit() {
    // Моковые данные
    const mockProfile: UserProfile = {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '+373 123 456 789',
      preferred_language: 'en',
      date_joined: new Date().toISOString(),
      email_verified_at: new Date().toISOString(),
      account_type: 'company',
      company_name: 'Acme Corp',
      company_reg_no: '12345678',
      company_vat_id: 'VAT123456',
      is_email_verified: true,
      is_manager: true,
      is_staff: false,
      groups: ['Admin', 'Sales'],
      avatar: 'https://i.pravatar.cc/150?img=8',
    };

    this.profile$.set(mockProfile);
  }

  // Если нужен computed avatar
  get avatarUrl() {
    return this.profile$()?.avatar ?? null;
  }
}
