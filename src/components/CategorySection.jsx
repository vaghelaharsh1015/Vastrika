import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

const CategorySection = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">CURATED DEPARTMENTS</span>
          <h2 className="section-title">Explore by Category</h2>
          <p className="section-subtitle">
            From regal bridal trousseaus to contemporary everyday linen, explore handcrafted
            collections crafted to perfection.
          </p>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="category-card"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="category-img"
                loading="lazy"
              />
              <div className="category-overlay">
                <span className="category-subtitle">{cat.subtitle}</span>
                <h3 className="category-name">{cat.name}</h3>
                <span className="category-count">{cat.itemCount}</span>
                <span className="category-cta">
                  <span>Explore Line</span>
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
