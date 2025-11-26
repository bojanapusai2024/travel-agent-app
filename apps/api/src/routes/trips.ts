/**
 * Trip routes
 */

import { Router, type Router as ExpressRouter } from 'express';

import { TripController } from '../controllers/trips';
import { authenticate } from '../middleware/auth';

const router: ExpressRouter = Router();
const tripController = new TripController();

// All routes require authentication
router.use(authenticate);

// GET /api/v1/trips
router.get('/', tripController.getTrips);

// GET /api/v1/trips/:id
router.get('/:id', tripController.getTripById);

// POST /api/v1/trips
router.post('/', tripController.createTrip);

// PUT /api/v1/trips/:id
router.put('/:id', tripController.updateTrip);

// DELETE /api/v1/trips/:id
router.delete('/:id', tripController.deleteTrip);

export default router;
