import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import ProductGrid from '../components/ProductGrid';
import OfferBanner from '../components/OfferBanner';
import Newsletter from '../components/Newsletter';
import { PRODUCTS, TESTIMONIALS } from '../data/products';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Star, 
  ArrowRight,
  Instagram
} from 'lucide-react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('featured');

  // Filter products by tab
  const tabProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'bestseller') return p.isBestSeller;
    if (activeTab === 'new') return p.isNew;
    return p.isFeatured;
  }).slice(0, 8);

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Brand Values / Trust Bar */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <Award size={24} />
              </div>
              <div className="trust-text">
                <h4>Authentic Handloom</h4>
                <p>100% Certified Silk Mark & Organic Khadi</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <Truck size={24} />
              </div>
              <div className="trust-text">
                <h4>Complimentary Shipping</h4>
                <p>On all domestic orders above ₹1,999</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <RotateCcw size={24} />
              </div>
              <div className="trust-text">
                <h4>7-Day Size Exchanges</h4>
                <p>Doorstep alteration & hassle-free returns</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <ShieldCheck size={24} />
              </div>
              <div className="trust-text">
                <h4>Bespoke Tailoring</h4>
                <p>Made-to-measure bridal & groom couture</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Section */}
      <CategorySection />

      {/* 4. Featured / Trending Products Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Sparkles size={14} /> EXCLUSIVE ATELIER SELECTION
            </span>
            <h2 className="section-title">Trending & Featured Silhouettes</h2>
            <p className="section-subtitle">
              Handpicked from our festive lookbook, featuring regal zardozi embroidery, pure silk drapes, and modern cuts.
            </p>
          </div>

          {/* Collection Tab Switchers */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '36px', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${activeTab === 'featured' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('featured')}
            >
              Featured Styles
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'bestseller' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('bestseller')}
            >
              Bestsellers
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'new' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('new')}
            >
              New Arrivals
            </button>
          </div>

          {/* Product Grid */}
          <ProductGrid products={tabProducts} />

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/shop" className="btn btn-outline btn-lg">
              <span>View Full Catalog</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Promotional Offer Banner */}
      <OfferBanner />

      {/* 6. Customer Testimonials */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">PATRON EXPERIENCES</span>
            <h2 className="section-title">Words from Our Patrons</h2>
            <p className="section-subtitle">
              Cherished by fashion connoisseurs and bridal families across India and worldwide.
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="stars" style={{ marginBottom: '14px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <span className="author-name">{t.name}</span>
                  <span className="author-city">{t.city}</span>
                  <span className="author-product">Purchased: {t.productPurchased}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Instagram / Lookbook Grid */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-surface)', paddingTop: '50px' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-tag">
              <Instagram size={14} /> #VASTRIKAHERITAGE
            </span>
            <h2 className="section-title">The Royal Lookbook</h2>
            <p className="section-subtitle">
              Tag @VastrikaOfficial on Instagram to be featured in our couture gallery.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'
            ].map((imgUrl, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  aspectRatio: '1/1',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <img
                  src={imgUrl}
                  alt={`Vastrika Couture Lookbook ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;
