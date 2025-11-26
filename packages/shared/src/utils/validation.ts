/**
 * Validation utility functions
 */

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone number validation regex (international format)
 */
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

/**
 * UUID validation regex
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Validate email address
 * @param email - Email to validate
 * @returns Whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validate phone number
 * @param phone - Phone number to validate
 * @returns Whether the phone number is valid
 */
export function isValidPhone(phone: string): boolean {
  return PHONE_REGEX.test(phone.replace(/[\s-]/g, ''));
}

/**
 * Validate UUID
 * @param uuid - UUID to validate
 * @returns Whether the UUID is valid
 */
export function isValidUUID(uuid: string): boolean {
  return UUID_REGEX.test(uuid);
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Validation result with details
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (errors.length === 0) {
    strength = password.length >= 12 ? 'strong' : 'medium';
  } else if (errors.length <= 2) {
    strength = 'medium';
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
}

/**
 * Validate date range
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Whether the date range is valid
 */
export function isValidDateRange(startDate: Date | string, endDate: Date | string): boolean {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  return start <= end;
}

/**
 * Validate positive number
 * @param value - Value to validate
 * @returns Whether the value is a positive number
 */
export function isPositiveNumber(value: unknown): boolean {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}

/**
 * Validate non-negative number
 * @param value - Value to validate
 * @returns Whether the value is a non-negative number
 */
export function isNonNegativeNumber(value: unknown): boolean {
  return typeof value === 'number' && !isNaN(value) && value >= 0;
}

/**
 * Validate latitude
 * @param lat - Latitude to validate
 * @returns Whether the latitude is valid
 */
export function isValidLatitude(lat: number): boolean {
  return typeof lat === 'number' && lat >= -90 && lat <= 90;
}

/**
 * Validate longitude
 * @param lng - Longitude to validate
 * @returns Whether the longitude is valid
 */
export function isValidLongitude(lng: number): boolean {
  return typeof lng === 'number' && lng >= -180 && lng <= 180;
}

/**
 * Validate coordinates
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns Whether the coordinates are valid
 */
export function isValidCoordinates(lat: number, lng: number): boolean {
  return isValidLatitude(lat) && isValidLongitude(lng);
}

/**
 * Sanitize string input (basic XSS prevention)
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Truncate string with ellipsis
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @returns Truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}
