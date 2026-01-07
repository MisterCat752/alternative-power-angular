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
  account_type: 'individual' | 'company' | string;
  date_joined: string; // ISO-string from backend
  email: string;
  email_verified_at: string | null; // ISO-string or null
  first_name: string;
  groups: string[]; // e.g. ['Customer']
  id: string; // UUID
  is_email_verified: boolean;
  is_manager: boolean;
  is_staff: boolean;
  last_name: string;
  preferred_language: string;
  // allow extra fields from backend
  [key: string]: unknown;
}
