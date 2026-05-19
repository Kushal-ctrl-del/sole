import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
  animationDelay?: number;
}

export default function ProductCard({ product, onQuickAdd, animationDelay = 0 }: ProductCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <div
      className="group relative bg-sole-surface border border-sole-border rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(245,166,35,0.15)] transition-all duration-300"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <span className="px-2 py-0.5 bg-sole-amber text-sole-black text-xs font-bold font-body rounded uppercase tracking-wider">
            New
          </span>
        )}
        {product.isSale && (
          <span className="px-2 py-0.5 bg-sole-coral text-white text-xs font-bold font-body rounded uppercase tracking-wider">
            Sale
          </span>
        )}
      </div>

      {/* Quick Add */}
      {onQuickAdd && (
        <button
          onClick={(e) => { e.preventDefault(); onQuickAdd(product); }}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-sole-black/80 backdrop-blur-sm border border-sole-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-sole-amber hover:border-sole-amber hover:text-sole-black text-sole-white"
        >
          <ShoppingBag size={14} />
        </button>
      )}

      <Link to={`/product/${product.id}`}>
        {/* Image */}
        <div className="aspect-square bg-sole-hover overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="font-body text-xs text-sole-amber uppercase tracking-wider mb-1">{product.brand}</p>
          <h3 className="font-display text-xl text-sole-white tracking-wide mb-2 leading-tight">{product.name}</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-body text-base font-semibold text-sole-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-body text-sm text-sole-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.isSale && product.originalPrice && (
              <span className="font-body text-xs text-sole-coral font-medium">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 mt-2">
            <Sparkles size={10} className="text-sole-muted" />
            <span className="font-body text-xs text-sole-muted capitalize">{product.category}</span>
            <span className="text-sole-border mx-1">·</span>
            <span className="font-body text-xs text-sole-muted capitalize">{product.gender}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
