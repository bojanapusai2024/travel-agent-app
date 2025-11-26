/**
 * Request validation middleware
 */

import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

/**
 * Validate request body against a Zod schema
 */
export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: error,
        },
      });
    }
  };
}

/**
 * Validate request query parameters against a Zod schema
 */
export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid query parameters',
          details: error,
        },
      });
    }
  };
}

/**
 * Validate request params against a Zod schema
 */
export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid route parameters',
          details: error,
        },
      });
    }
  };
}
