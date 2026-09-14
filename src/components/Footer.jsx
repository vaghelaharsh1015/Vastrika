import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand story */}
          <div className="footer-about">
            <Link to="/" className="nav-brand" style={{ display: 'inline-flex' }}>
              <div className="brand-emblem" style={{ width: '34px', height: '34px' }}>
                <Sparkles size={18} />
              </div>
              <div className="brand-text-wrapper">
                <span className="brand-name" style={{ color: '#FFFFFF', fontSize: '1.45rem' }}>VASTRIKA</span>
                <span className="brand-tagline" style={{ color: 'var(--gold-accent)' }}>HERITAGE & COUTURE</span>
              </div>
            </Link>

            <p>
              Vastrika brings together contemporary Indian fashion and timeless handloom craftsmanship. 
              Each bespoke ensemble is tailored with pride by master weavers across India.
            </p>

            <div className="social-links">
              <a href="#instagram" className="social-btn" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#facebook" className="social-btn" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#twitter" className="social-btn" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="footer-title">Explore Collections</h4>
            <ul className="footer-links">
              <li><Link to="/shop">All Designs</Link></li>
              <li><Link to="/shop?category=Men">Men's Royal Kurtas & Sherwanis</Link></li>
              <li><Link to="/shop?category=Women">Women's Lehengas & Sarees</Link></li>
              <li><Link to="/shop?category=Ethnic%20Wear">Festive Celebration Wear</Link></li>
              <li><Link to="/shop?category=Accessories">Handcrafted Mojaris & Accessories</Link></li>
              <li><Link to="/wishlist">Your Wishlist</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="footer-title">Customer Experience</h4>
            <ul className="footer-links">
              <li><Link to="/about">Our Artisan Story</Link></li>
              <li><Link to="/contact">Contact Concierge</Link></li>
              <li><Link to="/contact">Track Your Consignment</Link></li>
              <li><Link to="/contact">Custom Bespoke Tailoring</Link></li>
              <li><Link to="/contact">Shipping & Returns Policy</Link></li>
              <li><Link to="/contact">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Col 4: Flagship Atelier / Contact */}
          <div>
            <h4 className="footer-title">Flagship Atelier</h4>
            <div className="footer-contact-item">
              <MapPin size={18} />
              <span>Heritage Heritage Arcade, MG Road, Kala Ghoda, Mumbai 400001, India</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} />
              <span>+91 (022) 8492-7000 / +91 98765 43210</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} />
              <span>concierge@vastrikafashion.com</span>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--gold-light)' }}>
              <ShieldCheck size={18} />
              <span>100% Encrypted & Safe Payments</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} <strong>Vastrika Heritage Private Limited</strong>. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px', color: '#9C9086' }}>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Artisan Fair Trade Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
