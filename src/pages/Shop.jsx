import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import FilterBar from '../components/FilterBar';
import { PRODUCTS } from '../data/products';
import { Sparkles, SlidersHorizontal, Search, X } from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');
  const searchParam = searchParams.get('search');

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [selectedPriceRange, setSelectedPriceRange] = useState({ label: 'All Prices', min: 0, max: Infinity });
  const [selectedSize, setSelectedSize] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, searchParam]);

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange({ label: 'All Prices', min: 0, max: Infinity });
    setSelectedSize('All');
    setSortBy('featured');
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesSubCategory = product.subCategory.toLowerCase().includes(q);
        const matchesFabric = product.fabric.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesSubCategory && !matchesFabric) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'All') {
        if (
          product.category.toLowerCase() !== selectedCategory.toLowerCase() &&
          product.subCategory.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }
      }

      // 3. Special URL quick filters
      if (filterParam === 'new' && !product.isNew) return false;
      if (filterParam === 'featured' && !product.isFeatured) return false;
      if (filterParam === 'bestseller' && !product.isBestSeller) return false;

      // 4. Price range filter
      if (product.price < selectedPriceRange.min || product.price > selectedPriceRange.max) {
        return false;
      }

      // 5. Size filter
      if (selectedSize !== 'All') {
        if (!product.sizes || !product.sizes.includes(selectedSize)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      return 0; // default / featured
    });
  }, [selectedCategory, selectedPriceRange, selectedSize, sortBy, searchQuery, filterParam]);

  return (
    <div className="shop-page section-padding">
      <div className="container">
        {/* Shop Page Banner / Title */}
        <div style={{ marginBottom: '36px' }}>
          <span className="section-tag">
            <Sparkles size={14} /> COMPLETE ATELIER WARDROBE
          </span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--maroon-primary)', marginTop: '4px' }}>
            {selectedCategory === 'All' ? 'All Couture & Ready-to-Wear' : `${selectedCategory} Collection`}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '6px' }}>
            Showing {filteredProducts.length} authentic hand-tailored garments & accessories
          </p>
        </div>

        {/* Top Control Bar (Search + Sort + Mobile Filter Button) */}
        <div className="shop-top-bar">
          {/* Search box within shop page */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search in collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 36px 9px 38px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.9rem',
                outline: 'none',
                background: 'var(--bg-card)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
            {/* Mobile Filter Toggle */}
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <SlidersHorizontal size={16} />
              <span>{mobileFiltersOpen ? 'Hide Filters' : 'Filters'}</span>
            </button>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sort By:</span>
              <select
                className="shop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured / Curated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">Newest Additions</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {(selectedCategory !== 'All' || selectedSize !== 'All' || selectedPriceRange.label !== 'All Prices' || searchQuery) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Filters:</span>
            {selectedCategory !== 'All' && (
              <span className="btn-sm" style={{ background: 'var(--maroon-light)', color: 'var(--maroon-primary)', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}><X size={14} /></button>
              </span>
            )}
            {selectedSize !== 'All' && (
              <span className="btn-sm" style={{ background: 'var(--maroon-light)', color: 'var(--maroon-primary)', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Size: {selectedSize}
                <button onClick={() => setSelectedSize('All')}><X size={14} /></button>
              </span>
            )}
            {selectedPriceRange.label !== 'All Prices' && (
              <span className="btn-sm" style={{ background: 'var(--maroon-light)', color: 'var(--maroon-primary)', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {selectedPriceRange.label}
                <button onClick={() => setSelectedPriceRange({ label: 'All Prices', min: 0, max: Infinity })}><X size={14} /></button>
              </span>
            )}
            {searchQuery && (
              <span className="btn-sm" style={{ background: 'var(--maroon-light)', color: 'var(--maroon-primary)', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}><X size={14} /></button>
              </span>
            )}
            <button
              onClick={resetFilters}
              style={{ fontSize: '0.82rem', color: 'var(--maroon-primary)', textDecoration: 'underline', marginLeft: '6px' }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Shop Layout: Sidebar + Product Grid */}
        <div className="shop-layout">
          <div style={{ display: mobileFiltersOpen ? 'block' : undefined }}>
            <FilterBar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              resetFilters={resetFilters}
              totalResults={filteredProducts.length}
            />
          </div>

          <div>
            <ProductGrid
              products={filteredProducts}
              emptyMessage="No designs found matching your selected filters. Try choosing another category or clearing price filters."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
