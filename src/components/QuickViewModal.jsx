import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingBag, Heart, ArrowRight } from 'lucide-react';

const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(
        quickViewProduct.sizes && quickViewProduct.sizes.length > 0
          ? quickViewProduct.sizes[0]
          : 'Free Size'
      );
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    closeQuickView();
  };

  return (
    <div className="modal-overlay open" onClick={closeQuickView}>
      <div
        className="modal-container"
        style={{ maxWidth: '820px', padding: '0', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={closeQuickView} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Product Image */}
          <div style={{ position: 'relative', background: 'var(--bg-surface)' }}>
            <img
              src={quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              style={{ width: '100%', height: '100%', maxHeight: '480px', objectFit: 'cover' }}
            />
          </div>

          {/* Product Quick Details */}
          <div style={{ padding: '36px 30px', display: 'flex', flexDirection: 'column' }}>
            <span className="product-category">{quickViewProduct.category} • {quickViewProduct.subCategory}</span>

            <h3 style={{ fontSize: '1.45rem', marginBottom: '8px', color: 'var(--maroon-primary)' }}>
              {quickViewProduct.name}
            </h3>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(quickViewProduct.rating) ? '#F59E0B' : 'none'}
                    color="#F59E0B"
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                ({quickViewProduct.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {quickViewProduct.discount > 0 && (
                <span className="discount-badge">{quickViewProduct.discount}% OFF</span>
              )}
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '20px' }}>
              {quickViewProduct.description}
            </p>

            {/* Size Selector */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Size: <strong>{selectedSize}</strong>
                </span>
                <div className="size-pill-grid">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-pill ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                      style={{ width: size.length > 3 ? 'auto' : '38px', height: '38px', padding: size.length > 3 ? '0 8px' : '0' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', marginBottom: '16px' }}>
              <div className="qty-control" style={{ height: '44px' }}>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary"
                style={{ flexGrow: 1, height: '44px' }}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>Add to Bag</span>
              </button>

              <button
                className={`btn-icon ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(quickViewProduct)}
                style={{
                  height: '44px',
                  width: '44px',
                  border: '1px solid var(--border-color)',
                  color: inWishlist ? 'var(--maroon-primary)' : 'inherit',
                  background: inWishlist ? 'var(--maroon-light)' : 'transparent'
                }}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={inWishlist ? '#6B1724' : 'none'} />
              </button>
            </div>

            <Link
              to={`/product/${quickViewProduct.id}`}
              onClick={closeQuickView}
              style={{
                fontSize: '0.85rem',
                color: 'var(--maroon-primary)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '6px'
              }}
            >
              <span>View Full Design Specifications</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
