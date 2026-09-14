import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Award, Users, Globe, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page">
      {/* Top Banner */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #201715 0%, #44181E 100%)', color: '#FFFFFF', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <span className="section-tag" style={{ background: 'rgba(197, 160, 89, 0.2)', color: 'var(--gold-accent)', borderColor: 'rgba(197, 160, 89, 0.4)' }}>
            <Sparkles size={14} /> THE VASTRIKA LEGACY
          </span>
          <h1 style={{ fontSize: '3.2rem', color: '#FFFFFF', margin: '16px 0', lineHeight: 1.2 }}>
            Where Timeless Heritage Meets Contemporary Grace
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#DDD5CB', lineHeight: 1.7 }}>
            "Vastrika brings together contemporary fashion and timeless Indian craftsmanship, 
            celebrating centuries-old handlooms woven for the modern world."
          </p>
        </div>
      </section>

      {/* Story & Philosophy Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-image-wrapper">
              <div className="hero-image-card" style={{ border: 'none' }}>
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
                  alt="Vastrika Artisans at Work"
                />
              </div>
            </div>

            <div>
              <span className="section-tag">OUR ORIGIN & PHILOSOPHY</span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--maroon-primary)', marginBottom: '18px' }}>
                Crafted by Hand, Cherished by Generations
              </h2>
              <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '16px' }}>
                Founded with a deep reverence for India's rich sartorial tapestry, Vastrika is an atelier 
                born out of a desire to preserve regional handloom legacies while designing effortless silhouettes 
                for modern celebrations.
              </p>
              <p style={{ color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '24px' }}>
                From the intricate gold kadwa zari pit-looms of Varanasi to the ethereal Chikankari embroidery 
                of Lucknow and the regal velvet zardozi craft of Rajasthan, every Vastrika creation is a love letter 
                to artisanal perfection.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ color: 'var(--maroon-primary)', fontSize: '1.4rem' }}>250+</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Empowered Master Weaver Families</p>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ color: 'var(--maroon-primary)', fontSize: '1.4rem' }}>100%</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Authentic Silk Mark & Fair Trade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weaver Clusters */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">REGIONAL CRAFT REGISTRY</span>
            <h2 className="section-title">Our Artisanal Craft Clusters</h2>
            <p className="section-subtitle">
              We work directly with master craft guilds across historic textile centers of India.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Varanasi, Uttar Pradesh', craft: 'Pure Banarasi Katan & Kadwa Brocade Weaves', desc: 'Centuries-old pit looms crafting metallic gold floral jaal.' },
              { title: 'Chanderi, Madhya Pradesh', craft: 'Featherlight Chanderi Silk & Zari Booti', desc: 'Sheer texture woven with raw silk and fine cotton yarns.' },
              { title: 'Lucknow, Awadh', craft: 'Handcrafted Shadow Chikankari & Mukaish', desc: 'Micro needlepoint embroidery practiced by third-generation karigars.' },
              { title: 'Bagru & Jaipur, Rajasthan', craft: 'Natural Plant Indigo & Dabu Woodblock Printing', desc: 'Hand-carved teakwood blocks and organic vegetable dyes.' }
            ].map((cluster, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-card)',
                  padding: '30px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {cluster.title}
                </span>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--maroon-primary)', margin: '8px 0 10px' }}>
                  {cluster.craft}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {cluster.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to Shop */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontSize: '2.4rem', color: 'var(--maroon-primary)', marginBottom: '14px' }}>
            Experience the Royal Craftsmanship
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.05rem' }}>
            Browse our latest festive catalog and discover garments tailored to celebrate your most precious moments.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            <span>Explore Vastrika Collections</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
