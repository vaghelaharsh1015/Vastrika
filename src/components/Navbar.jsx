import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  User,
  LogOut,
  ShieldCheck
} from 'lucide-react';

const Navbar = () => {
  const { cartCount, wishlist, openCart, openSearch } = useCart();
  const { user, isAuthenticated, isAdmin, openLogin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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
                <li style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link
                    to="/wishlist"
                    className="btn btn-outline"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                    onClick={closeMobileMenu}
                  >
                    <span>Wishlist ({wishlist.length})</span>
                    <ChevronRight size={16} />
                  </Link>

                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="btn btn-outline"
                      style={{ width: '100%', justifyContent: 'space-between', color: '#EF4444' }}
                    >
                      <span>Sign Out ({user?.name?.split(' ')[0]})</span>
                      <LogOut size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        openLogin();
                        closeMobileMenu();
                      }}
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Sign In / Register</span>
                    </button>
                  )}
                </li>
              )}
            </ul>
          </nav>

          {/* Action Icons (Search, User, Wishlist, Cart) */}
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

            {/* User Profile / Auth Button */}
            <div style={{ position: 'relative' }}>
              <button
                className="action-btn"
                onClick={() => {
                  if (isAuthenticated) {
                    setUserDropdownOpen(!userDropdownOpen);
                  } else {
                    openLogin();
                  }
                }}
                aria-label="User Account"
                title={isAuthenticated ? `Logged in as ${user?.name}` : 'Sign In'}
                style={isAuthenticated ? { borderColor: 'rgba(197, 160, 89, 0.6)', color: '#C5A059' } : {}}
              >
                <User size={20} />
              </button>

              {/* User Dropdown for Logged-in State */}
              {isAuthenticated && userDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    width: '220px',
                    background: '#1A1412',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    borderRadius: '10px',
                    padding: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    zIndex: 1000,
                  }}
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div style={{ paddingBottom: '8px', borderBottom: '1px solid #332A24', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 600, color: '#F9F6F0', fontSize: '0.9rem' }}>{user?.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#B3A898', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {user?.email}
                    </div>
                    {isAdmin && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.7rem',
                          background: 'rgba(197, 160, 89, 0.2)',
                          color: '#C5A059',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          marginTop: '4px',
                        }}
                      >
                        <ShieldCheck size={12} /> Admin
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: '#EF4444',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      textAlign: 'left',
                    }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>

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
