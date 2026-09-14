import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Heart, 
  ShoppingBag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Star, 
  Check, 
  Share2,
  Ruler
} from 'lucide-react';

const ProductDetails = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openCheckout, addToast } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : 'Free Size'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const inWishlist = isInWishlist(product.id);

  const handleQtyChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    openCheckout();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="product-detail-grid">
      {/* Left: Image Gallery */}
      <div className="product-gallery">
        <div className="main-image-frame">
          <img
            src={product.images[selectedImage] || product.images[0]}
            alt={product.name}
          />
        </div>

        {/* Thumbnail Selector */}
        {product.images.length > 1 && (
          <div className="thumbnails-row">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                className={`thumbnail-btn ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => setSelectedImage(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Product Info & Actions */}
      <div className="product-detail-info">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span className="product-category">{product.category} • {product.subCategory}</span>
          <button
            onClick={handleShare}
            className="btn-icon"
            title="Share this design"
            aria-label="Share"
          >
            <Share2 size={18} />
          </button>
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '14px', color: 'var(--maroon-primary)' }}>
          {product.name}
        </h1>

        {/* Rating Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.rating) ? '#F59E0B' : 'none'}
                color="#F59E0B"
              />
            ))}
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{product.rating}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            ({product.reviewCount} customer reviews)
          </span>
          <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.85rem', marginLeft: 'auto' }}>
            ● In Stock
          </span>
        </div>

        {/* Pricing */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--maroon-primary)' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.discount > 0 && (
            <span className="discount-badge" style={{ fontSize: '0.85rem', padding: '4px 10px' }}>
              Save {product.discount}% (₹{(product.originalPrice - product.price).toLocaleString('en-IN')})
            </span>
          )}
        </div>

        <p style={{ color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '24px' }}>
          {product.description}
        </p>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Select Size: <strong style={{ color: 'var(--maroon-primary)' }}>{selectedSize}</strong>
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--gold-dark)', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <Ruler size={14} /> Size Guide
              </span>
            </div>

            <div className="size-pill-grid">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-pill ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity & CTA buttons */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {/* Quantity Selector */}
          <div className="qty-control" style={{ height: '48px' }}>
            <button className="qty-btn" style={{ width: '36px', height: '48px' }} onClick={() => handleQtyChange(-1)}>
              -
            </button>
            <span className="qty-value" style={{ width: '44px', fontSize: '1rem' }}>{quantity}</span>
            <button className="qty-btn" style={{ width: '36px', height: '48px' }} onClick={() => handleQtyChange(1)}>
              +
            </button>
          </div>

          {/* Add To Cart */}
          <button
            className="btn btn-outline"
            style={{ flex: '1 1 180px', height: '48px' }}
            onClick={handleAddToCart}
          >
            <ShoppingBag size={18} />
            <span>Add to Bag</span>
          </button>

          {/* Buy Now */}
          <button
            className="btn btn-primary"
            style={{ flex: '1 1 180px', height: '48px' }}
            onClick={handleBuyNow}
          >
            <Zap size={18} />
            <span>Buy Now</span>
          </button>

          {/* Wishlist Button */}
          <button
            className={`btn-icon ${inWishlist ? 'active' : ''}`}
            onClick={() => toggleWishlist(product)}
            style={{
              width: '48px',
              height: '48px',
              border: '1.5px solid var(--border-color)',
              background: inWishlist ? 'var(--maroon-light)' : 'transparent',
              color: inWishlist ? 'var(--maroon-primary)' : 'var(--text-dark)'
            }}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart size={20} fill={inWishlist ? '#6B1724' : 'none'} />
          </button>
        </div>

        {/* Delivery & Assurance Info */}
        <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
              <Truck size={18} color="var(--gold-dark)" />
              <span>Standard Express Delivery in <strong>{product.deliveryDays || '3-5 business days'}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
              <RotateCcw size={18} color="var(--gold-dark)" />
              <span>Complimentary 7-Day Hassle-Free Size Exchanges & Returns</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
              <ShieldCheck size={18} color="var(--gold-dark)" />
              <span>100% Genuine Handcrafted Artisan Guarantee</span>
            </div>
          </div>
        </div>

        {/* Accordion / Tab Information */}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid var(--border-light)', marginBottom: '16px' }}>
            <button
              onClick={() => setActiveTab('details')}
              style={{
                paddingBottom: '10px',
                fontWeight: activeTab === 'details' ? 700 : 500,
                color: activeTab === 'details' ? 'var(--maroon-primary)' : 'var(--text-muted)',
                borderBottom: activeTab === 'details' ? '2px solid var(--maroon-primary)' : 'none'
              }}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('fabric')}
              style={{
                paddingBottom: '10px',
                fontWeight: activeTab === 'fabric' ? 700 : 500,
                color: activeTab === 'fabric' ? 'var(--maroon-primary)' : 'var(--text-muted)',
                borderBottom: activeTab === 'fabric' ? '2px solid var(--maroon-primary)' : 'none'
              }}
            >
              Fabric & Care
            </button>
          </div>

          {activeTab === 'details' && (
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-body)' }}>
              {product.details && product.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          )}

          {activeTab === 'fabric' && (
            <div style={{ fontSize: '0.9rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p><strong>Fabric:</strong> {product.fabric}</p>
              <p><strong>Color:</strong> {product.color}</p>
              <p><strong>Wash Care:</strong> {product.care}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
