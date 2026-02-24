export interface OrderProduct {
  id: number;
  sku: string;
  unit_price: number;
  quantity: number;
  total: number;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface OrderDetails {
  id: number;
  code: string;
  status: 'processing' | 'draft' | 'cancelled' | 'pending' | 'completed';
  date: string;
  currency: string;
  total: number;
  subtotal: number;
  items: OrderProduct[];
  customer: OrderCustomer;
  shipping: {
    email: string;
    phone: string;
    address: string;
  };
}
