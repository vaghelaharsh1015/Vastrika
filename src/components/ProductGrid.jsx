import React from 'react';
import ProductCard from './ProductCard';
import { PackageOpen } from 'lucide-react';

const ProductGrid = ({ products, emptyMessage = 'No products found matching your selection.' }) => {
  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
        <PackageOpen size={48} color="var(--gold-dark)" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--text-dark)' }}>
          No Designs Found
        </h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
