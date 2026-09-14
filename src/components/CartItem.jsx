import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

const CartItem = ({ item, closeDrawer = null }) => {
  const { product, selectedSize, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();

  const handleLinkClick = () => {
    if (closeDrawer) closeDrawer();
  };

  return (
    <div className="cart-item">
      <Link to={`/product/${product.id}`} onClick={handleLinkClick}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="cart-item-img"
        />
      </Link>

      <div className="cart-item-details">
        <h4 className="cart-item-title">
          <Link to={`/product/${product.id}`} onClick={handleLinkClick}>
            {product.name}
          </Link>
        </h4>

        <div className="cart-item-meta">
          Size: <span>{selectedSize}</span>
        </div>

        <div className="cart-item-row">
          <div className="qty-control">
            <button
              className="qty-btn"
              onClick={() => updateQuantity(product.id, selectedSize, -1)}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="qty-value">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() => updateQuantity(product.id, selectedSize, 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span className="cart-item-price">
              ₹{(product.price * quantity).toLocaleString('en-IN')}
            </span>

            <button
              onClick={() => removeFromCart(product.id, selectedSize)}
              style={{ color: '#9CA3AF', transition: 'color 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#EF4444')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#9CA3AF')}
              aria-label="Remove item from bag"
              title="Remove item"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
