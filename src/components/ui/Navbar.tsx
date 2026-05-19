import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Zap } from 'lucide-react';
import { getCartCount } from '../../lib/cart';

interface NavbarProps {
  onCartOpen: () => void;
  onSearchOpen: () => void;
  cartCount: number;
}

export default function Navbar({ onCartOpen, onSearchOpen, cartCount }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/shop?gender=men', label: 'Men' },
    { href: '/shop?gender=women', label: 'Women' },
    { href: '/orders', label: 'Orders' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-sole-black/95 backdrop-blur-md border-b border-sole-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-sole-amber rounded flex items-center justify-center">
              <Zap size={18} className="text-sole-black fill-sole-black" />
            </div>
            <span className="font-display text-2xl text-sole-white tracking-widest group-hover:text-sole-amber transition-colors">
              SOLE
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="font-body text-sm font-medium text-sole-muted hover:text-sole-amber transition-colors duration-200 uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSearchOpen}
              className="p-2 text-sole-muted hover:text-sole-amber transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              onClick={onCartOpen}
              className="relative p-2 text-sole-muted hover:text-sole-amber transition-colors duration-200"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-sole-amber text-sole-black text-xs font-bold rounded-full flex items-center justify-center font-body leading-none">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-sole-muted hover:text-sole-amber transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-sole-surface border-t border-sole-border">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="block py-3 px-2 font-body text-sm font-medium text-sole-muted hover:text-sole-amber transition-colors uppercase tracking-wider border-b border-sole-border last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
