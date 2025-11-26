/**
 * User routes
 */

import { Router, type Router as ExpressRouter } from 'express';

import { UserController } from '../controllers/users';
import { authenticate } from '../middleware/auth';

const router: ExpressRouter = Router();
const userController = new UserController();

// All routes require authentication
router.use(authenticate);

// GET /api/v1/users/profile
router.get('/profile', userController.getProfile);

// PUT /api/v1/users/profile
router.put('/profile', userController.updateProfile);

// PUT /api/v1/users/preferences
router.put('/preferences', userController.updatePreferences);

// DELETE /api/v1/users/account
router.delete('/account', userController.deleteAccount);

export default router;
