// user.model.ts
export interface User {
  id: string;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_active: boolean;
  is_email_verified: boolean;
  email_verified_at: string | null;
  date_joined: string;
  is_staff: boolean;
  groups: string[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type UserGroup = 'Customer' | 'Manager' | 'Admin';

export interface UpdateUserPayload {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;

  /** ВАЖНО: для обновления ролей */
  groups_input?: UserGroup[];
}
