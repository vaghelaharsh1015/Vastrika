import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

const POPULAR_SEARCHES = ['Velvet Lehenga', 'Silk Sherwani', 'Banarasi Saree', 'Chanderi Kurta', 'Mojaris', 'Nehru Jacket'];

const SearchBar = () => {
  const { isSearchOpen, closeSearch } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredResults = searchTerm.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subCategory.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query) ||
          p.color.toLowerCase().includes(query)
        );
      }).slice(0, 5);

  const handleSelectProduct = (productId) => {
    closeSearch();
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      closeSearch();
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handlePopularClick = (term) => {
    closeSearch();
    navigate(`/shop?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="modal-overlay open" onClick={closeSearch} style={{ alignItems: 'flex-start', paddingTop: '80px' }}>
      <div
        className="modal-container"
        style={{ maxWidth: '650px', padding: '24px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--gold-accent)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--maroon-primary)' }}>
              Search Vastrika Collections
            </span>
          </div>
          <button onClick={closeSearch} className="btn-icon" aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search kurtas, sarees, lehengas, sherwanis, fabrics..."
            style={{
              width: '100%',
              padding: '16px 48px 16px 48px',
              fontSize: '1rem',
              borderRadius: 'var(--radius-sm)',
              border: '2px solid var(--maroon-primary)',
              outline: 'none',
              backgroundColor: 'var(--bg-surface)'
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            >
              <X size={18} />
            </button>
          )}
        </form>

        {/* Popular Search Suggestions */}
        {searchTerm.trim() === '' && (
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Popular Searches:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => handlePopularClick(term)}
                  className="btn btn-sm"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', color: 'var(--text-dark)' }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Matching Live Results */}
        {searchTerm.trim() !== '' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Products Found ({filteredResults.length})
              </span>
              {filteredResults.length > 0 && (
                <button
                  onClick={handleSearchSubmit}
                  style={{ fontSize: '0.82rem', color: 'var(--maroon-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  View all results <ArrowRight size={14} />
                </button>
              )}
            </div>

            {filteredResults.length === 0 ? (
              <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                No designs found matching "<strong>{searchTerm}</strong>". Try searching for "Silk", "Kurta", or "Saree".
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectProduct(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      backgroundColor: 'var(--bg-surface)'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--maroon-light)')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface)')}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <h5 style={{ fontSize: '0.92rem', color: 'var(--text-dark)', marginBottom: '2px' }}>{item.name}</h5>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', textTransform: 'uppercase', fontWeight: 600 }}>{item.category} • {item.fabric}</span>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--maroon-primary)', fontSize: '0.95rem' }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
