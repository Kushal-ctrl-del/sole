import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, Loader2, ShoppingBag } from 'lucide-react';
import { getCart, getCartTotal, clearCart } from '../lib/cart';
import { saveOrder } from '../lib/orders';
import { CartItem } from '../types';

interface CheckoutProps {
  onCartUpdate: () => void;
}

export default function Checkout({ onCartUpdate }: CheckoutProps) {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    setItems(getCart());
    setTotal(getCartTotal());
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let val = value;

    if (name === 'cardNumber') {
      val = value.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();
    } else if (name === 'expiry') {
      val = value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
    } else if (name === 'cvv') {
      val = value.replace(/\D/g, '').substring(0, 3);
    } else if (name === 'pincode') {
      val = value.replace(/\D/g, '').substring(0, 6);
    }

    setForm(prev => ({ ...prev, [name]: val }));
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
      setError('Please fill in all delivery details');
      return false;
    }
    if (form.cardNumber.replace(/\s/g, '').length < 16) {
      setError('Please enter a valid card number');
      return false;
    }
    if (form.expiry.length < 5) {
      setError('Please enter a valid expiry date');
      return false;
    }
    if (form.cvv.length < 3) {
      setError('Please enter a valid CVV');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setLoading(true);
    // Simulate payment processing (no real Stripe needed for demo)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order = saveOrder(items, total * 1.18, `pi_demo_${Date.now()}`);
    clearCart();
    onCartUpdate();
    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      navigate(`/orders?new=${order.id}`);
    }, 2500);
  };

  if (items.length === 0 && !success) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="text-sole-muted mx-auto mb-4" />
          <h2 className="font-display text-3xl text-sole-white mb-3">Your bag is empty</h2>
          <button onClick={() => navigate('/shop')} className="font-body text-sole-amber hover:underline">
            Go shopping
          </button>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-up">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h2 className="font-display text-5xl text-sole-white mb-3 tracking-tight">Order Confirmed!</h2>
          <p className="font-body text-sole-muted mb-2">Your sneakers are on their way.</p>
          <p className="font-body text-xs text-sole-muted">Redirecting to your orders...</p>
        </div>
      </main>
    );
  }

  const inputClass = "w-full bg-sole-hover border border-sole-border text-sole-white placeholder-sole-muted font-body text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-sole-amber/50 transition-colors";

  return (
    <main className="pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Lock size={20} className="text-sole-amber" />
          <h1 className="font-display text-5xl text-sole-white tracking-tight">Checkout</h1>
          <span className="font-body text-xs text-green-400 border border-green-400/30 px-2 py-1 rounded-full">Secure</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery */}
              <section className="p-6 bg-sole-surface border border-sole-border rounded-2xl">
                <h2 className="font-display text-2xl text-sole-white tracking-wide mb-5">Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="font-body text-xs text-sole-muted uppercase tracking-wider block mb-2">Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Rahul Sharma" className={inputClass} />
                  </div>
                  <div>
                    <label className="font-body text-xs text-sole-muted uppercase tracking-wider block mb-2">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="rahul@example.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="font-body text-xs text-sole-muted uppercase tracking-wider block mb-2">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-body text-xs text-sole-muted uppercase tracking-wider block mb-2">Address</label>
                    <input name="address" value={form.address} onChange={handleChange} placeholder="123, MG Road, Bengaluru" className={inputClass} />
                  </div>
                  <div>
                    <label className="font-body text-xs text-sole-muted uppercase tracking-wider block mb-2">City</label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="Mumbai" className={inputClass} />
                  </div>
                  <div>
                    <label className="font-body text-xs text-sole-muted uppercase tracking-wider block mb-2">PIN Code</label>
                    <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="400001" className={inputClass} maxLength={6} />
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="p-6 bg-sole-surface border border-sole-border rounded-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <CreditCard size={18} className="text-sole-amber" />
                  <h2 className="font-display text-2xl text-sole-white tracking-wide">Payment</h2>
                </div>

                <div className="mb-4 p-3 bg-sole-amber/10 border border-sole-amber/20 rounded-xl">
                  <p className="font-body text-xs text-sole-amber">
                    Test card: <span className="font-bold">4242 4242 4242 4242</span> · Any future date · Any CVV
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="font-body text-xs text-sole-muted uppercase tracking-wider block mb-2">Card Number</label>
                    <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242" className={inputClass} maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-sole-muted uppercase tracking-wider block mb-2">Expiry</label>
                      <input name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" className={inputClass} maxLength={5} />
                    </div>
                    <div>
                      <label className="font-body text-xs text-sole-muted uppercase tracking-wider block mb-2">CVV</label>
                      <input name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" className={inputClass} maxLength={3} type="password" />
                    </div>
                  </div>
                </div>
              </section>

              {error && (
                <p className="font-body text-sm text-sole-coral px-1">{error}</p>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky top-24 p-6 bg-sole-surface border border-sole-border rounded-2xl space-y-4">
                <h2 className="font-display text-2xl text-sole-white tracking-wide">Summary</h2>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-sole-hover border border-sole-border">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-xs text-sole-white truncate">{item.name}</p>
                        <p className="font-body text-xs text-sole-muted">Sz {item.size} · ×{item.quantity}</p>
                      </div>
                      <span className="font-body text-xs text-sole-white flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-sole-border pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-sole-muted">Subtotal</span>
                    <span className="font-body text-sm text-sole-white">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-sole-muted">GST (18%)</span>
                    <span className="font-body text-sm text-sole-white">{formatPrice(total * 0.18)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-sole-muted">Shipping</span>
                    <span className="font-body text-sm text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-sole-border">
                    <span className="font-body font-semibold text-sole-white">Total</span>
                    <span className="font-display text-2xl text-sole-amber tracking-wide">{formatPrice(total * 1.18)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-sole-amber text-sole-black font-body font-bold text-sm rounded-xl hover:bg-sole-amber/90 transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 hover:shadow-[0_4px_24px_rgba(245,166,35,0.5)]"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Processing...</>
                  ) : (
                    <><Lock size={14} /> Place Order — {formatPrice(total * 1.18)}</>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2">
                  <Lock size={11} className="text-sole-muted" />
                  <p className="font-body text-xs text-sole-muted">Secured by 256-bit SSL</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
