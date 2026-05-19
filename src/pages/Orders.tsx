import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Package, CheckCircle, Clock, XCircle, ShoppingBag } from 'lucide-react';
import { getOrders } from '../lib/orders';
import { Order } from '../types';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchParams] = useSearchParams();
  const newOrderId = searchParams.get('new');

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const StatusIcon = ({ status }: { status: Order['status'] }) => {
    if (status === 'paid') return <CheckCircle size={14} className="text-green-400" />;
    if (status === 'cancelled') return <XCircle size={14} className="text-sole-coral" />;
    return <Clock size={14} className="text-sole-amber" />;
  };

  const statusLabel = (status: Order['status']) => {
    if (status === 'paid') return 'Confirmed';
    if (status === 'cancelled') return 'Cancelled';
    return 'Pending';
  };

  const statusColor = (status: Order['status']) => {
    if (status === 'paid') return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (status === 'cancelled') return 'text-sole-coral bg-sole-coral/10 border-sole-coral/20';
    return 'text-sole-amber bg-sole-amber/10 border-sole-amber/20';
  };

  return (
    <main className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Package size={24} className="text-sole-amber" />
          <h1 className="font-display text-5xl text-sole-white tracking-tight">Order History</h1>
        </div>

        {orders.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-sole-surface border border-sole-border flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-sole-muted" />
            </div>
            <h2 className="font-display text-3xl text-sole-white mb-3">No orders yet</h2>
            <p className="font-body text-sm text-sole-muted mb-8">Place your first order to see it here</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sole-amber text-sole-black font-body font-bold text-sm rounded-xl hover:bg-sole-amber/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => (
              <div
                key={order.id}
                className={`p-6 bg-sole-surface border rounded-2xl transition-all duration-500 ${
                  order.id === newOrderId ? 'border-green-400/40 shadow-[0_0_32px_rgba(74,222,128,0.1)]' : 'border-sole-border'
                } animate-fade-up opacity-0`}
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {order.id === newOrderId && (
                  <div className="flex items-center gap-2 mb-4 p-3 bg-green-400/10 border border-green-400/20 rounded-xl">
                    <CheckCircle size={14} className="text-green-400" />
                    <p className="font-body text-xs text-green-400 font-medium">Order placed successfully! Your sneakers are on their way.</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <div>
                    <p className="font-body text-xs text-sole-muted mb-1">Order ID</p>
                    <p className="font-body text-sm font-semibold text-sole-white">{order.id}</p>
                    <p className="font-body text-xs text-sole-muted mt-1">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full ${statusColor(order.status)}`}>
                      <StatusIcon status={order.status} />
                      <span className="font-body text-xs font-medium">{statusLabel(order.status)}</span>
                    </div>
                    <span className="font-display text-2xl text-sole-amber tracking-wide">{formatPrice(order.total)}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {order.items.map(item => (
                    <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3 p-3 bg-sole-hover border border-sole-border rounded-xl">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-sole-surface">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-body text-xs text-sole-amber truncate">{item.brand}</p>
                        <p className="font-body text-xs text-sole-white truncate">{item.name}</p>
                        <p className="font-body text-xs text-sole-muted">Sz {item.size} · ×{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
