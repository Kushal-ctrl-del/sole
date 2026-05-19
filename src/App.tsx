import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import CartDrawer from './components/ui/CartDrawer';
import AISearchBar from './components/ui/AISearchBar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import { getCart, getCartCount, addToCart } from './lib/cart';
import { CartItem, Product } from './types';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const refreshCart = useCallback(() => {
    setCartItems(getCart());
    setCartCount(getCartCount());
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const handleQuickAdd = useCallback((product: Product) => {
    const item: CartItem = {
      productId: product.id,
      name: product.name,
      brand: product.brand,
      size: product.sizes[0],
      color: product.colors[0],
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };
    addToCart(item);
    refreshCart();
    setCartOpen(true);
  }, [refreshCart]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-sole-black font-body">
        <Navbar
          onCartOpen={() => setCartOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
          cartCount={cartCount}
        />

        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onUpdate={refreshCart}
        />

        <AISearchBar
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        <Routes>
          <Route path="/" element={<Home onQuickAdd={handleQuickAdd} />} />
          <Route path="/shop" element={<Shop onQuickAdd={handleQuickAdd} />} />
          <Route path="/product/:id" element={<ProductDetail onCartUpdate={refreshCart} />} />
          <Route path="/cart" element={<Cart onUpdate={refreshCart} />} />
          <Route path="/checkout" element={<Checkout onCartUpdate={refreshCart} />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
