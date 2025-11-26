/**
 * Helper utility functions
 */

/**
 * Sleep function for async delays
 * @param ms - Milliseconds to sleep
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Remove sensitive fields from object
 * @param obj - Object to sanitize
 * @param fields - Fields to remove
 */
export function omit<T extends Record<string, unknown>>(
  obj: T,
  fields: (keyof T)[]
): Partial<T> {
  const result = { ...obj };
  for (const field of fields) {
    delete result[field];
  }
  return result;
}

/**
 * Pick specific fields from object
 * @param obj - Object to pick from
 * @param fields - Fields to pick
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  fields: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const field of fields) {
    if (field in obj) {
      result[field] = obj[field];
    }
  }
  return result;
}
