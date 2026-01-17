// core/models/offers/offer.model.ts
export interface OfferItem {
  sku: string;
  name: string;
  qty: number;
  unit_price: number;
  discount?: number;
  total: number;
  group: string;
}

export interface OfferDetails {
  id: number;
  code: string;
  version: string;
  created_at: string;
  valid_until: string;
  status: 'Draft' | 'Expired' | 'Approved';
  project_name: string;
  project_owner: string;
  created_by: string;
  items: OfferItem[];
  subtotal?: number;
  total: number;
}
