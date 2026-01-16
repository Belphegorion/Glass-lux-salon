import express from 'express';
import * as ctrl from '../controllers/usersController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', auth, ctrl.listUsers);
router.post('/', ctrl.createUser);

export default router;
