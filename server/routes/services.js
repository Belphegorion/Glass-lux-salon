import express from 'express';
import * as ctrl from '../controllers/servicesController.js';
const router = express.Router();
router.get('/', ctrl.listServices);
router.post('/', ctrl.createService);
router.get('/:id', ctrl.getService);
router.put('/:id', ctrl.updateService);
router.delete('/:id', ctrl.deleteService);
export default router;
