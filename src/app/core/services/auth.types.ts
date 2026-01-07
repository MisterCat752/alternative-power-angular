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
  username?: string;

  is_manager: boolean;
  groups: string[];
}
