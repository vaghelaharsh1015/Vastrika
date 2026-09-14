# 📖 Vastrika - સંપૂર્ણ પ્રોજેક્ટ Code-by-Code વિગતવાર ગાઈડ (Detailed Code Explanation)

આ ડોક્યુમેન્ટમાં **Vastrika** પ્રોજેક્ટની દરેક મુખ્ય ફાઈલનો **Code** અને તે **Code લાઈન-બાય-લાઈન શું કામ કરે છે** તે વિગતવાર સરળ ગુજરાતીમાં સમજાવેલ છે.

---

# 📑 અનુક્રમણિકા (Index)
1. [`src/main.jsx`](#૧-srcmainjsx---પ્રોજેક્ટનું-entry-point)
2. [`src/App.jsx`](#૨-srcappjsx---routing-અને-ગ્લોબલ-લેઆઉટ)
3. [`src/context/CartContext.jsx`](#૩-srccontextcartcontextjsx---સ્ટેટ-મેનેજમેન્ટ-અને-લોજિક)
4. [`src/data/products.js`](#૪-srcdataproductsjs---પ્રોડક્ટ્સ-ડેટા)
5. [`src/components/Navbar.jsx`](#૫-srccomponentsnavbarjsx---સ્ટીકી-હેડર-અને-મેનુ)
6. [`src/components/ProductCard.jsx`](#૬-srccomponentsproductcardjsx---પ્રોડક્ટ-કાર્ડ)
7. [`src/components/CartDrawer.jsx`](#૭-srccomponentscartdrawerjsx---સ્લાઈડિંગ-કાર્ટ)
8. [`src/components/CheckoutModal.jsx`](#૮-srccomponentscheckoutmodaljsx---ચેકઆઉટ-અને-ઓર્ડર)
9. [`src/pages/Shop.jsx`](#૯-srcpagesshopjsx---લાઈવ-ફિલ્ટર-અને-શોપિંગ)
10. [`src/pages/Cart.jsx`](#૧૦-srcpagescartjsx---કાર્ટ-પેજ-અને-કુપન-એન્જિન)

---

## ૧. `src/main.jsx` - પ્રોજેક્ટનું Entry Point

### 💻 Code:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

### 🔍 Code શું કામ કરે છે? (Line-by-Line Explanation):
- **`ReactDOM.createRoot(document.getElementById('root'))`**: HTML માં રહેલા `<div id="root"></div>` માં આપણા આખા React App ને Load કરે છે.
- **`<BrowserRouter>`**: React Router ને સક્રિય કરે છે, જેનાથી પેજ રિલોડ થયા વગર URL બદલીને પેજ નેવિગેટ થઈ શકે છે.
- **`<CartProvider>`**: આપણે બનાવેલ CartContext પૂરા App ની ફરતે Wrap કરીએ છીએ, જેથી **App ના કોઈપણ Component કે Page પરથી Cart/Wishlist નો ડેટા એક્સેસ થઈ શકે**.
- **`import './index.css'`**: આખી વેબસાઇટનું Custom CSS Design System અહીં Load થાય છે.

---

## ૨. `src/App.jsx` - Routing અને ગ્લોબલ લેઆઉટ

### 💻 Code Snippet:
```jsx
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchBar from './components/SearchBar';
import QuickViewModal from './components/QuickViewModal';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Overlays */}
      <CartDrawer />
      <SearchBar />
      <QuickViewModal />
      <CheckoutModal />
      <Toast />
    </div>
  );
}

export default App;
```

### 🔍 Code શું કામ કરે છે?:
- **`ScrollToTop` Component**: જ્યારે પણ યુઝર એક પેજ પરથી બીજા પેજ પર જાય (દા.ત. Home માંથી Shop પર), ત્યારે પેજ ઓટોમેટિકલી ઉપર (Top: 0) સ્ક્રોલ થઈ જાય છે.
- **`<Navbar />` & `<Footer />`**: આ બંને ગ્લોબલ છે, એટલે દરેક પેજ પર આપોઆપ દેખાશે.
- **`<Routes>` & `<Route>`**: URL પાથ મુજબ કયું પેજ બતાવવું તે નક્કી કરે છે (જેમ કે `/shop` પર `Shop` પેજ, `/product/:id` પર `ProductPage`).
- **Global Overlays (`CartDrawer`, `SearchBar`, `QuickViewModal`, `CheckoutModal`, `Toast`)**: આ મોડલ્સ એપના કોઈપણ ખૂણેથી ટ્રિગર થઈ શકે તે માટે અહીં મૂકવામાં આવ્યા છે.

---

## ૩. `src/context/CartContext.jsx` - સ્ટેટ મેનેજમેન્ટ અને લોજિક

આ ફાઈલ આખા પ્રોજેક્ટનું સૌથી મહત્વનું **Brain (Logic)** છે.

### 💻 Code Snippet:
```jsx
// 1. LocalStorage માંથી ડેટા લોડ કરવો
const [cart, setCart] = useState(() => {
  try {
    const saved = localStorage.getItem('vastrika_cart');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
});

// 2. કાર્ટમાં ફેરફાર થાય ત્યારે LocalStorage માં સેવ કરવું
useEffect(() => {
  localStorage.setItem('vastrika_cart', JSON.stringify(cart));
}, [cart]);

// 3. Add to Cart લોજિક
const addToCart = (product, size = null, quantity = 1) => {
  const selectedSize = size || (product.sizes && product.sizes[0]) || 'Free Size';
  const qty = Math.max(1, parseInt(quantity, 10) || 1);

  setCart((prev) => {
    // ચેક કરો કે આ પ્રોડક્ટ અને આ જ સાઇઝ કાર્ટમાં પહેલેથી છે કે નહીં
    const existingIndex = prev.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === selectedSize
    );

    if (existingIndex > -1) {
      // જો પહેલેથી હોય, તો ફક્ત quantity વધારો (Duplicate એન્ટ્રી ન બને)
      const updated = [...prev];
      updated[existingIndex].quantity += qty;
      return updated;
    } else {
      // નવી આઈટમ ઉમેરો
      return [...prev, { product, selectedSize, quantity: qty }];
    }
  });

  addToast(`Added "${product.name.slice(0, 24)}..." (${selectedSize}) to your bag!`);
  setIsCartOpen(true); // કાર્ટ ડ્રોઅર ઓટોમેટિકલી ખોલો
};

// 4. Quantity Update (+ / -) લોજિક
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
      .filter(Boolean); // જો quantity 0 થાય તો આઈટમ દૂર થઈ જશે
  });
};

// 5. Total & Discounts ગણતરી
const cartSubtotal = cart.reduce(
  (sum, item) => sum + item.product.price * item.quantity, 0
);
const promoDiscount = appliedPromo
  ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100) : 0;
const shippingFee = cartSubtotal >= 1999 || cartSubtotal === 0 ? 0 : 199;
const cartTotal = Math.max(0, cartSubtotal - promoDiscount + shippingFee);
```

### 🔍 Functions ની સમજુતી:
1. **`localStorage.getItem` & `setItem`**: પેજ રિફ્રેશ કરવા પર કાર્ટ કે વિશલિસ્ટનો ડેટા ડિલીટ થતો નથી.
2. **`existingIndex > -1`**: જો યુઝર એક જ પ્રોડક્ટ ફરીથી "Add to Cart" કરે તો નવી લાઈન ઉમેરવાને બદલે માત્ર તેની `quantity` વધે છે.
3. **`cartSubtotal >= 1999`**: જો ઓર્ડર ₹1,999 કે તેથી વધુ હોય તો શિપિંગ ચાર્જ ₹0 (FREE) થઈ જાય છે, અન્યથા ₹199 લાગે છે.
4. **`applyPromo(code)`**: જો યુઝર `VASTRIKA20` નાખે તો `cartSubtotal` ના ૨૦% ગણીને `cartTotal` માંથી બાદ કરે છે.

---

## ૪. `src/data/products.js` - પ્રોડક્ટ્સ ડેટા

### 💻 Code Snippet:
```javascript
export const PRODUCTS = [
  {
    id: 'vast-001',
    name: 'Royal Crimson Velvet Embroidered Lehenga Set',
    category: 'Women',
    subCategory: 'Traditional Wear',
    price: 18999,
    originalPrice: 24999,
    discount: 24,
    rating: 4.9,
    reviewCount: 142,
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    tag: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?...',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?...'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Crimson Maroon & Gold',
    fabric: 'Micro Velvet with Pure Organza Dupatta',
    care: 'Strictly Dry Clean Only',
    description: 'An ode to royal Rajasthani heritage...',
    details: [
      'Handcrafted zardozi & sequin embellishment',
      'Flared 6-meter kali silhouette with canvas can-can lining'
    ],
    deliveryDays: '3-5 business days'
  },
  // ... વધુ પ્રોડક્ટ્સ
];
```

### 🔍 શું કામ કરે છે?:
- આ ફાઈલ અસલી E-commerce બેકએન્ડ ડેટાબેઝ જેવું કામ કરે છે.
- દરેક પ્રોડક્ટમાં ફોટા, ભાવ, સાઈઝનું Array (`['S', 'M', 'L', 'XL']`) અને ફેબ્રિકની વિગતો રહેલી છે.

---

## ૫. `src/components/Navbar.jsx` - સ્ટીકી હેડર અને મેનુ

### 💻 Code Snippet:
```jsx
const Navbar = () => {
  const { cartCount, wishlist, openCart, openSearch } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-sticky">
      <div className="container navbar-container">
        {/* Mobile Hamburger Button */}
        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="nav-brand">
          <div className="brand-emblem"><Sparkles size={20} /></div>
          <span className="brand-name">VASTRIKA</span>
        </Link>

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/shop">Shop</NavLink></li>
          <li><NavLink to="/shop?category=Men">Men</NavLink></li>
          <li><NavLink to="/shop?category=Women">Women</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>

        {/* Search, Wishlist, Cart Icons */}
        <div className="nav-actions">
          <button className="action-btn" onClick={openSearch}><Search size={20} /></button>
          <Link to="/wishlist" className="action-btn">
            <Heart size={20} />
            {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
          </Link>
          <button className="action-btn" onClick={openCart}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};
```

### 🔍 શું કામ કરે છે?:
- **`cartCount > 0 && <span className="badge-count">`**: કાર્ટમાં જેટલી વસ્તુઓ ઉમેરાય તેટલો આંકડો લાલ બેજમાં લાઈવ અપડેટ થાય છે.
- **`mobileMenuOpen`**: મોબાઈલમાં Hamburger મેનુ પર ક્લિક કરવાથી સ્લાઈડિંગ મેનુ ઓપન/ક્લોઝ થાય છે.
- **`openSearch` & `openCart`**: સર્ચ અને કાર્ટ મોડલ્સને ટ્રિગર કરે છે.

---

## ૬. `src/components/ProductCard.jsx` - પ્રોડક્ટ કાર્ડ

### 💻 Code Snippet:
```jsx
const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : 'Free Size'
  );

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* Wishlist Heart Toggle */}
        <button
          className={`product-wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
        >
          <Heart size={18} fill={inWishlist ? '#6B1724' : 'none'} color={inWishlist ? '#6B1724' : '#201715'} />
        </button>

        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.name} loading="lazy" />
        </Link>

        {/* Quick View Button */}
        <button className="product-quick-view" onClick={() => openQuickView(product)}>
          <Eye size={16} /> Quick View
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-price-row">
          <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="discount-badge">{product.discount}% OFF</span>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleAddToCart}>
          <ShoppingBag size={16} /> Add to Bag
        </button>
      </div>
    </div>
  );
};
```

### 🔍 શું કામ કરે છે?:
- **`toggleWishlist`**: હાર્ટ આઈકોન દબાવતાં પ્રોડક્ટ વિશલિસ્ટમાં ઉમેરાય છે અથવા દૂર થાય છે અને હાર્ટનો કલર લાલ થઈ જાય છે.
- **`openQuickView`**: પેજ બદલ્યા વગર જ પૉપઅપમાં પ્રોડક્ટની સાઈઝ અને ડિટેલ્સ જોવા મળે છે.
- **`toLocaleString('en-IN')`**: કિંમતને ભારતીય ફોર્મેટમાં (દા.ત. `18,999`) દર્શાવે છે.

---

## ૭. `src/components/CartDrawer.jsx` - સ્લાઈડિંગ કાર્ટ

### 💻 Code Snippet:
```jsx
const CartDrawer = () => {
  const { cart, isCartOpen, closeCart, cartCount, cartSubtotal, openCheckout } = useCart();

  const freeShippingThreshold = 1999;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <>
      <div className={`drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={closeCart} />
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>Shopping Bag ({cartCount})</h3>
          <button onClick={closeCart}><X size={20} /></button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="shipping-progress">
          {cartSubtotal >= freeShippingThreshold ? (
            <span>You unlocked FREE Luxury Shipping! 🚚</span>
          ) : (
            <span>Add ₹{remainingForFreeShipping} more for Free Shipping</span>
          )}
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Items List */}
        <div className="drawer-body">
          {cart.map((item, idx) => (
            <CartItem key={`${item.product.id}-${item.selectedSize}-${idx}`} item={item} closeDrawer={closeCart} />
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-subtotal">
              <span>Subtotal:</span>
              <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            <button className="btn btn-primary" onClick={openCheckout}>
              Checkout <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
```

### 🔍 શું કામ કરે છે?:
- **`progressPercent`**: ₹1,999 ની ફ્રી શિપિંગ લિમિટ સુધી પહોંચવા કેટલા રૂપિયા બાકી છે તે બાર (ProgressBar) રૂપે એનિમેશન સાથે બતાવે છે.
- **`isCartOpen ? 'open' : ''`**: CSS ટ્રાન્ઝિશન વડે સ્મૂથ રીતે જમણી બાજુથી સ્ક્રીન પર સ્લાઈડ થાય છે.

---

## ૮. `src/components/CheckoutModal.jsx` - ચેકઆઉટ અને ઓર્ડર

### 💻 Code Snippet:
```jsx
const handlePlaceOrder = (e) => {
  e.preventDefault();
  // ઓર્ડર આઈડી જનરેટ કરવો
  const generatedId = `VST-${Math.floor(100000 + Math.random() * 900000)}`;
  setOrderId(generatedId);
  setOrderPlaced(true); // ઓર્ડર સક્સેસ સ્ક્રીન બતાવો
  clearCart(); // કાર્ટ ખાલી કરો
  addToast('Order placed successfully! Congratulations 🎉', 'success');
};
```

### 🔍 શું કામ કરે છે?:
- ગ્રાહકનું નામ, ફોન, એડ્રેસ, શહેર, પિનકોડ અને પેમેન્ટ મોડ (UPI, કાર્ડ, નેટબેન્કિંગ, કેશ ઓન ડિલિવરી) લઈને ઓર્ડર કન્ફર્મ કરે છે.
- ઓર્ડર સફળ થતાં કાર્ટ ઓટોમેટિકલી ખાલી થઈ જાય છે અને ઓર્ડર નંબર (દા.ત. `#VST-513925`) સાથેની રસીદ બતાવે છે.

---

## ૯. `src/pages/Shop.jsx` - લાઈવ ફિલ્ટર અને શોપિંગ

### 💻 Code Snippet:
```jsx
const filteredProducts = useMemo(() => {
  return PRODUCTS.filter((product) => {
    // ૧. Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = product.name.toLowerCase().includes(q) || product.fabric.toLowerCase().includes(q);
      if (!match) return false;
    }

    // ૨. Category Filter
    if (selectedCategory !== 'All') {
      if (product.category.toLowerCase() !== selectedCategory.toLowerCase() &&
          product.subCategory.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }

    // ૩. Price Range Filter
    if (product.price < selectedPriceRange.min || product.price > selectedPriceRange.max) {
      return false;
    }

    // ૪. Size Filter
    if (selectedSize !== 'All') {
      if (!product.sizes || !product.sizes.includes(selectedSize)) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });
}, [selectedCategory, selectedPriceRange, selectedSize, sortBy, searchQuery]);
```

### 🔍 શું કામ કરે છે?:
- **`useMemo`**: જ્યારે પણ યુઝર કેટેગરી બદલે, સર્ચમાં ટાઈપ કરે, સાઈઝ કે પ્રાઈસ પસંદ કરે ત્યારે આ ફંક્શન તાત્કાલિક ફિલ્ટર કરીને સાચા પરિણામો આપે છે.
- **`.sort(...)`**: ભાવ ઓછાથી વધુ કે વધુથી ઓછા મુજબ પ્રોડક્ટ્સને તરત ગોઠવે છે.

---

## ૧૦. `src/pages/Cart.jsx` - કાર્ટ પેજ અને કુપન એન્જિન

### 💻 Code Snippet:
```jsx
const handleApplyCoupon = (e) => {
  e.preventDefault();
  if (couponInput.trim()) {
    applyPromo(couponInput.trim()); // 'VASTRIKA20' ચેક કરશે
    setCouponInput('');
  }
};
```

### 🔍 શું કામ કરે છે?:
- જો યુઝર `VASTRIKA20` નાખે તો `CartContext` માંથી ૨૦% ડિસ્કાઉન્ટ કેલ્ક્યુલેટ થઈને ટોટલ રકમ ઓછી થઈ જાય છે.
- જો ઓર્ડર ₹1,999 થી વધુ હોય તો શિપિંગ ચાર્જ ₹0 થઈ જાય છે.

---

## 💡 પ્રોજેક્ટના મુખ્ય ફાયદા (Highlights for Viva/Interviews)
1. **Pure Vanilla CSS**: કોઈ Bootstrap કે Tailwind વગર સંપૂર્ણ કસ્ટમ રિસ્પોન્સિવ CSS અને એનિમેશન.
2. **State Management**: Redux જેવા ભારે ટૂલ વગર React ના બિલ્ટ-ઇન `Context API` + `useReducer`/`useState` થી સ્વચ્છ કોડિંગ.
3. **Data Persistence**: `localStorage` વડે ડેટા સાચવી રાખવો.
4. **Clean Code**: Reusable Components, DRY (Don't Repeat Yourself) પ્રિન્સિપલ અને Responsive Media Queries.
