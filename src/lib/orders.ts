import { Order, CartItem } from '../types';

const ORDERS_KEY = 'sole_orders';

export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(ORDERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveOrder = (items: CartItem[], total: number, paymentIntentId?: string): Order => {
  const orders = getOrders();
  const order: Order = {
    id: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    items,
    total,
    status: paymentIntentId ? 'paid' : 'pending',
    createdAt: Date.now(),
    stripePaymentIntentId: paymentIntentId,
  };
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return order;
};
