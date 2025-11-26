/**
 * API routes
 */

import { Router, type Router as ExpressRouter } from 'express';

import authRoutes from './auth';
import tripRoutes from './trips';
import expenseRoutes from './expenses';
import userRoutes from './users';

export const router: ExpressRouter = Router();

// API version prefix
const API_VERSION = '/v1';

// Mount routes
router.use(`${API_VERSION}/auth`, authRoutes);
router.use(`${API_VERSION}/trips`, tripRoutes);
router.use(`${API_VERSION}/expenses`, expenseRoutes);
router.use(`${API_VERSION}/users`, userRoutes);

// API info endpoint
router.get('/', (_req, res) => {
  res.json({
    name: 'Travel Agent API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      auth: `${API_VERSION}/auth`,
      trips: `${API_VERSION}/trips`,
      expenses: `${API_VERSION}/expenses`,
      users: `${API_VERSION}/users`,
    },
  });
});

export default router;
