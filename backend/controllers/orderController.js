import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (Guest checkout supported) or Private
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discountAmount,
      promoCode,
      totalPrice,
      guestInfo,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items found in request',
      });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street) {
      return res.status(400).json({
        success: false,
        message: 'Valid shipping address is required',
      });
    }

    const order = new Order({
      user: req.user ? req.user._id : undefined,
      guestInfo: guestInfo || (req.user ? { fullName: req.user.name, email: req.user.email, phone: req.user.phone } : {}),
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      itemsPrice: Number(itemsPrice) || 0,
      taxPrice: Number(taxPrice) || 0,
      shippingPrice: Number(shippingPrice) || 0,
      discountAmount: Number(discountAmount) || 0,
      promoCode: promoCode || '',
      totalPrice: Number(totalPrice) || 0,
      isPaid: paymentMethod !== 'COD',
      paidAt: paymentMethod !== 'COD' ? Date.now() : null,
      orderStatus: 'Placed',
    });

    const createdOrder = await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: createdOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to place order',
    });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Public / Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');

    if (order) {
      res.json({
        success: true,
        data: order,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, isPaid } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;
      if (orderStatus === 'Delivered') {
        order.deliveredAt = Date.now();
        order.isPaid = true;
        if (!order.paidAt) order.paidAt = Date.now();
      }
    }

    if (isPaid !== undefined) {
      order.isPaid = isPaid;
      if (isPaid && !order.paidAt) {
        order.paidAt = Date.now();
      }
    }

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
