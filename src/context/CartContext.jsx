import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROMOS } from '../data/products';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // 1. Cart State with LocalStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('vastrika_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  // 2. Wishlist State with LocalStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('vastrika_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load wishlist from localStorage', e);
      return [];
    }
  });

  // 3. UI states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('vastrika_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('vastrika_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Toast System
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Operations
  const addToCart = (product, size = null, quantity = 1) => {
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Free Size';
    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prev, { product, selectedSize, quantity: qty }];
      }
    });

    addToast(`Added "${product.name.slice(0, 24)}..." (${selectedSize}) to your bag!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, selectedSize) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
    addToast('Item removed from your shopping bag', 'info');
  };

  const updateQuantity = (productId, selectedSize, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === selectedSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.name.slice(0, 20)}..." from Wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Saved "${product.name.slice(0, 20)}..." to Wishlist!`, 'success');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Promo operations
  const applyPromo = (code) => {
    const found = PROMOS.find((p) => p.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      addToast('Invalid coupon code', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }
    if (cartSubtotal < found.minOrder) {
      addToast(`Min. order of ₹${found.minOrder.toLocaleString()} required for this coupon`, 'error');
      return { success: false, message: `Minimum order value ₹${found.minOrder} required` };
    }
    setAppliedPromo(found);
    addToast(`Coupon "${found.code}" applied! ${found.discountPercent}% OFF`, 'success');
    return { success: true, message: `Applied ${found.discountPercent}% discount` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    addToast('Coupon removed', 'info');
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const promoDiscount = appliedPromo
    ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100)
    : 0;

  // Free shipping on orders >= ₹1,999
  const shippingFee = cartSubtotal >= 1999 || cartSubtotal === 0 ? 0 : 199;

  const cartTotal = Math.max(0, cartSubtotal - promoDiscount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        cartSubtotal,
        promoDiscount,
        shippingFee,
        cartTotal,
        appliedPromo,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyPromo,
        removePromo,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        quickViewProduct,
        openQuickView: (product) => setQuickViewProduct(product),
        closeQuickView: () => setQuickViewProduct(null),
        isCheckoutOpen,
        openCheckout: () => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
