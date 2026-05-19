import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity } from '../lib/cart';
import { CartItem } from '../types';
import ReservationTimer from '../components/ui/ReservationTimer';

interface CartProps {
  onUpdate: () => void;
}

export default function Cart({ onUpdate }: CartProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const refresh = () => {
    setItems(getCart());
    onUpdate();
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <main className="pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={24} className="text-sole-amber" />
          <h1 className="font-display text-5xl text-sole-white tracking-tight">Your Bag</h1>
          {count > 0 && (
            <span className="px-2.5 py-1 bg-sole-amber text-sole-black text-sm font-bold font-body rounded-full">{count}</span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-sole-surface border border-sole-border flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-sole-muted" />
            </div>
            <h2 className="font-display text-3xl text-sole-white mb-3">Your bag is empty</h2>
            <p className="font-body text-sm text-sole-muted mb-8">Time to find your next pair</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sole-amber text-sole-black font-body font-bold text-sm rounded-xl hover:bg-sole-amber/90 transition-colors"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 p-5 bg-sole-surface border border-sole-border rounded-2xl hover:border-sole-border/80 transition-all">
                  <Link to={`/product/${item.productId}`} className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-sole-hover">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs text-sole-amber mb-0.5">{item.brand}</p>
                    <Link to={`/product/${item.productId}`}>
                      <h3 className="font-display text-xl text-sole-white tracking-wide hover:text-sole-amber transition-colors">{item.name}</h3>
                    </Link>
                    <p className="font-body text-xs text-sole-muted mt-0.5">Size {item.size} · {item.color}</p>
                    {item.reservedAt && <div className="mt-1.5"><ReservationTimer reservedAt={item.reservedAt} /></div>}

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 border border-sole-border rounded-xl overflow-hidden">
                        <button
                          onClick={() => { updateQuantity(item.productId, item.size, item.color, item.quantity - 1); refresh(); }}
                          className="w-9 h-9 flex items-center justify-center text-sole-muted hover:text-sole-white hover:bg-sole-hover transition-all"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="font-body text-sm text-sole-white w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => { updateQuantity(item.productId, item.size, item.color, item.quantity + 1); refresh(); }}
                          className="w-9 h-9 flex items-center justify-center text-sole-muted hover:text-sole-white hover:bg-sole-hover transition-all"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-xl text-sole-white tracking-wide">{formatPrice(item.price * item.quantity)}</span>
                        <button
                          onClick={() => { removeFromCart(item.productId, item.size, item.color); refresh(); }}
                          className="p-2 text-sole-muted hover:text-sole-coral transition-colors rounded-lg hover:bg-sole-coral/10"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/shop" className="flex items-center gap-2 text-sole-muted hover:text-sole-amber transition-colors font-body text-sm mt-4 group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Continue Shopping
              </Link>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 bg-sole-surface border border-sole-border rounded-2xl space-y-4">
                <h2 className="font-display text-2xl text-sole-white tracking-wide">Order Summary</h2>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-sole-muted">Subtotal ({count} items)</span>
                    <span className="font-body text-sm text-sole-white">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-sole-muted">Shipping</span>
                    <span className="font-body text-sm text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-sole-muted">GST (18%)</span>
                    <span className="font-body text-sm text-sole-white">{formatPrice(total * 0.18)}</span>
                  </div>
                  <div className="border-t border-sole-border pt-3 flex justify-between">
                    <span className="font-body font-semibold text-sole-white">Total</span>
                    <span className="font-display text-2xl text-sole-amber tracking-wide">{formatPrice(total * 1.18)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full py-4 bg-sole-amber text-sole-black text-center font-body font-bold text-sm rounded-xl hover:bg-sole-amber/90 transition-all duration-200 hover:shadow-[0_4px_24px_rgba(245,166,35,0.4)]"
                >
                  Proceed to Checkout
                </Link>

                <p className="font-body text-xs text-sole-muted text-center">
                  Test mode — use card 4242 4242 4242 4242
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
