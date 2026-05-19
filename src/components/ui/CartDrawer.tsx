import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../../types';
import { removeFromCart, updateQuantity } from '../../lib/cart';
import ReservationTimer from './ReservationTimer';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdate: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdate }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleRemove = (item: CartItem) => {
    removeFromCart(item.productId, item.size, item.color);
    onUpdate();
  };

  const handleQty = (item: CartItem, delta: number) => {
    updateQuantity(item.productId, item.size, item.color, item.quantity + delta);
    onUpdate();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-sole-surface border-l border-sole-border z-[70] flex flex-col transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sole-border">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-sole-amber" />
            <h2 className="font-display text-xl text-sole-white tracking-wider">Your Bag</h2>
            {items.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-sole-amber text-sole-black text-xs font-bold rounded-full font-body">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 text-sole-muted hover:text-sole-white transition-colors rounded-lg hover:bg-sole-hover">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div className="w-16 h-16 rounded-full bg-sole-hover flex items-center justify-center">
                <ShoppingBag size={28} className="text-sole-muted" />
              </div>
              <p className="font-display text-2xl text-sole-white tracking-wider">Your bag is empty</p>
              <p className="font-body text-sm text-sole-muted">Add some heat to your bag</p>
              <Link
                to="/shop"
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-sole-amber text-sole-black font-body font-semibold text-sm rounded-lg hover:bg-sole-amber/90 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 p-4 bg-sole-hover rounded-xl border border-sole-border">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-sole-surface">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs text-sole-amber mb-0.5">{item.brand}</p>
                  <p className="font-display text-base text-sole-white tracking-wide leading-tight truncate">{item.name}</p>
                  <p className="font-body text-xs text-sole-muted mt-0.5">Size {item.size} · {item.color}</p>
                  {item.reservedAt && <div className="mt-1"><ReservationTimer reservedAt={item.reservedAt} /></div>}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border border-sole-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleQty(item, -1)}
                        className="w-7 h-7 flex items-center justify-center text-sole-muted hover:text-sole-white hover:bg-sole-surface transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-body text-sm text-sole-white w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQty(item, 1)}
                        className="w-7 h-7 flex items-center justify-center text-sole-muted hover:text-sole-white hover:bg-sole-surface transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-body text-sm font-semibold text-sole-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => handleRemove(item)}
                        className="p-1.5 text-sole-muted hover:text-sole-coral transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-sole-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-sole-muted">Subtotal</span>
              <span className="font-display text-2xl text-sole-white tracking-wide">{formatPrice(total)}</span>
            </div>
            <p className="font-body text-xs text-sole-muted">Shipping & taxes calculated at checkout</p>
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full py-3.5 bg-sole-amber text-sole-black text-center font-body font-bold text-sm rounded-xl hover:bg-sole-amber/90 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(245,166,35,0.4)]"
            >
              Checkout — {formatPrice(total)}
            </Link>
            <Link
              to="/cart"
              onClick={onClose}
              className="block w-full py-3 border border-sole-border text-sole-white text-center font-body text-sm rounded-xl hover:border-sole-amber/40 transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
