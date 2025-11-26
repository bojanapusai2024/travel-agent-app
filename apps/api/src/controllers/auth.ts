/**
 * Authentication controller
 */

import type { Request, Response, NextFunction } from 'express';

import { AuthService } from '../services/auth';

const authService = new AuthService();

export class AuthController {
  /**
   * Register a new user
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName } = req.body;
      const result = await authService.register({ email, password, firstName, lastName });
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login user
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Logout user
   */
  async logout(_req: Request, res: Response) {
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  }

  /**
   * Get current user
   */
  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { userId?: string }).userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
        });
        return;
      }
      const user = await authService.getUserById(userId);
      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}
