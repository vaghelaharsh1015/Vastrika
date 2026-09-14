import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Sparkles, 
  ShieldCheck, 
  Truck,
  Check
} from 'lucide-react';

const Cart = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    promoDiscount,
    shippingFee,
    cartTotal,
    appliedPromo,
    applyPromo,
    removePromo,
    openCheckout
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const freeShippingThreshold = 1999;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyPromo(couponInput.trim());
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="section-padding container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--gold-dark)' }}>
          <ShoppingBag size={40} />
        </div>
        <span className="section-tag">YOUR SHOPPING BAG IS CURRENTLY EMPTY</span>
        <h2 style={{ fontSize: '2rem', color: 'var(--maroon-primary)', marginBottom: '12px' }}>
          Begin Your Couture Journey
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '440px', marginBottom: '28px', lineHeight: 1.6 }}>
          Explore our latest collection of handcrafted royal kurtas, banarasi sarees, lehengas, and celebration attire.
        </p>
        <Link to="/shop" className="btn btn-primary btn-lg">
          <span>Explore Collections</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page section-padding">
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <span className="section-tag">
            <Sparkles size={14} /> REVIEW YOUR SELECTION
          </span>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--maroon-primary)' }}>
            Shopping Bag ({cartCount} {cartCount === 1 ? 'Design' : 'Designs'})
          </h1>
        </div>

        <div className="cart-page-grid">
          {/* Left: Cart Items List */}
          <div>
            {/* Free Shipping Alert Box */}
            <div style={{ background: '#FFF8EE', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gold-border)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--maroon-primary)' }}>
                  {cartSubtotal >= freeShippingThreshold ? '🎉 You have qualified for FREE Express Shipping!' : `Add ₹${remainingForFreeShipping.toLocaleString('en-IN')} more to get FREE Shipping`}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Threshold: ₹1,999</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    background: 'var(--gold-gradient)',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>

            {/* List */}
            <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', padding: '24px' }}>
              {cart.map((item, idx) => (
                <CartItem
                  key={`${item.product.id}-${item.selectedSize}-${idx}`}
                  item={item}
                />
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                <Link
                  to="/shop"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--maroon-primary)'
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Breakdown */}
          <div>
            <div className="order-summary-card">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--maroon-primary)', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                Order Summary
              </h3>

              <div className="summary-row">
                <span>Items Subtotal:</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="summary-row" style={{ color: 'var(--success)', fontWeight: 600 }}>
                  <span>Coupon ({appliedPromo.code}):</span>
                  <span>-₹{promoDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Estimated Shipping:</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong style={{ color: 'var(--success)' }}>FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span>Estimated Tax (GST):</span>
                <span>Included</span>
              </div>

              <div className="summary-row summary-total">
                <span>Total Amount:</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>

              {/* Promo code input form */}
              <div style={{ marginTop: '24px', marginBottom: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                {appliedPromo ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--success-bg)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--success)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>
                      <Check size={16} />
                      <span>{appliedPromo.code} applied ({appliedPromo.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removePromo}
                      style={{ fontSize: '0.78rem', color: '#EF4444', textDecoration: 'underline' }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ position: 'relative', flexGrow: 1 }}>
                      <Tag size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        placeholder="Coupon (e.g. VASTRIKA20)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 32px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.85rem',
                          textTransform: 'uppercase'
                        }}
                      />
                    </div>
                    <button type="submit" className="btn btn-outline btn-sm">
                      Apply
                    </button>
                  </form>
                )}
              </div>

              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                onClick={openCheckout}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} color="var(--gold-dark)" />
                  <span>100% Safe & Secure Checkout</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={16} color="var(--gold-dark)" />
                  <span>Dispatched in bespoke luxury packaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
