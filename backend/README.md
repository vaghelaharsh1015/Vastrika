# 👑 Vastrika Backend API

Robust, scalable REST API for **Vastrika - Luxury Ethnic Wear & Handloom Couture** built with Node.js, Express.js, and MongoDB (Mongoose).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Ensure `.env` exists in the `backend/` directory with:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/vastrika
JWT_SECRET=vastrika_super_secret_jwt_key_2025_luxury_ethnic_fashion
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```
*(You can also provide a MongoDB Atlas cloud URI for `MONGO_URI`)*

### 3. Seed Database with Initial Catalog & Demo Accounts
```bash
npm run data:import
```
*To wipe data:* `npm run data:destroy`

### 4. Run Server
```bash
# Development (with auto reload)
npm run dev

# Production
npm start
```
The server will start at: `http://localhost:5000`

---

## 🔐 Default Seed Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@vastrika.com` | `Admin@123` |
| **Demo User** | `user@vastrika.com` | `User@123` |

---

## 📡 API Endpoints

### 1. Authentication (`/api/auth`)
- `POST /api/auth/register` - Create new customer account
- `POST /api/auth/login` - Authenticate & obtain JWT
- `GET /api/auth/profile` - Get logged-in user profile (Bearer token)
- `PUT /api/auth/profile` - Update profile & saved addresses (Bearer token)
- `GET /api/auth/users` - Admin: Get all registered customers

### 2. Products (`/api/products`)
- `GET /api/products` - Filtered list (keyword, category, minPrice, maxPrice, sortBy, page, limit)
- `GET /api/products/:id` - Single product details by ID or custom ID (e.g. `vast-001`)
- `GET /api/products/categories/summary` - Aggregate category counts and starting prices
- `POST /api/products` - Admin: Create new product
- `PUT /api/products/:id` - Admin: Update product details
- `DELETE /api/products/:id` - Admin: Remove product
- `POST /api/products/:id/reviews` - Add verified buyer review

### 3. Orders & Checkout (`/api/orders`)
- `POST /api/orders` - Place new order (supports guest and logged-in users)
- `GET /api/orders/myorders` - Logged in customer's order history
- `GET /api/orders/:id` - Order tracking and invoice details
- `GET /api/orders` - Admin: View all store orders
- `PUT /api/orders/:id/status` - Admin: Update fulfillment status (`Placed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`)

### 4. Contact & Inquiries (`/api/contact`)
- `POST /api/contact` - Submit customer inquiry or bridal consultation request
- `GET /api/contact` - Admin: View customer inquiries
- `PUT /api/contact/:id/status` - Admin: Update inquiry status

### 5. Admin Dashboard Analytics (`/api/admin`)
- `GET /api/admin/dashboard` - Real-time statistics: Total Revenue, Orders count, Customer count, Products count, Category distribution, Recent transactions.
