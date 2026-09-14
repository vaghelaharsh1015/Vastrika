import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { X, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    cartCount,
    cartSubtotal,
    openCheckout
  } = useCart();

  const freeShippingThreshold = 1999;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`drawer-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
      />

      {/* Slide-over Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <h3>
            <ShoppingBag size={20} color="var(--maroon-primary)" />
            <span>Shopping Bag ({cartCount})</span>
          </h3>
          <button
            onClick={closeCart}
            className="btn-icon"
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{ background: '#FFF8EE', padding: '12px 24px', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', marginBottom: '6px', color: 'var(--text-dark)' }}>
            <Sparkles size={14} color="var(--gold-dark)" />
            {cartSubtotal >= freeShippingThreshold ? (
              <strong style={{ color: 'var(--success)' }}>You unlocked FREE Luxury Shipping! 🚚</strong>
            ) : (
              <span>
                Add <strong>₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for Free Shipping
              </span>
            )}
          </div>
          <div style={{ width: '100%', height: '5px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
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

        {/* Drawer Body Items */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', padding: '40px 0' }}>
              <ShoppingBag size={48} color="var(--gold-dark)" style={{ margin: '0 auto 16px', opacity: 0.7 }} />
              <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Your bag is empty</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Discover our hand-curated festive collection and find your signature style.
              </p>
              <Link to="/shop" className="btn btn-primary btn-sm" onClick={closeCart}>
                Start Shopping
              </Link>
            </div>
          ) : (
            cart.map((item, idx) => (
              <CartItem
                key={`${item.product.id}-${item.selectedSize}-${idx}`}
                item={item}
                closeDrawer={closeCart}
              />
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-subtotal">
              <span>Estimated Subtotal:</span>
              <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Shipping, taxes & promotional discounts calculated during checkout.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Link
                to="/cart"
                className="btn btn-outline"
                style={{ padding: '12px 14px', fontSize: '0.85rem' }}
                onClick={closeCart}
              >
                View Bag
              </Link>
              <button
                className="btn btn-primary"
                style={{ padding: '12px 14px', fontSize: '0.85rem' }}
                onClick={openCheckout}
              >
                <span>Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
