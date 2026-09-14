import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Truck, 
  ShoppingBag,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    closeCheckout, 
    cart, 
    cartSubtotal, 
    promoDiscount, 
    shippingFee, 
    cartTotal, 
    clearCart,
    addToast 
  } = useCart();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: 'Aditi Rao',
    email: 'aditi.rao@example.com',
    phone: '+91 98765 43210',
    address: '402, Heritage Residency, Linking Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    paymentMethod: 'upi'
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
      addToast('Please complete all shipping address fields', 'error');
      return;
    }

    const generatedId = `VST-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderPlaced(true);
    clearCart();
    addToast('Order placed successfully! Congratulations 🎉', 'success');
  };

  const handleFinish = () => {
    setOrderPlaced(false);
    closeCheckout();
    navigate('/shop');
  };

  return (
    <div className="modal-overlay open" onClick={orderPlaced ? undefined : closeCheckout}>
      <div
        className="modal-container"
        style={{ maxWidth: '760px', padding: '32px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {!orderPlaced && (
          <button className="modal-close" onClick={closeCheckout} aria-label="Close checkout">
            <X size={20} />
          </button>
        )}

        {orderPlaced ? (
          /* Order Success Confirmation */
          <div style={{ textAlign: 'center', padding: '30px 20px' }}>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'var(--success-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--success)'
              }}
            >
              <CheckCircle size={44} />
            </div>

            <span className="section-tag">
              <Sparkles size={14} /> ORDER CONFIRMED
            </span>

            <h2 style={{ fontSize: '2.2rem', color: 'var(--maroon-primary)', marginBottom: '10px' }}>
              Thank You for Your Patronage!
            </h2>

            <p style={{ color: 'var(--text-body)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              Your order <strong style={{ color: 'var(--maroon-primary)' }}>#{orderId}</strong> has been received and 
              dispatched to our master atelier for bespoke tailoring & packing.
            </p>

            <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '20px', maxWidth: '440px', margin: '0 auto 28px', textAlign: 'left', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Recipient:</span>
                <strong>{formData.fullName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivery Address:</span>
                <span style={{ textAlign: 'right', maxWidth: '240px' }}>{formData.address}, {formData.city} - {formData.pincode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
                <strong style={{ textTransform: 'uppercase' }}>{formData.paymentMethod}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-light)', fontSize: '1rem' }}>
                <span>Total Amount Paid:</span>
                <strong style={{ color: 'var(--maroon-primary)' }}>₹{cartTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleFinish}>
              <span>Continue Shopping</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <ShieldCheck size={26} color="var(--gold-dark)" />
              <div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--maroon-primary)' }}>Secure Express Checkout</h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>256-Bit SSL Encrypted Luxury Order Processing</p>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder}>
              {/* Shipping Address Section */}
              <h4 style={{ fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                1. Shipping & Contact Details
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Mobile Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Email Address (for invoice & tracking) *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Delivery Street Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Flat / House No., Building, Street Area"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  />
                </div>
              </div>

              {/* Payment Method Section */}
              <h4 style={{ fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                2. Select Payment Option
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                {[
                  { id: 'upi', label: 'Instant UPI / QR', icon: <Smartphone size={18} /> },
                  { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={18} /> },
                  { id: 'netbanking', label: 'Net Banking', icon: <ShieldCheck size={18} /> },
                  { id: 'cod', label: 'Cash on Delivery', icon: <Truck size={18} /> }
                ].map((pm) => (
                  <label
                    key={pm.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      border: formData.paymentMethod === pm.id ? '2px solid var(--maroon-primary)' : '1px solid var(--border-color)',
                      background: formData.paymentMethod === pm.id ? 'var(--maroon-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={pm.id}
                      checked={formData.paymentMethod === pm.id}
                      onChange={handleChange}
                      style={{ accentColor: 'var(--maroon-primary)' }}
                    />
                    {pm.icon}
                    <span>{pm.label}</span>
                  </label>
                ))}
              </div>

              {/* Summary Breakdown */}
              <div style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span>Items Subtotal ({cart.length} designs):</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {promoDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--success)' }}>
                    <span>Festive Privilege Discount:</span>
                    <span>-₹{promoDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span>Express Shipping:</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: 'var(--success)' }}>FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: 'var(--maroon-primary)', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                  <span>Total Payable:</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <ShieldCheck size={20} />
                <span>Place Order • ₹{cartTotal.toLocaleString('en-IN')}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
