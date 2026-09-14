import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="section-padding container" style={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '12px', color: 'var(--maroon-primary)' }}>Design Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>The requested garment may be sold out or moved.</p>
        <Link to="/shop" className="btn btn-primary">Return to Shop</Link>
      </div>
    );
  }

  // Related products from same category or subcategory
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.subCategory === product.subCategory)
  ).slice(0, 4);

  return (
    <div className="product-page section-padding">
      <div className="container">
        {/* Breadcrumbs Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '32px', flexWrap: 'wrap' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Home size={14} /> Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/shop">Shop</Link>
          <ChevronRight size={14} />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <ProductDetails product={product} />

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border-light)' }}>
            <div className="section-header">
              <span className="section-tag">
                <Sparkles size={14} /> COMPLEMENTARY PIECES
              </span>
              <h2 className="section-title">You May Also Admire</h2>
              <p className="section-subtitle">
                Pair your selection with these handcrafted coordinates and festive additions.
              </p>
            </div>

            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
