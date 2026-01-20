export interface CartItem {
  id?: number;
  name: string;
  sku: string;
  unitPrice: number; // для упрощения будем хранить как number
  quantity: number;
  total: number;
  image?: string | null; // если используем ImageInput
  images?: string[];
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
