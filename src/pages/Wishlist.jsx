import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, product.sizes ? product.sizes[0] : 'Free Size', 1);
    toggleWishlist(product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="section-padding container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--maroon-primary)' }}>
          <Heart size={40} />
        </div>
        <span className="section-tag">YOUR WISHLIST IS CURRENTLY EMPTY</span>
        <h2 style={{ fontSize: '2rem', color: 'var(--maroon-primary)', marginBottom: '12px' }}>
          Save Your Cherished Pieces
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '440px', marginBottom: '28px', lineHeight: 1.6 }}>
          Click the heart icon on any handcrafted garment to save it here for upcoming celebrations.
        </p>
        <Link to="/shop" className="btn btn-primary btn-lg">
          <span>Discover Designs</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page section-padding">
      <div className="container">
        <div style={{ marginBottom: '36px' }}>
          <span className="section-tag">
            <Sparkles size={14} /> SAVED FOR CELEBRATIONS
          </span>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--maroon-primary)' }}>
            My Wishlist ({wishlist.length} {wishlist.length === 1 ? 'Design' : 'Designs'})
          </h1>
        </div>

        <div className="product-grid">
          {wishlist.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <button
                  className="product-wishlist-btn active"
                  onClick={() => toggleWishlist(product)}
                  title="Remove from Wishlist"
                  aria-label="Remove from Wishlist"
                >
                  <Trash2 size={16} color="#6B1724" />
                </button>

                <Link to={`/product/${product.id}`}>
                  <img src={product.images[0]} alt={product.name} />
                </Link>
              </div>

              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>

                <div className="product-price-row">
                  <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice > product.price && (
                    <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>

                <div className="product-actions" style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ flexGrow: 1 }}
                    onClick={() => handleMoveToCart(product)}
                  >
                    <ShoppingBag size={16} />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
