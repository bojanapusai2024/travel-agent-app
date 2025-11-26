/**
 * Shared constants
 * @module @travel-agent/shared/constants
 */

export * from './roles';
export * from './categories';

/** Supported currencies */
export const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
] as const;

/** Default currency code */
export const DEFAULT_CURRENCY = 'USD';

/** Supported languages */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '中文' },
] as const;

/** Default language code */
export const DEFAULT_LANGUAGE = 'en';

/** API rate limits */
export const RATE_LIMITS = {
  /** Requests per window */
  MAX_REQUESTS: 100,
  /** Window duration in milliseconds (15 minutes) */
  WINDOW_MS: 15 * 60 * 1000,
  /** Auth endpoints rate limit */
  AUTH_MAX_REQUESTS: 10,
  /** File upload rate limit */
  UPLOAD_MAX_REQUESTS: 20,
} as const;

/** Pagination defaults */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 20,
  MAX_PER_PAGE: 100,
} as const;

/** File upload limits */
export const FILE_UPLOAD = {
  /** Maximum file size in bytes (10MB) */
  MAX_SIZE: 10 * 1024 * 1024,
  /** Allowed image types */
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  /** Allowed document types */
  ALLOWED_DOCUMENT_TYPES: ['application/pdf'],
} as const;

/** Location tracking settings */
export const LOCATION_TRACKING = {
  /** Minimum update interval in milliseconds (30 seconds) */
  MIN_UPDATE_INTERVAL: 30 * 1000,
  /** Default update interval in milliseconds (5 minutes) */
  DEFAULT_UPDATE_INTERVAL: 5 * 60 * 1000,
  /** Maximum update interval in milliseconds (30 minutes) */
  MAX_UPDATE_INTERVAL: 30 * 60 * 1000,
  /** Minimum accuracy in meters */
  MIN_ACCURACY: 100,
  /** Default geofence radius in meters */
  DEFAULT_GEOFENCE_RADIUS: 500,
} as const;
