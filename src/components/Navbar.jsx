import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

const Navbar = () => {
  const { cartCount, wishlist, openCart, openSearch } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top Promotional Ticker */}
      <div className="top-ticker">
        <div className="container top-ticker-content">
          <span>✨ FESTIVE EDIT: Complimentary Luxury Box & Free Shipping on Orders ₹1,999+</span>
          <span style={{ opacity: 0.6 }}>|</span>
          <span>Use Code: <strong>VASTRIKA20</strong> for 20% OFF</span>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="navbar-sticky">
        <div className="container navbar-container">
          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Vastrika Brand Logo */}
          <Link to="/" className="nav-brand" onClick={closeMobileMenu}>
            <div className="brand-emblem">
              <Sparkles size={20} />
            </div>
            <div className="brand-text-wrapper">
              <span className="brand-name">VASTRIKA</span>
              <span className="brand-tagline">HERITAGE & COUTURE</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop?category=Men"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Men
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop?category=Women"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Women
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop?filter=new"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  New Arrivals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Contact
                </NavLink>
              </li>

              {/* Mobile Only Links inside drawer */}
              {mobileMenuOpen && (
                <li style={{ marginTop: '20px', width: '100%' }}>
                  <Link
                    to="/wishlist"
                    className="btn btn-outline"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                    onClick={closeMobileMenu}
                  >
                    <span>Wishlist ({wishlist.length})</span>
                    <ChevronRight size={16} />
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Action Icons (Search, Wishlist, Cart) */}
          <div className="nav-actions">
            {/* Search Button */}
            <button
              className="action-btn"
              onClick={openSearch}
              aria-label="Open search"
              title="Search products"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="action-btn"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="badge-count">{wishlist.length}</span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              className="action-btn"
              onClick={openCart}
              aria-label="Shopping Cart"
              title="View Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
