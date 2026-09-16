import express from 'express';
import {
  submitContact,
  getAllInquiries,
  updateInquiryStatus,
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(submitContact)
  .get(protect, admin, getAllInquiries);

router.route('/:id/status')
  .put(protect, admin, updateInquiryStatus);

export default router;
