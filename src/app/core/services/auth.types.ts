// src/app/core/services/auth.types.ts

export interface User {
  id: number;
  email: string;
  fullName?: string;
  token?: string; // если backend отдаёт JWT прямо в теле
  // другие поля
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  fullName?: string;
  preferred_language?: string;
}

export interface UserProfile {
  id: string;
  email: string;

  first_name: string;
  last_name: string;
  phone: string;
  preferred_language: string;

  account_type: 'individual' | 'company';

  company_name?: string;
  company_reg_no?: string;
  company_vat_id?: string;

  avatar: string | null;

  date_joined: string;
  email_verified_at: string | null;

  is_email_verified: boolean;
  is_manager: boolean;
  is_staff: boolean;

  groups: string[];

  [key: string]: any;
}
