import React from 'react';
import { RotateCcw, Filter } from 'lucide-react';

const CATEGORIES_LIST = ['All', 'Men', 'Women', 'Ethnic Wear', 'Casual Wear', 'Traditional Wear', 'Accessories'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹3,000', min: 0, max: 3000 },
  { label: '₹3,000 - ₹8,000', min: 3000, max: 8000 },
  { label: '₹8,000 - ₹15,000', min: 8000, max: 15000 },
  { label: 'Above ₹15,000', min: 15000, max: Infinity }
];
const SIZES_LIST = ['All', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

const FilterBar = ({
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedSize,
  setSelectedSize,
  resetFilters,
  totalResults
}) => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="var(--maroon-primary)" />
          <h3 style={{ fontSize: '1.05rem', color: 'var(--text-dark)' }}>Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          style={{
            fontSize: '0.8rem',
            color: 'var(--maroon-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: 600
          }}
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <h4 className="filter-title">Category</h4>
        <ul className="filter-list">
          {CATEGORIES_LIST.map((cat) => (
            <li key={cat}>
              <label className="filter-checkbox-label">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                <span style={{ fontWeight: selectedCategory === cat ? 700 : 400 }}>
                  {cat}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4 className="filter-title">Price Range</h4>
        <ul className="filter-list">
          {PRICE_RANGES.map((range, idx) => (
            <li key={idx}>
              <label className="filter-checkbox-label">
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange.label === range.label}
                  onChange={() => setSelectedPriceRange(range)}
                />
                <span style={{ fontWeight: selectedPriceRange.label === range.label ? 700 : 400 }}>
                  {range.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Size Filter */}
      <div className="filter-section">
        <h4 className="filter-title">Size</h4>
        <div className="size-pill-grid">
          {SIZES_LIST.map((size) => (
            <button
              key={size}
              className={`size-pill ${selectedSize === size ? 'selected' : ''}`}
              onClick={() => setSelectedSize(size)}
              style={{ width: size.length > 3 ? 'auto' : '40px', padding: size.length > 3 ? '0 10px' : '0' }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterBar;
