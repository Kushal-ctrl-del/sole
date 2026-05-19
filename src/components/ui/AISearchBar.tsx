import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../lib/products';
import { supabase } from '../../lib/supabase';

interface AISearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AISearchBar({ isOpen, onClose }: AISearchBarProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<typeof products>([]);
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
      setExplanation('');
      setError('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResults([]);
    setExplanation('');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const response = await fetch(`${supabaseUrl}/functions/v1/ai-search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log('[AISearchBar] API response:', data);
      console.log('[AISearchBar] Product IDs from API:', data.productIds);

      const productIds = Array.isArray(data.productIds) ? data.productIds : [];
      console.log('[AISearchBar] Product IDs array:', productIds);

      const matchedProducts = products.filter(p => productIds.includes(p.id));
      console.log('[AISearchBar] Matched products:', matchedProducts);
      console.log('[AISearchBar] Available product IDs:', products.map(p => p.id));

      setResults(matchedProducts);
      setExplanation(data.explanation || 'No results');
    } catch (err) {
      console.error('[AISearchBar] Error:', err);
      setError('AI search unavailable. Showing keyword results.');
      const keyword = query.toLowerCase();
      const fallback = products.filter(p =>
        p.name.toLowerCase().includes(keyword) ||
        p.brand.toLowerCase().includes(keyword) ||
        p.tags.some(t => t.includes(keyword)) ||
        p.category.includes(keyword)
      );
      setResults(fallback);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const suggestions = [
    'running shoes under ₹15000',
    'lightweight women\'s sneakers',
    'streetwear lifestyle kicks',
    'marathon racing shoes',
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[80] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="max-w-3xl mx-auto px-4 pt-8">
          {/* Search Input */}
          <div className="bg-sole-surface border border-sole-border rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-sole-border">
              <Sparkles size={18} className="text-sole-amber flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ask anything: 'lightweight running shoes under ₹15K for men'..."
                className="flex-1 bg-transparent font-body text-sole-white placeholder-sole-muted outline-none text-base"
              />
              {query && (
                <button onClick={() => { setQuery(''); setResults([]); setExplanation(''); }} className="text-sole-muted hover:text-sole-white transition-colors">
                  <X size={16} />
                </button>
              )}
              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="px-4 py-2 bg-sole-amber text-sole-black font-body font-bold text-sm rounded-lg disabled:opacity-50 hover:bg-sole-amber/90 transition-colors flex items-center gap-2"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                Search
              </button>
              <button onClick={onClose} className="text-sole-muted hover:text-sole-white transition-colors ml-1">
                <X size={18} />
              </button>
            </div>

            {/* Results / Suggestions */}
            <div className="max-h-[60vh] overflow-y-auto">
              {!loading && results.length === 0 && !explanation && (
                <div className="p-5">
                  <p className="font-body text-xs text-sole-muted uppercase tracking-wider mb-3">Try asking...</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map(s => (
                      <button
                        key={s}
                        onClick={() => { setQuery(s); setTimeout(handleSearch, 100); }}
                        className="px-3 py-1.5 border border-sole-border rounded-full font-body text-xs text-sole-muted hover:text-sole-amber hover:border-sole-amber/40 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex items-center justify-center py-12 gap-3">
                  <Loader2 size={20} className="animate-spin text-sole-amber" />
                  <span className="font-body text-sm text-sole-muted">AI is searching...</span>
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="p-5">
                  {explanation && (
                    <div className="flex items-start gap-2 mb-4 p-3 bg-sole-amber/10 border border-sole-amber/20 rounded-xl">
                      <Sparkles size={14} className="text-sole-amber mt-0.5 flex-shrink-0" />
                      <p className="font-body text-xs text-sole-amber/90">{explanation}</p>
                    </div>
                  )}
                  {error && <p className="font-body text-xs text-sole-coral mb-3">{error}</p>}
                  <div className="grid grid-cols-2 gap-3">
                    {results.map(product => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex gap-3 p-3 bg-sole-hover border border-sole-border rounded-xl hover:border-sole-amber/40 transition-all duration-200 group"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-sole-surface">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-xs text-sole-amber mb-0.5">{product.brand}</p>
                          <p className="font-display text-sm text-sole-white tracking-wide leading-tight">{product.name}</p>
                          <p className="font-body text-xs font-semibold text-sole-white mt-1">{formatPrice(product.price)}</p>
                        </div>
                        <ArrowRight size={14} className="text-sole-muted group-hover:text-sole-amber transition-colors flex-shrink-0 mt-1" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {!loading && query && results.length === 0 && explanation && (
                <div className="p-8 text-center">
                  <p className="font-body text-sm text-sole-muted">No matches found. Try a different search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
