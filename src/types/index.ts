export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  gender: 'men' | 'women' | 'unisex';
  category: 'running' | 'basketball' | 'lifestyle' | 'training';
  sizes: number[];
  colors: string[];
  images: string[];
  description: string;
  tags: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  size: number;
  color: string;
  price: number;
  image: string;
  quantity: number;
  reservedAt?: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: number;
  stripePaymentIntentId?: string;
}

export interface AISearchResult {
  productIds: string[];
  explanation: string;
}

export interface TryOnResult {
  feedback: string;
  fitScore: number;
  recommendation: string;
}
