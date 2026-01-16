import express from 'express';
import * as ctrl from '../controllers/seedController.js';

const router = express.Router();

router.post('/seed', ctrl.seedDatabase);

export default router;
