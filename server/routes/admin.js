import express from 'express';
import adminOnly from '../middleware/admin.js';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import Stylist from '../models/Stylist.js';
import User from '../models/User.js';

const router = express.Router();

// Admin-only endpoints
router.get('/bookings', adminOnly, async (req, res) => {
  const list = await Booking.find().populate('serviceId stylistId userId').lean();
  res.json(list);
});
router.get('/services', adminOnly, async (req, res) => {
  const list = await Service.find().lean();
  res.json(list);
});
router.get('/stylists', adminOnly, async (req, res) => {
  const list = await Stylist.find().lean();
  res.json(list);
});
router.get('/users', adminOnly, async (req, res) => {
  const list = await User.find().lean();
  res.json(list);
});

export default router;
