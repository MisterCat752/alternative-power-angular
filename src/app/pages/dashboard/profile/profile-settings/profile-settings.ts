import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../../../core/services/auth.types';
import { ProfileService } from '../../../../core/services/profile.service';
import { AvatarService } from '../../../../core/services/profile/avatar.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-settings.html',
})
export class ProfileSettings implements OnInit {
  profileForm: FormGroup;
  user!: UserProfile;

  languages = [
    { code: 'en', label: 'English' },
    { code: 'ro', label: 'Română' },
    { code: 'ru', label: 'Русский' },
  ];

  accountTypes: Array<'individual' | 'company'> = ['individual', 'company'];

  constructor(
    private profileService: ProfileService,
    private avatarService: AvatarService,
    private fb: FormBuilder,
  ) {
    this.profileForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [{ value: '', disabled: true }],
      phone: [''],
      preferred_language: [''],
      account_type: [''],
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

  saveChanges(): void {
    if (!this.profileForm.valid) return;

    const payload = this.profileForm.getRawValue();
    this.profileService.updateProfile(payload).subscribe((user) => {
      this.user = user;
      this.profileForm.patchValue(user); // обновляем форму после сохранения
    });
  }
}
