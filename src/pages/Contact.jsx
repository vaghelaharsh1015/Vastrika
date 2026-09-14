import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  MessageSquare
} from 'lucide-react';

const FAQS = [
  {
    q: 'How long does standard delivery take within India?',
    a: 'All domestic ready-to-wear orders are dispatched via express air couriers within 24-48 hours, typically arriving in 3 to 5 business days.'
  },
  {
    q: 'Can I request bespoke customizations or size alterations?',
    a: 'Yes! Vastrika offers custom made-to-measure tailoring for all bridal lehengas, sherwanis, and anarkali sets. Please reach out to our concierge via WhatsApp or schedule an atelier visit.'
  },
  {
    q: 'What is the return & exchange policy?',
    a: 'We provide a complimentary 7-day hassle-free exchange & return window on all standard unworn garments with tags attached. Reverse pick-up is arranged at no extra cost.'
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we deliver worldwide via DHL Express to USA, UK, UAE, Canada, Australia, and Singapore with full transit insurance.'
  }
];

const Contact = () => {
  const { addToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Consultation',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please complete all required fields', 'error');
      return;
    }
    addToast(`Thank you ${formData.name}. Our concierge will get back to you within 4 hours.`);
    setFormData({ name: '', email: '', phone: '', subject: 'Bespoke Consultation', message: '' });
  };

  return (
    <div className="contact-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} /> CONCIERGE & ATELIER
          </span>
          <h1 className="section-title">Get in Touch with Vastrika</h1>
          <p className="section-subtitle">
            Whether you need assistance with sizing, bridal consultations, or order inquiries,
            our personal fashion stylists are at your service.
          </p>
        </div>

        {/* Contact Grid: Form + Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', marginBottom: '80px' }}>
          {/* Left: Contact Form */}
          <div style={{ background: 'var(--bg-card)', padding: '36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--maroon-primary)', marginBottom: '8px' }}>
              Send an Atelier Inquiry
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
              Fill out the form below and an atelier representative will contact you shortly.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Inquiry Type</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', background: '#FFFFFF' }}
                >
                  <option value="Bespoke Consultation">Bespoke Bridal / Groom Consultation</option>
                  <option value="Order Tracking">Order Status & Tracking</option>
                  <option value="Size & Fit Advisory">Size & Fit Advisory</option>
                  <option value="Wholesale / Exports">Wholesale / Global Exports</option>
                  <option value="General Feedback">General Inquiries</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Your Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details regarding your requirements, wedding date, or specific garment inquiries..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={16} />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>

          {/* Right: Contact Details & Store Hours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--maroon-primary)', marginBottom: '20px' }}>
                Atelier Location & Contact
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <MapPin size={20} color="var(--gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h5 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Flagship Showroom</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      Heritage Arcade, MG Road, Kala Ghoda Arts District, Mumbai 400001, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <Phone size={20} color="var(--gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h5 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>VIP Concierge Helpline</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>+91 (022) 8492-7000 / +91 98765 43210</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <Mail size={20} color="var(--gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h5 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Email Support</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>concierge@vastrikafashion.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <Clock size={20} color="var(--gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h5 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Showroom Timings</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Monday – Saturday: 10:30 AM – 8:30 PM IST<br />
                      Sunday: By Private Appointment Only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, var(--bg-dark) 0%, #301419 100%)', color: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <MessageSquare size={20} color="var(--gold-accent)" />
                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem' }}>Instant WhatsApp Support</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#E2DBD4', marginBottom: '16px', lineHeight: 1.5 }}>
                Chat directly with our styling master for real-time fabric swatches, high-resolution videos, and live size assistance.
              </p>
              <button
                className="btn btn-gold btn-sm"
                onClick={() => addToast('Opening VIP WhatsApp Stylist chat...')}
              >
                Start WhatsApp Chat
              </button>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-tag">QUICK ANSWERS</span>
            <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-card)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--text-dark)'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {openFaq === idx && (
                  <div style={{ padding: '0 20px 16px', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
