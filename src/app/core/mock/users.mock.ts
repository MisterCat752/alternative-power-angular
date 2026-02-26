// src/app/core/mocks/users.mock.ts

import { UserDetail } from '../services/users/users.service';
import { User } from '../models/users/user.model';

export const USERS_MOCK: UserDetail[] = [
  {
    id: '1',
    first_name: 'Ivan',
    last_name: 'Petrov',
    email: 'admin@gmail.com',
    password: '123456',
    phone: '+37360000001',
    account_type: 'individual',
    avatar: null,
    groups: ['Admin'],
    is_active: true,
    is_staff: true,
    is_email_verified: true,
    email_verified_at: '2025-01-01T10:00:00Z',
    date_joined: '2024-12-01T10:00:00Z',
  },
  {
    id: '2',
    first_name: 'Maria',
    last_name: 'Ivanova',
    email: 'maria@test.com',

    password: '123456',
    phone: '+37360000002',
    account_type: 'individual',
    avatar: null,
    groups: ['Customer'],
    is_active: false,
    is_staff: false,
    is_email_verified: false,
    email_verified_at: null,
    date_joined: '2025-01-15T10:00:00Z',
  },
  {
    id: '3',
    first_name: 'Alex',
    last_name: 'Smirnov',
    email: 'alex@test.com',
    password: '123456',
    phone: '+37360000003',
    account_type: 'company',
    avatar: null,
    groups: ['Manager'],
    is_active: true,
    is_staff: true,
    is_email_verified: true,
    email_verified_at: '2025-02-01T10:00:00Z',
    date_joined: '2025-02-01T10:00:00Z',
  },
];
