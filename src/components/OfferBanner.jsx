import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

const OfferBanner = () => {
  const { addToast } = useCart();
  const [copied, setCopied] = useState(false);
  const couponCode = 'VASTRIKA20';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    addToast(`Coupon "${couponCode}" copied to clipboard!`);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="section-padding" style={{ paddingBottom: '40px' }}>
      <div className="container">
        <div className="promo-banner">
          <div className="promo-content">
            <span className="promo-tag">
              <Sparkles size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              EXCLUSIVE FESTIVE PRIVILEGE
            </span>

            <h2 className="promo-title">
              Flat 20% Off On Our Handcrafted New Arrivals
            </h2>

            <p className="promo-description">
              Celebrate timeless heritage. Indulge in royal Banarasi silks, hand-embroidered 
              chanderi sets, and sharp ceremonial sherwanis at special festive pricing.
            </p>

            <div className="promo-actions">
              <Link to="/shop?filter=new" className="btn btn-gold">
                <span>Shop Festive Collection</span>
                <ArrowRight size={18} />
              </Link>

              <button
                className="promo-coupon"
                onClick={handleCopyCode}
                title="Click to copy coupon code"
              >
                <span>CODE: {couponCode}</span>
                {copied ? <Check size={16} color="#34D399" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
