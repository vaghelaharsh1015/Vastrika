import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchBar from './components/SearchBar';
import QuickViewModal from './components/QuickViewModal';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import { useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const { isAuthenticated, openLogin } = useAuth();
  const hasPromptedRef = useRef(false);

  // Prompt Login/Register strictly ONCE on initial website load
  useEffect(() => {
    if (!isAuthenticated && !hasPromptedRef.current) {
      hasPromptedRef.current = true;
      const timer = setTimeout(() => {
        openLogin();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="app-container">
      <ScrollToTop />
      
      {/* Sticky Header */}
      <Navbar />

      {/* Main Routed Content */}
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Drawers, Modals & Alerts */}
      <CartDrawer />
      <SearchBar />
      <QuickViewModal />
      <CheckoutModal />
      <AuthModal />
      <Toast />
    </div>
  );
}

export default App;
