// server/routes/stylists.js
import express from 'express';
import Stylist from '../models/Stylist.js';
import auth from '../middleware/auth.js';
import adminOnly from '../middleware/admin.js';

const router = express.Router();

// Public: list stylists
router.get('/', async (req, res) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const q = includeInactive ? {} : { isActive: true };
    const list = await Stylist.find(q).populate('services').lean();
    res.json(list);
  } catch (err) {
    console.error('stylists:list', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Public: get single stylist
router.get('/:id', async (req, res) => {
  try {
    const stylist = await Stylist.findById(req.params.id).populate('services').lean();
    if (!stylist) return res.status(404).json({ error: 'Not found' });
    res.json(stylist);
  } catch (err) {
    console.error('stylists:get', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: seed demo stylists
router.post('/seed', auth, adminOnly, async (req, res) => {
  try {
    const sample = [
      { name: 'Isabella Martinez', email: 'isabella@glasslux.com', phone: '(555) 123-4567', specialty: 'Color Specialist', rating: 4.9, yearsExperience: 8, bio: 'Expert in balayage and color correction' },
      { name: 'Sophia Chen', email: 'sophia@glasslux.com', phone: '(555) 123-4568', specialty: 'Hair Cutting', rating: 4.8, yearsExperience: 6, bio: 'Precision cuts and modern styles' },
      { name: 'Emma Thompson', email: 'emma@glasslux.com', phone: '(555) 123-4569', specialty: 'Bridal Styling', rating: 5.0, yearsExperience: 10, bio: 'Specializing in wedding and special occasion styling' },
      { name: 'Olivia Rodriguez', email: 'olivia@glasslux.com', phone: '(555) 123-4570', specialty: 'Extensions', rating: 4.9, yearsExperience: 7, bio: 'Hair extension specialist' }
    ];
    const created = await Stylist.insertMany(sample);
    res.json(created);
  } catch (err) {
    console.error('stylists:seed', err);
    res.status(500).json({ error: 'Seed failed' });
  }
});

// Admin: create
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const s = new Stylist(req.body);
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    console.error('stylists:create', err);
    res.status(500).json({ error: 'Create failed' });
  }
});

// Admin: update
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const updated = await Stylist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error('stylists:update', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// Admin: delete
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Stylist.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error('stylists:delete', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
