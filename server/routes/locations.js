import express from 'express';
import * as ctrl from '../controllers/locationsController.js';
import auth from '../middleware/auth.js';
import adminOnly from '../middleware/admin.js';

const router = express.Router();

router.get('/', ctrl.listLocations);
router.post('/', auth, adminOnly, ctrl.createLocation);
router.get('/:id', ctrl.getLocation);
router.put('/:id', auth, adminOnly, ctrl.updateLocation);
router.delete('/:id', auth, adminOnly, ctrl.deleteLocation);

export default router;
