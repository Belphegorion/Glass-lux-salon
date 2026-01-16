// server/routes/notifications.js
import express from 'express';
import auth from '../middleware/auth.js';
import Notification from '../models/Notification.js';
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Auth required' });
    const notes = await Notification.find({ stylist: userId }).sort({ createdAt: -1 }).lean();
    res.json(notes);
  } catch (err) {
    console.error('notifications:me', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
