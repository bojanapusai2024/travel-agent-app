/**
 * Shared TypeScript types and interfaces
 * @module @travel-agent/shared/types
 */

export * from './user';
export * from './trip';
export * from './expense';
export * from './location';

/**
 * API response wrapper interface
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

/**
 * API error interface
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * API metadata for pagination
 */
export interface ApiMeta {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Date range filter
 */
export interface DateRangeFilter {
  startDate?: Date;
  endDate?: Date;
}

/**
 * Socket event types
 */
export type SocketEventType =
  | 'location:update'
  | 'location:alert'
  | 'expense:created'
  | 'expense:updated'
  | 'expense:deleted'
  | 'trip:updated'
  | 'member:joined'
  | 'member:left'
  | 'notification:new';

/**
 * Socket event payload
 */
export interface SocketEvent<T = unknown> {
  type: SocketEventType;
  payload: T;
  timestamp: Date;
  userId: string;
  tripId: string;
}
