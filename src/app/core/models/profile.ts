export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  preferred_language: string;
  avatar: string | null;
  account_type: 'individual' | 'company';
  company_name?: string;
  company_vat_id?: string;
  company_reg_no?: string;
  is_email_verified: boolean;
  email_verified_at: string | null; // <-- null вместо undefined
  date_joined: string;
  is_staff: boolean;
  is_active: boolean;
  is_manager: boolean;
  groups: string[];
}
