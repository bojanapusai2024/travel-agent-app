/**
 * Trip controller
 */

import type { Request, Response, NextFunction } from 'express';

import { TripService } from '../services/trips';

const tripService = new TripService();

export class TripController {
  /**
   * Get all trips for current user
   */
  async getTrips(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { userId?: string }).userId;
      const trips = await tripService.getTrips(userId!);
      res.json({
        success: true,
        data: trips,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get trip by ID
   */
  async getTripById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const trip = await tripService.getTripById(id);
      if (!trip) {
        res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Trip not found' },
        });
        return;
      }
      res.json({
        success: true,
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new trip
   */
  async createTrip(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { userId?: string }).userId;
      const trip = await tripService.createTrip({ ...req.body, createdById: userId });
      res.status(201).json({
        success: true,
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update trip
   */
  async updateTrip(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const trip = await tripService.updateTrip(id, req.body);
      res.json({
        success: true,
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete trip
   */
  async deleteTrip(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await tripService.deleteTrip(id);
      res.json({
        success: true,
        message: 'Trip deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
