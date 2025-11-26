/**
 * API-specific types
 */

import type { Request } from 'express';

/**
 * Request with authenticated user
 */
export interface AuthenticatedRequest extends Request {
  userId: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  };
}
