import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, admin, optionalProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(optionalProtect, createOrder)
  .get(protect, admin, getAllOrders);

router.get('/myorders', protect, getMyOrders);

router.route('/:id')
  .get(optionalProtect, getOrderById);

router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
