/**
 * Date and time utility functions
 */

/**
 * Format date to localized string
 * @param date - Date to format
 * @param locale - Locale for formatting (default: 'en-US')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(d);
}

/**
 * Format date and time
 * @param date - Date to format
 * @param locale - Locale for formatting
 * @returns Formatted date and time string
 */
export function formatDateTime(date: Date | string, locale: string = 'en-US'): string {
  return formatDate(date, locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format time only
 * @param date - Date to format
 * @param locale - Locale for formatting
 * @returns Formatted time string
 */
export function formatTime(date: Date | string, locale: string = 'en-US'): string {
  return formatDate(date, locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get relative time string (e.g., '2 hours ago', 'in 3 days')
 * @param date - Date to compare
 * @param locale - Locale for formatting
 * @returns Relative time string
 */
export function getRelativeTime(date: Date | string, locale: string = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (Math.abs(diffSecs) < 60) {
    return rtf.format(diffSecs, 'seconds');
  }
  if (Math.abs(diffMins) < 60) {
    return rtf.format(diffMins, 'minutes');
  }
  if (Math.abs(diffHours) < 24) {
    return rtf.format(diffHours, 'hours');
  }
  if (Math.abs(diffDays) < 7) {
    return rtf.format(diffDays, 'days');
  }
  if (Math.abs(diffWeeks) < 4) {
    return rtf.format(diffWeeks, 'weeks');
  }
  if (Math.abs(diffMonths) < 12) {
    return rtf.format(diffMonths, 'months');
  }
  return rtf.format(diffYears, 'years');
}

/**
 * Calculate trip duration in days
 * @param startDate - Trip start date
 * @param endDate - Trip end date
 * @returns Number of days
 */
export function getTripDuration(startDate: Date | string, endDate: Date | string): number {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  const diffMs = end.getTime() - start.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Check if a date is in the past
 * @param date - Date to check
 * @returns Whether the date is in the past
 */
export function isPast(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() < Date.now();
}

/**
 * Check if a date is in the future
 * @param date - Date to check
 * @returns Whether the date is in the future
 */
export function isFuture(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() > Date.now();
}

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns Whether the date is today
 */
export function isToday(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/**
 * Get start of day
 * @param date - Date to process
 * @returns Date set to start of day (00:00:00.000)
 */
export function startOfDay(date: Date | string): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get end of day
 * @param date - Date to process
 * @returns Date set to end of day (23:59:59.999)
 */
export function endOfDay(date: Date | string): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Format duration in hours and minutes
 * @param minutes - Total minutes
 * @returns Formatted duration string (e.g., '2h 30m')
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}
