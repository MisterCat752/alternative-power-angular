import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProfileService } from '../../../core/services/profile.service';
import { UserProfile } from '../../../core/services/auth.types';
import { AvatarService } from '../../../core/services/profile/avatar.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  profileForm: FormGroup;
  user!: UserProfile;
  editing = false;

  languages = [
    { code: 'en', label: 'English' },
    { code: 'ro', label: 'Română' },
    { code: 'ru', label: 'Русский' },
  ];

  accountTypes: Array<'individual' | 'company'> = ['individual', 'company'];

  constructor(
    private profileService: ProfileService,
    private avatarService: AvatarService,
    private fb: FormBuilder
  ) {
    // создаём форму сразу, чтобы Angular не ругался на отсутствующий FormControl
    this.profileForm = this.fb.group({
      first_name: [{ value: '', disabled: true }],
      last_name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      preferred_language: [{ value: '', disabled: true }],
      account_type: [{ value: '', disabled: true }],
      company_name: [''],
      company_reg_no: [''],
      company_vat_id: [''],
    });
  }

  ngOnInit(): void {
    this.profileService.loadProfile().subscribe((user) => {
      this.user = user;
      this.profileForm.patchValue(user);
    });
  }

  toggleEdit(): void {
    this.editing = !this.editing;

    Object.entries(this.profileForm.controls).forEach(([key, control]) => {
      if (key !== 'email') {
        this.editing ? control.enable() : control.disable();
      }
    });

    if (!this.editing) {
      this.profileForm.patchValue(this.user); // откат изменений
    }
  }

  saveChanges(): void {
    if (!this.profileForm.valid) return;

    const payload = this.profileForm.getRawValue();

    this.profileService.updateProfile(payload).subscribe((user) => {
      this.user = user;
      this.editing = false;
      this.profileForm.patchValue(user); // обновляем форму
    });
  }

  get avatarUrl(): string | null {
    if (!this.user?.avatar) return null;

    return this.user.avatar.startsWith('http')
      ? this.user.avatar
      : `${environment.mediaUrl}${this.user.avatar}`;
  }

  updateAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.avatarService.updateAvatar(file).subscribe({
      next: (user) => {
        this.user = user;
        this.profileForm.patchValue(user); // обновляем форму, если нужно
      },
      error: (err) => {
        console.error('Avatar upload error', err);
      },
    });
  }
}
