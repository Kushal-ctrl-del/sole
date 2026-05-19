import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '../../lib/products';
import ProductCard from '../ui/ProductCard';
import { Product } from '../../types';

interface FeaturedDropsProps {
  onQuickAdd?: (product: Product) => void;
}

export default function FeaturedDrops({ onQuickAdd }: FeaturedDropsProps) {
  const featured = getFeaturedProducts();

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-body text-xs text-sole-amber uppercase tracking-widest mb-2">This Week</p>
          <h2 className="font-display text-5xl sm:text-6xl text-sole-white tracking-tight">Featured Drops</h2>
        </div>
        <Link
          to="/shop"
          className="hidden sm:flex items-center gap-2 font-body text-sm text-sole-muted hover:text-sole-amber transition-colors group"
        >
          View all
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {featured.map((product, i) => (
          <div key={product.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}>
            <ProductCard product={product} onQuickAdd={onQuickAdd} />
          </div>
        ))}
      </div>

      <div className="flex sm:hidden justify-center mt-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 border border-sole-border text-sole-white font-body text-sm rounded-xl hover:border-sole-amber/40 transition-colors"
        >
          View all sneakers <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
