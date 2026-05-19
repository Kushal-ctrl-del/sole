import { CartItem } from '../types';

const CART_KEY = 'sole_cart';

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const addToCart = (item: CartItem): void => {
  const cart = getCart();
  const existing = cart.findIndex(
    c => c.productId === item.productId && c.size === item.size && c.color === item.color
  );
  if (existing >= 0) {
    cart[existing].quantity += 1;
  } else {
    cart.push({ ...item, reservedAt: Date.now() });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeFromCart = (productId: string, size: number, color: string): void => {
  const cart = getCart().filter(
    c => !(c.productId === productId && c.size === size && c.color === color)
  );
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const updateQuantity = (productId: string, size: number, color: string, quantity: number): void => {
  if (quantity <= 0) {
    removeFromCart(productId, size, color);
    return;
  }
  const cart = getCart();
  const idx = cart.findIndex(c => c.productId === productId && c.size === size && c.color === color);
  if (idx >= 0) {
    cart[idx].quantity = quantity;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

export const getCartTotal = (): number => {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getCartCount = (): number => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};

export const isReservationValid = (reservedAt: number): boolean => {
  const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000;
  return Date.now() - reservedAt < FORTY_EIGHT_HOURS;
};

export const getTimeRemaining = (reservedAt: number): string => {
  const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000;
  const remaining = FORTY_EIGHT_HOURS - (Date.now() - reservedAt);
  if (remaining <= 0) return 'Expired';
  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${minutes}m`;
};
