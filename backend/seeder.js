import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Contact from './models/Contact.js';
import { connectDB } from './config/db.js';

dotenv.config();

const INITIAL_USERS = [
  {
    name: 'Vastrika Administrator',
    email: 'admin@vastrika.com',
    password: 'Admin@123',
    role: 'admin',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    addresses: [
      {
        fullName: 'Vastrika Heritage HQ',
        phone: '+91 98765 43210',
        street: 'Heritage Boulevard, Palace Road',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001',
        isDefault: true,
      },
    ],
  },
  {
    name: 'Harsh Vaghela',
    email: 'user@vastrika.com',
    password: 'User@123',
    role: 'user',
    phone: '+91 98989 89898',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    addresses: [
      {
        fullName: 'Harsh Vaghela',
        phone: '+91 98989 89898',
        street: '402, Royal Residency, CG Road',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380009',
        isDefault: true,
      },
    ],
  },
];

const INITIAL_PRODUCTS = [
  {
    customId: 'vast-001',
    name: 'Royal Crimson Velvet Embroidered Lehenga Set',
    category: 'Women',
    subCategory: 'Traditional Wear',
    price: 18999,
    originalPrice: 24999,
    discount: 24,
    rating: 4.9,
    reviewCount: 142,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Crimson Maroon & Gold', hex: '#800020' }],
    fabric: 'Micro Velvet with Pure Organza Dupatta',
    craft: 'Dabka, Zardozi, and Resham Threadwork',
    occasion: 'Bridal & Festive',
    care: 'Strictly Dry Clean Only',
    dispatchTime: '3-5 business days',
    description: 'An ode to royal Rajasthani heritage, this crimson velvet lehenga features handcrafted dabka, zardozi, and resham thread embroidery complemented by a sheer shimmering organza dupatta with intricate scalloped borders.',
    tags: ['Bestseller', 'Lehenga', 'Bridal', 'Velvet', 'Festive'],
  },
  {
    customId: 'vast-002',
    name: 'Imperial Raw Silk Embroidered Sherwani with Stole',
    category: 'Men',
    subCategory: 'Ethnic Wear',
    price: 21499,
    originalPrice: 28999,
    discount: 26,
    rating: 4.8,
    reviewCount: 98,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Ivory Gold & Muted Sand', hex: '#FFFFF0' }],
    fabric: '100% Pure Matka Raw Silk',
    craft: 'Tonal Bullion & French-Knot Floral Embroidery',
    occasion: 'Wedding & Groom',
    care: 'Dry Clean Only',
    dispatchTime: '4-6 business days',
    description: 'A masterpiece for the modern groom and festive connoisseur. Tailored from premium unrefined raw silk with tonal bullion embroidery, metal crest buttons, and an antique gold zari woven stole.',
    tags: ['Royal Edition', 'Sherwani', 'Groom', 'Silk', 'Men'],
  },
  {
    customId: 'vast-003',
    name: 'Chanderi Silk Gold Zari Angrakha Anarkali Suit',
    category: 'Women',
    subCategory: 'Ethnic Wear',
    price: 7499,
    originalPrice: 9999,
    discount: 25,
    rating: 4.9,
    reviewCount: 86,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Emerald Green & Antique Gold', hex: '#50C878' }],
    fabric: 'Chanderi Katan Silk',
    craft: 'Woven Gold Booti & Gotta Patti Border',
    occasion: 'Celebration & Sangeet',
    care: 'Dry Clean Recommended',
    dispatchTime: '2-4 business days',
    description: 'Radiate timeless grace in this deep emerald green Angrakha silhouette cut from authentic Chanderi silk with woven gold booti motifs and gotta patti border accents.',
    tags: ['New Arrival', 'Anarkali', 'Chanderi', 'Green', 'Festive'],
  },
  {
    customId: 'vast-004',
    name: 'Tussar Georgette Handwoven Banarasi Saree',
    category: 'Women',
    subCategory: 'Traditional Wear',
    price: 12999,
    originalPrice: 16999,
    discount: 23,
    rating: 5.0,
    reviewCount: 114,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Free Size'],
    colors: [{ name: 'Maroon Ruby & Vintage Gold', hex: '#841B2D' }],
    fabric: 'Pure Banarasi Tussar Silk with Kadwa Weave',
    craft: 'Kadwa Weave & Floral Meenakari Zari',
    occasion: 'Heritage Wedding & Festive',
    care: 'Dry Clean Only, Store in Cotton Bag',
    dispatchTime: '3-5 business days',
    description: 'Woven over 24 days on traditional Varanasi pit looms, this regal saree showcases delicate floral jaal in antique gold kadwa technique with an ornate pallu.',
    tags: ['Heritage Heirloom', 'Saree', 'Banarasi', 'Silk', 'Traditional'],
  },
  {
    customId: 'vast-005',
    name: 'Hand-block Printed Indigo Khadi Cotton Kurta',
    category: 'Men',
    subCategory: 'Casual Wear',
    price: 2499,
    originalPrice: 3499,
    discount: 28,
    rating: 4.7,
    reviewCount: 73,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: false,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Natural Indigo & Off-White', hex: '#264348' }],
    fabric: '100% Hand-spun Organic Khadi Cotton',
    craft: 'Bagru Natural Dabu Block Print',
    occasion: 'Casual & Day Festive',
    care: 'Gentle Machine Wash with Cold Water',
    dispatchTime: '2-3 business days',
    description: 'Infuse artisanal simplicity into your day-to-day style. Hand-dyed with natural plant indigo and stamped with traditional Bagru geometric block motifs.',
    tags: ['Sustainable', 'Khadi', 'Kurta', 'Indigo', 'Men'],
  },
  {
    customId: 'vast-006',
    name: 'Artisanal Embroidered Brocade Nehru Jacket',
    category: 'Men',
    subCategory: 'Ethnic Wear',
    price: 4999,
    originalPrice: 6999,
    discount: 28,
    rating: 4.8,
    reviewCount: 65,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Midnight Navy & Burnished Gold', hex: '#000080' }],
    fabric: 'Jacquard Silk Brocade Blend',
    craft: 'Woven Damask & Brass Crest Buttons',
    occasion: 'Festive & Family Celebrations',
    care: 'Dry Clean Only',
    dispatchTime: '3-4 business days',
    description: 'Transform any simple kurta or shirt into celebratory finery. Features a subtle textured damask pattern, structured chest pocket, and bespoke brass crest buttons.',
    tags: ['Festive Classic', 'Nehru Jacket', 'Brocade', 'Men'],
  },
  {
    customId: 'vast-007',
    name: 'Midnight Blue Hand-Embroidered Velvet Bandhgala Suit',
    category: 'Men',
    subCategory: 'Traditional Wear',
    price: 16499,
    originalPrice: 21999,
    discount: 25,
    rating: 4.9,
    reviewCount: 47,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: false,
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Midnight Blue', hex: '#191970' }],
    fabric: 'Italian Velvet & Fine Wool Blend',
    craft: 'Hand-Embroidered Crest & Horn Buttons',
    occasion: 'Reception & Grand Gala',
    care: 'Dry Clean Only',
    dispatchTime: '4-5 business days',
    description: 'The epitome of refined Indo-Western tailoring. Designed with a sharply structured shoulder profile, intricate tonal cuff embroidery, and horn buttons.',
    tags: ['Premium Luxury', 'Bandhgala', 'Velvet', 'Suit', 'Men'],
  },
  {
    customId: 'vast-008',
    name: 'Floral Resham Chikankari Pastel Kurta Set',
    category: 'Women',
    subCategory: 'Casual Wear',
    price: 5299,
    originalPrice: 6999,
    discount: 24,
    rating: 4.8,
    reviewCount: 92,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Blush Rose & Soft Pearl', hex: '#FFB6C1' }],
    fabric: 'Pure Georgette with Cotton Inner Slip',
    craft: 'Lucknowi Shadow Work & Phanda Hand Stitches',
    occasion: 'Day Events & Festive Parties',
    care: 'Dry Clean or Gentle Hand Wash',
    dispatchTime: '2-4 business days',
    description: 'Authentic handcrafted Lucknowi Chikankari featuring intricate shadow work, phanda, and murri stitches accentuated with tiny hand-placed pearl beads.',
    tags: ['Trending', 'Chikankari', 'Pastel', 'Kurta Set', 'Women'],
  },
  {
    customId: 'vast-009',
    name: 'Modern Cut Linen Blend Casual Kurti',
    category: 'Women',
    subCategory: 'Casual Wear',
    price: 2199,
    originalPrice: 2999,
    discount: 26,
    rating: 4.6,
    reviewCount: 54,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: false,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Oatmeal Beige & Ochre', hex: '#F5F5DC' }],
    fabric: 'Premium French Flax Linen Blend',
    craft: 'Asymmetrical Cut & Natural Slub Texture',
    occasion: 'Everyday Work & Weekend Comfort',
    care: 'Machine Wash Normal',
    dispatchTime: '2-3 business days',
    description: 'An understated contemporary essential crafted from breezy linen-cotton blend. Features asymmetrical hemline, subtle wooden button detailing, and side pockets.',
    tags: ['Everyday Essential', 'Kurti', 'Linen', 'Comfort', 'Women'],
  },
  {
    customId: 'vast-010',
    name: 'Handcrafted Zardozi Leather Mojaris',
    category: 'Accessories',
    subCategory: 'Accessories',
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.9,
    reviewCount: 88,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Rich Antique Gold & Tan', hex: '#D4AF37' }],
    fabric: 'Genuine Top-Grain Leather with Silk Embroidered Upper',
    craft: 'Jodhpuri Handcrafting & Zardozi Dabka',
    occasion: 'Festive & Celebration',
    care: 'Wipe with Dry Cloth, Keep Away from Moisture',
    dispatchTime: '3-4 business days',
    description: 'Traditional Jodhpuri jutis handcrafted by master leather artisans. Cushioned with memory foam footbeds to ensure royal comfort during long wedding festivities.',
    tags: ['Handmade Footwear', 'Mojaris', 'Leather', 'Gold', 'Accessories'],
  },
  {
    customId: 'vast-011',
    name: 'Pure Silk Brocade Heritage Potli Bag with Pearl Handle',
    category: 'Accessories',
    subCategory: 'Accessories',
    price: 1899,
    originalPrice: 2599,
    discount: 27,
    rating: 4.8,
    reviewCount: 61,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Free Size'],
    colors: [{ name: 'Ruby Red & Gold', hex: '#9B111E' }],
    fabric: 'Pure Banarasi Brocade with Satin Lining',
    craft: 'Handcrafted Latkans & Pearl Beaded Handle',
    occasion: 'Weddings & Festive Evenings',
    care: 'Spot Clean Only',
    dispatchTime: '2-3 business days',
    description: 'A sumptuous festive pouch featuring genuine Banarasi woven motifs, heavy golden latkans, and a multi-strand faux pearl carrying handle.',
    tags: ['Festive Accessory', 'Potli', 'Silk', 'Bag', 'Accessories'],
  },
  {
    customId: 'vast-012',
    name: 'Antique Gold Brass Crest & Enamel Cufflinks Set',
    category: 'Accessories',
    subCategory: 'Accessories',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.7,
    reviewCount: 39,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: false,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Free Size'],
    colors: [{ name: 'Antique Gold & Royal Green Enamel', hex: '#006400' }],
    fabric: 'Solid Brass with 24k Micron Gold Plating',
    craft: 'Rajputana Seal Meenakari Enameling',
    occasion: 'Groom & Black Tie Ethnic',
    care: 'Store in airtight velvet box provided',
    dispatchTime: '2-4 business days',
    description: 'Inspired by royal Rajputana seals, these ornate cufflinks and kurta buttons set feature meenakari green enamel work surrounded by micro-engraved borders.',
    tags: ['Groom Accessory', 'Cufflinks', 'Gold Plated', 'Men Accessories'],
  },
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Contact.deleteMany();

    console.log('\x1b[33mOld database collections cleared...\x1b[0m');

    // Create users
    const createdUsers = [];
    for (const u of INITIAL_USERS) {
      const user = await User.create(u);
      createdUsers.push(user);
    }
    console.log(`\x1b[32m${createdUsers.length} Users seeded successfully!\x1b[0m`);

    // Create products
    const sampleProducts = INITIAL_PRODUCTS.map((product) => ({
      ...product,
    }));
    await Product.insertMany(sampleProducts);
    console.log(`\x1b[32m${sampleProducts.length} Luxury Ethnic Products seeded successfully!\x1b[0m`);

    // Create a demo contact inquiry
    await Contact.create({
      name: 'Pooja Sharma',
      email: 'pooja.sharma@example.com',
      phone: '+91 98111 22233',
      subject: 'Custom Bridal Fitting Inquiry',
      message: 'Hello, I would like to inquire about customized measurements for the Crimson Velvet Lehenga.',
      status: 'New',
    });

    console.log('\x1b[32m✓ Vastrika database successfully initialized!\x1b[0m');
    process.exit();
  } catch (error) {
    console.error(`\x1b[31mError importing data: ${error.message}\x1b[0m`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Contact.deleteMany();

    console.log('\x1b[31mData Destroyed from MongoDB!\x1b[0m');
    process.exit();
  } catch (error) {
    console.error(`\x1b[31mError destroying data: ${error.message}\x1b[0m`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
