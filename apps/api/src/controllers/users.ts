/**
 * User controller
 */

import type { Request, Response, NextFunction } from 'express';

import { UserService } from '../services/users';

const userService = new UserService();

export class UserController {
  /**
   * Get user profile
   */
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { userId?: string }).userId;
      const profile = await userService.getProfile(userId!);
      res.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { userId?: string }).userId;
      const profile = await userService.updateProfile(userId!, req.body);
      res.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user preferences
   */
  async updatePreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { userId?: string }).userId;
      const preferences = await userService.updatePreferences(userId!, req.body);
      res.json({
        success: true,
        data: preferences,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user account
   */
  async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { userId?: string }).userId;
      await userService.deleteAccount(userId!);
      res.json({
        success: true,
        message: 'Account deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
