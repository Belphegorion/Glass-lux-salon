// server/controllers/bookingsController.js
import Booking from '../models/Booking.js';
import Stylist from '../models/Stylist.js';
import Service from '../models/Service.js';
import Location from '../models/Location.js';

export async function createBooking(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Authentication required' });

    const { service, stylist, location, date, time, notes } = req.body;
    
    if (!service || !stylist || !location || !date || !time) {
      return res.status(400).json({ error: 'Missing required booking fields' });
    }

    // Get service details for price and duration
    const serviceDoc = await Service.findById(service);
    if (!serviceDoc) return res.status(404).json({ error: 'Service not found' });

    // Check for conflicts
    const bookingDate = new Date(date);
    const conflicts = await Booking.find({
      stylist,
      date: bookingDate,
      time,
      status: { $ne: 'cancelled' }
    });

    if (conflicts.length > 0) {
      return res.status(409).json({ error: 'Time slot already booked' });
    }

    const booking = await Booking.create({
      user: userId,
      service,
      stylist,
      location,
      date: bookingDate,
      time,
      duration: serviceDoc.duration || 60,
      price: serviceDoc.price,
      notes,
      status: 'confirmed',
      payment: {
        method: 'dummy',
        status: 'paid',
        transactionId: `TXN-${Date.now()}`
      }
    });

    const populated = await Booking.findById(booking._id)
      .populate('service')
      .populate('stylist')
      .populate('location');

    return res.status(201).json({ booking: populated });
  } catch (err) {
    console.error('createBooking error', err);
    return res.status(500).json({ error: 'Server error while creating booking' });
  }
}

export async function listBookingsForUser(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const bookings = await Booking.find({ user: userId })
      .populate('service')
      .populate('stylist')
      .populate('location')
      .sort({ date: -1, time: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function listBookings(req, res) {
  try {
    const bookings = await Booking.find()
      .populate('user', 'firstName lastName email')
      .populate('service')
      .populate('stylist')
      .populate('location')
      .sort({ date: -1, time: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getBooking(req, res) {
  try {
    const b = await Booking.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('service')
      .populate('stylist')
      .populate('location');
    if (!b) return res.status(404).json({ error: 'Not found' });
    const requesterId = req.user?.id;
    if (b.user && b.user._id.toString() !== requesterId && req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json(b);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function updateBooking(req, res) {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('service')
      .populate('stylist')
      .populate('location');
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function deleteBooking(req, res) {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
