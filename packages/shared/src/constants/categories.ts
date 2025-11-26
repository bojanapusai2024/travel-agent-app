/**
 * Expense and budget category constants
 */

import type { ExpenseCategory, LuggageCategory } from '../types';

/** Expense category display names */
export const EXPENSE_CATEGORY_NAMES: Record<ExpenseCategory, string> = {
  transport: 'Transportation',
  accommodation: 'Accommodation',
  food: 'Food & Dining',
  activities: 'Activities & Tours',
  shopping: 'Shopping',
  emergency: 'Emergency',
  miscellaneous: 'Miscellaneous',
} as const;

/** Expense category icons (Material Icons names) */
export const EXPENSE_CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  transport: 'directions_car',
  accommodation: 'hotel',
  food: 'restaurant',
  activities: 'attractions',
  shopping: 'shopping_bag',
  emergency: 'emergency',
  miscellaneous: 'more_horiz',
} as const;

/** Expense category colors */
export const EXPENSE_CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  transport: '#3B82F6',
  accommodation: '#8B5CF6',
  food: '#F59E0B',
  activities: '#10B981',
  shopping: '#EC4899',
  emergency: '#EF4444',
  miscellaneous: '#6B7280',
} as const;

/** Default budget percentages for categories */
export const DEFAULT_BUDGET_ALLOCATION: Record<ExpenseCategory, number> = {
  transport: 30,
  accommodation: 35,
  food: 15,
  activities: 10,
  shopping: 5,
  emergency: 3,
  miscellaneous: 2,
} as const;

/** Luggage category display names */
export const LUGGAGE_CATEGORY_NAMES: Record<LuggageCategory, string> = {
  clothing: 'Clothing',
  toiletries: 'Toiletries',
  electronics: 'Electronics',
  documents: 'Documents',
  medications: 'Medications',
  accessories: 'Accessories',
  other: 'Other',
} as const;

/** Luggage category icons */
export const LUGGAGE_CATEGORY_ICONS: Record<LuggageCategory, string> = {
  clothing: 'checkroom',
  toiletries: 'spa',
  electronics: 'devices',
  documents: 'description',
  medications: 'medication',
  accessories: 'watch',
  other: 'inventory_2',
} as const;

/** All expense categories as an array */
export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'transport',
  'accommodation',
  'food',
  'activities',
  'shopping',
  'emergency',
  'miscellaneous',
] as const;

/** All luggage categories as an array */
export const LUGGAGE_CATEGORIES: LuggageCategory[] = [
  'clothing',
  'toiletries',
  'electronics',
  'documents',
  'medications',
  'accessories',
  'other',
] as const;
