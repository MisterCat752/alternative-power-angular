export interface Warranty {
  id: number;
  name: string;
  provider: 'seller' | 'manufacturer' | string;
  durationYears: number;
  serviceType: 'on_site' | 'carry_in' | string;
  termsUrl?: string;
  notes?: string;
}
