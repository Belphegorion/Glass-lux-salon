import Location from '../models/Location.js';

export async function listLocations(req, res) {
  try {
    const locations = await Location.find({ isActive: true }).lean();
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function createLocation(req, res) {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Create failed' });
  }
}

export async function getLocation(req, res) {
  try {
    const location = await Location.findById(req.params.id).lean();
    if (!location) return res.status(404).json({ error: 'Not found' });
    res.json(location);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function updateLocation(req, res) {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!location) return res.status(404).json({ error: 'Not found' });
    res.json(location);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
}

export async function deleteLocation(req, res) {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
}
