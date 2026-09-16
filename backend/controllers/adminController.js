import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Contact from '../models/Contact.js';

// @desc    Get dashboard statistics for Admin
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalInquiries = await Contact.countDocuments();

    // Calculate Total Revenue
    const orders = await Order.find({ orderStatus: { $ne: 'Cancelled' } });
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    // Recent 5 Orders
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    // Recent 5 Inquiries
    const recentInquiries = await Contact.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    // Category breakdown
    const categoryStats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    // Order status breakdown
    const orderStatusStats = await Order.aggregate([
      { $group: { _id: '$orderStatus', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalUsers,
        totalInquiries,
        categoryStats,
        orderStatusStats,
        recentOrders,
        recentInquiries,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching admin dashboard statistics',
    });
  }
};
