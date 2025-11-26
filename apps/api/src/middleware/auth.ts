/**
 * Authentication middleware
 */

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config';

export interface AuthRequest extends Request {
  userId?: string;
}

/**
 * Verify JWT token and attach user ID to request
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'No token provided' },
      });
      return;
    }

    const token = authHeader.substring(7);
    
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    (req as AuthRequest).userId = decoded.userId;
    
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        error: { code: 'TOKEN_EXPIRED', message: 'Token has expired' },
      });
      return;
    }
    
    res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: 'Invalid token' },
    });
  }
}

/**
 * Optional authentication - doesn't fail if no token provided
 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
      (req as AuthRequest).userId = decoded.userId;
    }
  } catch (_error) {
    // Ignore errors for optional auth
  }
  
  next();
}
