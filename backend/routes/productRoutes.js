import express from 'express';
import {
  getProducts,
  getProductById,
  getCategoriesSummary,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from '../controllers/productController.js';
import { protect, admin, optionalProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.get('/categories/summary', getCategoriesSummary);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.post('/:id/reviews', optionalProtect, createProductReview);

export default router;
