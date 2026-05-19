import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, getAllBrands } from '../lib/products';
import { Product } from '../types';
import ProductCard from '../components/ui/ProductCard';

interface ShopProps {
  onQuickAdd: (product: Product) => void;
}

type GenderFilter = 'all' | 'men' | 'women' | 'unisex';
type CategoryFilter = 'all' | 'running' | 'basketball' | 'lifestyle' | 'training';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'newest';

export default function Shop({ onQuickAdd }: ShopProps) {
  const [searchParams] = useSearchParams();
  const [gender, setGender] = useState<GenderFilter>((searchParams.get('gender') as GenderFilter) || 'all');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [brands, setBrands] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(30000);
  const [sort, setSort] = useState<SortOption>('default');
  const [saleOnly, setSaleOnly] = useState(searchParams.get('sale') === 'true');
  const [newOnly, setNewOnly] = useState(searchParams.get('new') === 'true');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const g = searchParams.get('gender') as GenderFilter;
    if (g) setGender(g);
  }, [searchParams]);

  const allBrands = getAllBrands();

  const filtered = useMemo(() => {
    let list = [...products];
    if (gender !== 'all') list = list.filter(p => p.gender === gender || p.gender === 'unisex');
    if (category !== 'all') list = list.filter(p => p.category === category);
    if (brands.length > 0) list = list.filter(p => brands.includes(p.brand));
    list = list.filter(p => p.price <= priceMax);
    if (saleOnly) list = list.filter(p => p.isSale);
    if (newOnly) list = list.filter(p => p.isNew);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'newest') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return list;
  }, [gender, category, brands, priceMax, saleOnly, newOnly, sort]);

  const toggleBrand = (brand: string) => {
    setBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const clearFilters = () => {
    setGender('all');
    setCategory('all');
    setBrands([]);
    setPriceMax(30000);
    setSaleOnly(false);
    setNewOnly(false);
    setSort('default');
  };

  const hasFilters = gender !== 'all' || category !== 'all' || brands.length > 0 || priceMax < 30000 || saleOnly || newOnly;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <main className="pt-16 min-h-screen">
      {/* Header */}
      <div className="border-b border-sole-border bg-sole-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-5xl sm:text-6xl text-sole-white tracking-tight">All Sneakers</h1>
          <p className="font-body text-sm text-sole-muted mt-2">{filtered.length} styles available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Row */}
        <div className="flex items-center justify-between gap-4 mb-8">
          {/* Gender Toggle */}
          <div className="flex items-center gap-1 p-1 bg-sole-surface border border-sole-border rounded-xl">
            {(['all', 'men', 'women'] as const).map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 capitalize ${
                  gender === g
                    ? 'bg-sole-amber text-sole-black'
                    : 'text-sole-muted hover:text-sole-white'
                }`}
              >
                {g === 'all' ? 'All' : g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none bg-sole-surface border border-sole-border text-sole-muted font-body text-sm rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:border-sole-amber/40 cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sole-muted pointer-events-none" />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl font-body text-sm transition-all duration-200 ${
                hasFilters ? 'border-sole-amber text-sole-amber bg-sole-amber/10' : 'border-sole-border text-sole-muted hover:text-sole-white hover:border-sole-border'
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasFilters && (
                <span className="w-4 h-4 bg-sole-amber text-sole-black text-xs rounded-full flex items-center justify-center font-bold leading-none">
                  {[gender !== 'all', category !== 'all', brands.length > 0, priceMax < 30000, saleOnly, newOnly].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="mb-8 p-6 bg-sole-surface border border-sole-border rounded-2xl animate-fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category */}
              <div>
                <p className="font-body text-xs text-sole-muted uppercase tracking-wider mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'running', 'lifestyle', 'training', 'basketball'] as const).map(c => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`px-3 py-1.5 rounded-lg font-body text-xs capitalize transition-all ${
                        category === c ? 'bg-sole-amber text-sole-black font-medium' : 'border border-sole-border text-sole-muted hover:text-sole-white hover:border-sole-amber/30'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <p className="font-body text-xs text-sole-muted uppercase tracking-wider mb-3">Brand</p>
                <div className="flex flex-wrap gap-2">
                  {allBrands.map(b => (
                    <button
                      key={b}
                      onClick={() => toggleBrand(b)}
                      className={`px-3 py-1.5 rounded-lg font-body text-xs transition-all ${
                        brands.includes(b) ? 'bg-sole-amber text-sole-black font-medium' : 'border border-sole-border text-sole-muted hover:text-sole-white hover:border-sole-amber/30'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="font-body text-xs text-sole-muted uppercase tracking-wider mb-3">
                  Max Price: <span className="text-sole-amber">{formatPrice(priceMax)}</span>
                </p>
                <input
                  type="range"
                  min={5000}
                  max={30000}
                  step={1000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#F5A623]"
                />
                <div className="flex justify-between mt-1">
                  <span className="font-body text-xs text-sole-muted">₹5K</span>
                  <span className="font-body text-xs text-sole-muted">₹30K</span>
                </div>
              </div>

              {/* Toggles */}
              <div>
                <p className="font-body text-xs text-sole-muted uppercase tracking-wider mb-3">Tags</p>
                <div className="space-y-2">
                  {[
                    { label: 'New Arrivals', value: newOnly, set: setNewOnly },
                    { label: 'On Sale', value: saleOnly, set: setSaleOnly },
                  ].map(({ label, value, set }) => (
                    <button
                      key={label}
                      onClick={() => set(!value)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border font-body text-sm transition-all ${
                        value ? 'border-sole-amber bg-sole-amber/10 text-sole-amber' : 'border-sole-border text-sole-muted hover:border-sole-amber/30 hover:text-sole-white'
                      }`}
                    >
                      {label}
                      <div className={`w-8 h-4 rounded-full transition-all ${value ? 'bg-sole-amber' : 'bg-sole-border'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full mt-0.5 transition-all ${value ? 'ml-4' : 'ml-0.5'}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {hasFilters && (
              <div className="mt-4 pt-4 border-t border-sole-border flex justify-end">
                <button onClick={clearFilters} className="flex items-center gap-1.5 font-body text-xs text-sole-coral hover:text-sole-coral/80 transition-colors">
                  <X size={12} />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-sole-white mb-3">No matches found</p>
            <p className="font-body text-sm text-sole-muted mb-6">Try adjusting your filters</p>
            <button onClick={clearFilters} className="px-6 py-3 bg-sole-amber text-sole-black font-body font-semibold text-sm rounded-xl">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product, i) => (
              <div key={product.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${Math.min(i * 0.05, 0.5)}s`, animationFillMode: 'forwards' }}>
                <ProductCard product={product} onQuickAdd={onQuickAdd} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
