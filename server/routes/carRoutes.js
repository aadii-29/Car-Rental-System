import express from 'express';
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/carController.js';

import { protect, adminOnly } from '../middlware/authMiddleware.js';
import upload from '../middlware/upload.js';

const router = express.Router();

// Public
router.get('/', getAllCars);
router.get('/:id', getCarById);

// Admin-only (image upload)
router.post('/', protect, adminOnly, upload.single('image'), createCar);
router.put('/:id', protect, adminOnly, upload.single('image'), updateCar);
router.delete('/:id', protect, adminOnly, deleteCar);

export default router;
