import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';

const Newsletter = () => {
  const { addToast } = useCart();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    addToast('Welcome to the Vastrika Royal Club! Check your inbox for your 10% welcome gift.');
    setEmail('');
  };

  return (
    <section className="section-padding" style={{ paddingTop: '40px' }}>
      <div className="container">
        <div className="newsletter-card">
          <span className="section-tag">
            <Sparkles size={14} /> THE VASTRIKA CIRCLE
          </span>

          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px', color: 'var(--maroon-primary)' }}>
            Join The Royal Club
          </h2>

          <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto', fontSize: '1rem' }}>
            Subscribe to receive private preview invitations, exclusive festive privilege coupons,
            and bespoke couture style guides directly to your inbox.
          </p>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
            />
            <button type="submit" className="btn btn-primary">
              <span>Subscribe</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="newsletter-disclaimer">
            We value your privacy. Unsubscribe at any time with a single click.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
