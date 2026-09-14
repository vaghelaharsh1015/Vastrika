import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : 'Free Size'
  );

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card">
      {/* Product Image & Badges */}
      <div className="product-image-container">
        {product.tag && (
          <span className={`product-badge ${product.isBestSeller ? 'gold' : ''}`}>
            {product.tag}
          </span>
        )}

        <button
          className={`product-wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart size={18} fill={inWishlist ? '#6B1724' : 'none'} color={inWishlist ? '#6B1724' : '#201715'} />
        </button>

        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
          />
        </Link>

        {/* Quick View Button on Hover */}
        <button
          className="product-quick-view"
          onClick={handleQuickView}
          aria-label="Quick View"
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Eye size={16} /> Quick View
          </span>
        </button>
      </div>

      {/* Product Content & Info */}
      <div className="product-info">
        <span className="product-category">{product.category} • {product.subCategory}</span>

        <h3 className="product-title" title={product.name}>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? '#F59E0B' : 'none'}
                color="#F59E0B"
              />
            ))}
          </div>
          <span className="rating-count">({product.reviewCount})</span>
        </div>

        {/* Pricing */}
        <div className="product-price-row">
          <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          {product.discount > 0 && (
            <span className="discount-badge">{product.discount}% OFF</span>
          )}
        </div>

        {/* Action Button */}
        <div className="product-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            style={{ width: '100%' }}
          >
            <ShoppingBag size={16} />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
