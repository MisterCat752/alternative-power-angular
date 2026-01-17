export interface CartItem {
  name: string;
  sku: string;
  unitPrice: number; // для упрощения будем хранить как number
  quantity: number;
  total: number;
}

export interface Cart {
  id: number;
  customerEmail: string;
  status: 'Active' | 'Inactive';
  items: CartItem[];
  totalItems: number;
  cartTotal: number;
  createdAt: string;
  updatedAt: string;
}
