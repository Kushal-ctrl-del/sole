import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Sparkles, Check, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { getProductById, products } from '../lib/products';
import { addToCart } from '../lib/cart';
import { CartItem } from '../types';
import TryOnModal from '../components/sections/TryOnModal';
import ProductCard from '../components/ui/ProductCard';

interface ProductDetailProps {
  onCartUpdate: () => void;
}

export default function ProductDetail({ onCartUpdate }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : null;

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [imgIndex, setImgIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [tryOnOpen, setTryOnOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(null);
      setImgIndex(0);
    }
  }, [product]);

  if (!product) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl text-sole-white mb-4">Product not found</p>
          <Link to="/shop" className="font-body text-sole-amber hover:underline">Back to shop</Link>
        </div>
      </main>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    const item: CartItem = {
      productId: product.id,
      name: product.name,
      brand: product.brand,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };
    addToCart(item);
    onCartUpdate();
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <main className="pt-16 min-h-screen">
      <TryOnModal
        isOpen={tryOnOpen}
        onClose={() => setTryOnOpen(false)}
        shoeName={product.name}
        shoeColor={selectedColor}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sole-muted hover:text-sole-amber transition-colors mb-8 font-body text-sm group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-sole-surface border border-sole-border rounded-2xl overflow-hidden group">
              <img
                src={product.images[imgIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex(i => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-sole-black/70 backdrop-blur-sm border border-sole-border rounded-full flex items-center justify-center text-sole-white hover:bg-sole-amber hover:border-sole-amber hover:text-sole-black opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setImgIndex(i => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-sole-black/70 backdrop-blur-sm border border-sole-border rounded-full flex items-center justify-center text-sole-white hover:bg-sole-amber hover:border-sole-amber hover:text-sole-black opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="px-2.5 py-1 bg-sole-amber text-sole-black text-xs font-bold font-body rounded uppercase">New</span>}
                {product.isSale && <span className="px-2.5 py-1 bg-sole-coral text-white text-xs font-bold font-body rounded uppercase">Sale</span>}
              </div>
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      imgIndex === i ? 'border-sole-amber' : 'border-sole-border hover:border-sole-muted'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="font-body text-sm text-sole-amber uppercase tracking-widest mb-1">{product.brand}</p>
              <h1 className="font-display text-5xl sm:text-6xl text-sole-white tracking-tight leading-none mb-3">{product.name}</h1>
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl text-sole-white">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="font-body text-lg text-sole-muted line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="px-2 py-0.5 bg-sole-coral/20 text-sole-coral text-xs font-bold font-body rounded uppercase">
                      Save {formatPrice(savings)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color */}
            <div>
              <p className="font-body text-xs text-sole-muted uppercase tracking-wider mb-3">
                Color: <span className="text-sole-white">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-2 border rounded-lg font-body text-xs transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-sole-amber bg-sole-amber/10 text-sole-amber'
                        : 'border-sole-border text-sole-muted hover:border-sole-amber/30 hover:text-sole-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className={`font-body text-xs uppercase tracking-wider mb-3 transition-colors ${sizeError ? 'text-sole-coral' : 'text-sole-muted'}`}>
                {sizeError ? 'Please select a size' : 'Select Size (Indian)'}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border rounded-xl font-body text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-sole-amber bg-sole-amber text-sole-black font-bold'
                        : 'border-sole-border text-sole-muted hover:border-sole-amber/40 hover:text-sole-white'
                    } ${sizeError ? 'border-sole-coral/40' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 font-body font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-sole-amber text-sole-black hover:bg-sole-amber/90 hover:shadow-[0_4px_24px_rgba(245,166,35,0.5)]'
                }`}
              >
                {added ? <><Check size={16} /> Added to Bag</> : <><ShoppingBag size={16} /> Add to Bag</>}
              </button>
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`w-14 h-14 border rounded-xl flex items-center justify-center transition-all duration-200 ${
                  wishlist ? 'border-sole-coral bg-sole-coral/10 text-sole-coral' : 'border-sole-border text-sole-muted hover:border-sole-coral/40 hover:text-sole-coral'
                }`}
              >
                <Heart size={18} className={wishlist ? 'fill-sole-coral' : ''} />
              </button>
            </div>

            {/* AI Try-On */}
            <button
              onClick={() => setTryOnOpen(true)}
              className="w-full py-3.5 border border-sole-amber/30 bg-sole-amber/5 text-sole-amber font-body font-medium text-sm rounded-xl hover:bg-sole-amber/10 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Sparkles size={15} />
              AI Virtual Try-On — See How It Looks
            </button>

            {/* Description */}
            <div className="pt-2 border-t border-sole-border">
              <p className="font-body text-sm text-sole-muted leading-relaxed">{product.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-sole-hover border border-sole-border rounded-full font-body text-xs text-sole-muted capitalize">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Reservation notice */}
            <div className="p-4 bg-sole-amber/5 border border-sole-amber/20 rounded-xl">
              <p className="font-body text-xs text-sole-amber/80">
                ⏱ Items are reserved for 48 hours after being added to your bag
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-4xl text-sole-white tracking-tight mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p, i) => (
                <div key={p.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
