// import express from 'express';
// import {
//   createBooking,
//   getAllBookings,
//   getUserBookings,
//   cancelBooking
// } from '../controllers/bookingController.js';

// const router = express.Router();

// // Public / Authenticated routes
// router.post('/', createBooking);
// router.get('/user/:userId', getUserBookings);
// router.put('/cancel/:id', cancelBooking);

// // Admin route

// router.get('/', getAllBookings);

// export default router;


import express from 'express';
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  cancelBooking,
  updateBookingStatus
} from '../controllers/bookingController.js';

import { protect, adminOnly } from '../middlware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/', protect, createBooking);
router.get('/user/:userId', protect, getUserBookings);
router.put('/cancel/:id', protect, cancelBooking);

// Admin routes
router.get('/all', protect, adminOnly, getAllBookings);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);

export default router;
