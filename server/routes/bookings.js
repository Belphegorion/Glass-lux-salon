// server/routes/bookings.js
import express from 'express';
import * as ctrl from '../controllers/bookingsController.js';
import auth from '../middleware/auth.js';
import adminOnly from '../middleware/admin.js';

const router = express.Router();

router.post('/', auth, ctrl.createBooking);
router.get('/my', auth, ctrl.listBookingsForUser);
router.get('/', auth, adminOnly, ctrl.listBookings);
router.get('/:id', auth, ctrl.getBooking);
router.put('/:id', auth, ctrl.updateBooking);
router.delete('/:id', auth, adminOnly, ctrl.deleteBooking);

export default router;
