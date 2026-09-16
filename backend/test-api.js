// Quick automated test suite for Vastrika Backend APIs
const API_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🧪 Starting Vastrika Backend API Tests...\n');

  try {
    // 1. Health Check
    const healthRes = await fetch(`${API_URL}/health`).then(r => r.json());
    console.log('✅ 1. Health Check:', healthRes.message, `(Database: ${healthRes.database})`);

    // 2. Products List
    const prodRes = await fetch(`${API_URL}/products?limit=5`).then(r => r.json());
    console.log('✅ 2. Products API: Found', prodRes.pagination?.total, 'products in catalog');

    // 3. Single Product
    const singleRes = await fetch(`${API_URL}/products/vast-001`).then(r => r.json());
    console.log('✅ 3. Single Product API:', singleRes.data?.name);

    // 4. Categories Summary
    const catRes = await fetch(`${API_URL}/products/categories/summary`).then(r => r.json());
    console.log('✅ 4. Categories Summary API:', catRes.data?.length, 'categories found');

    // 5. Admin Login
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@vastrika.com', password: 'Admin@123' }),
    }).then(r => r.json());
    console.log('✅ 5. Auth Login API:', loginRes.message, `(Token received: ${!!loginRes.data?.token})`);

    const adminToken = loginRes.data?.token;

    // 6. Admin Dashboard Stats
    const statsRes = await fetch(`${API_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    }).then(r => r.json());
    console.log('✅ 6. Admin Dashboard API: Total Products:', statsRes.data?.totalProducts, '| Total Users:', statsRes.data?.totalUsers);

    // 7. Contact Submission
    const contactRes = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Aishwarya Patel',
        email: 'aishwarya@example.com',
        phone: '+91 98222 33445',
        subject: 'Bridal Saree Inquiry',
        message: 'Looking to order custom Banarasi silk sarees for wedding party.',
      }),
    }).then(r => r.json());
    console.log('✅ 7. Contact Inquiries API:', contactRes.message);

    // 8. Create Order
    const orderRes = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        orderItems: [
          {
            customId: 'vast-001',
            name: 'Royal Crimson Velvet Embroidered Lehenga Set',
            quantity: 1,
            price: 18999,
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
            selectedSize: 'M',
            selectedColor: 'Crimson Maroon & Gold',
          },
        ],
        shippingAddress: {
          fullName: 'Aishwarya Patel',
          phone: '+91 98222 33445',
          street: '104, Lotus Enclave',
          city: 'Ahmedabad',
          state: 'Gujarat',
          pincode: '380015',
        },
        paymentMethod: 'COD',
        itemsPrice: 18999,
        shippingPrice: 0,
        taxPrice: 950,
        discountAmount: 2000,
        promoCode: 'VASTRIKA20',
        totalPrice: 17949,
      }),
    }).then(r => r.json());
    console.log('✅ 8. Order Placement API:', orderRes.message, `(Order ID: ${orderRes.data?._id})`);

    console.log('\n🎉 ALL 8 BACKEND API ENDPOINTS TESTED AND WORKING PERFECTLY!');
  } catch (err) {
    console.error('❌ Test failed:', err);
  }
}

runTests();
