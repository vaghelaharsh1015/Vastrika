import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Hero Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} className="hero-badge-sparkle" />
              <span>THE AUTUMN / WINTER 2026 COUTURE EDIT</span>
            </div>

            <h1 className="hero-title">
              Style Rooted in
              <span>Timeless Tradition</span>
            </h1>

            <p className="hero-description">
              Discover Vastrika's bespoke collection of hand-embroidered silks, regal velvets, 
              and contemporary ethnic silhouettes meticulously crafted by master Indian artisans.
            </p>

            <div className="hero-cta-group">
              <Link to="/shop" className="btn btn-primary btn-lg">
                <span>Shop Now</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/shop?filter=featured" className="btn btn-outline btn-lg">
                <span>Explore Collection</span>
              </Link>
            </div>

            {/* Stats / Highlights */}
            <div className="hero-stats">
              <div className="stat-item">
                <h4>100%</h4>
                <p>Authentic Handloom</p>
              </div>
              <div className="stat-item">
                <h4>50k+</h4>
                <p>Happy Patrons Worldwide</p>
              </div>
              <div className="stat-item">
                <h4>250+</h4>
                <p>Master Artisans</p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Banner */}
          <div className="hero-image-wrapper">
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                alt="Vastrika Luxury Royal Fashion Collection"
                loading="eager"
              />
            </div>

            {/* Floating Luxury Highlight Card */}
            <div className="hero-floating-card">
              <div className="floating-icon">
                <Sparkles size={22} />
              </div>
              <div className="floating-info">
                <h5>Handcrafted Excellence</h5>
                <p>Pure Silk & Zardozi Weaves</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
