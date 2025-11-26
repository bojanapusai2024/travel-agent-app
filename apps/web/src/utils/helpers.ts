/**
 * Helper utility functions
 */

/**
 * Combine class names
 * @param classes - Class names to combine
 * @returns Combined class name string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format date for display
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDisplayDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Check if running in development mode
 */
export function isDev(): boolean {
  return import.meta.env.DEV;
}
