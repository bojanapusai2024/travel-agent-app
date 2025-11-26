/**
 * Currency formatting and conversion utilities
 */

import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY } from '../constants';

/** Currency info type */
export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

/**
 * Get currency info by code
 * @param code - Currency code (e.g., 'USD', 'EUR')
 * @returns Currency info or undefined if not found
 */
export function getCurrencyInfo(code: string): CurrencyInfo | undefined {
  return SUPPORTED_CURRENCIES.find((c) => c.code === code);
}

/**
 * Format amount with currency symbol
 * @param amount - The amount to format
 * @param currencyCode - Currency code (e.g., 'USD', 'EUR')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = DEFAULT_CURRENCY,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format amount as compact currency (e.g., 1.2K, 1.5M)
 * @param amount - The amount to format
 * @param currencyCode - Currency code
 * @param locale - Locale for formatting
 * @returns Compact formatted currency string
 */
export function formatCompactCurrency(
  amount: number,
  currencyCode: string = DEFAULT_CURRENCY,
  locale: string = 'en-US'
): string {
  const currency = getCurrencyInfo(currencyCode);
  const symbol = currency?.symbol ?? currencyCode;

  if (Math.abs(amount) >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(amount) >= 1_000) {
    return `${symbol}${(amount / 1_000).toFixed(1)}K`;
  }

  return formatCurrency(amount, currencyCode, locale);
}

/**
 * Parse currency string to number
 * @param value - Currency string to parse
 * @returns Parsed number or NaN if invalid
 */
export function parseCurrencyString(value: string): number {
  const cleanValue = value.replace(/[^0-9.-]/g, '');
  return parseFloat(cleanValue);
}

/**
 * Calculate percentage of total
 * @param amount - The amount
 * @param total - The total amount
 * @returns Percentage as a number (0-100)
 */
export function calculatePercentage(amount: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((amount / total) * 100 * 100) / 100;
}

/**
 * Split amount equally among participants
 * @param amount - Total amount to split
 * @param participants - Number of participants
 * @returns Array of split amounts (handles rounding)
 */
export function splitAmountEqually(amount: number, participants: number): number[] {
  if (participants <= 0) return [];
  
  const baseAmount = Math.floor((amount * 100) / participants) / 100;
  const remainder = Math.round((amount - baseAmount * participants) * 100) / 100;
  
  const splits = Array(participants).fill(baseAmount);
  
  // Distribute remainder to first participants
  const remainderCents = Math.round(remainder * 100);
  for (let i = 0; i < remainderCents; i++) {
    splits[i] = Math.round((splits[i] + 0.01) * 100) / 100;
  }
  
  return splits;
}
