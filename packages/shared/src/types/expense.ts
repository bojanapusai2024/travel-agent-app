/**
 * Expense and Budget-related TypeScript interfaces
 */

import type { UserProfile } from './user';

/** Expense status enumeration */
export type ExpenseStatus = 'pending' | 'approved' | 'rejected' | 'settled';

/** Budget status enumeration */
export type BudgetStatus = 'under_budget' | 'at_budget' | 'over_budget';

/** Split type enumeration */
export type SplitType = 'equal' | 'percentage' | 'custom' | 'full';

/** Repayment status enumeration */
export type RepaymentStatus = 'pending' | 'completed' | 'cancelled';

/** Payment method enumeration */
export type PaymentMethod = 'cash' | 'card' | 'upi' | 'bank_transfer' | 'razorpay' | 'other';

/** Budget interface */
export interface Budget {
  id: string;
  tripId: string;
  totalBudget: number;
  spentAmount: number;
  currency: string;
  status: BudgetStatus;
  categoryBudgets: CategoryBudget[];
  createdAt: Date;
  updatedAt: Date;
}

/** Category budget allocation */
export interface CategoryBudget {
  id: string;
  budgetId: string;
  category: ExpenseCategory;
  allocatedAmount: number;
  spentAmount: number;
}

/** Expense category enumeration */
export type ExpenseCategory =
  | 'transport'
  | 'accommodation'
  | 'food'
  | 'activities'
  | 'shopping'
  | 'emergency'
  | 'miscellaneous';

/** Expense interface */
export interface Expense {
  id: string;
  tripId: string;
  departmentId?: string;
  paidById: string;
  amount: number;
  currency: string;
  category: ExpenseCategory;
  description: string;
  receiptUrl?: string;
  status: ExpenseStatus;
  expenseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** Expense with extended details */
export interface ExpenseDetails extends Expense {
  paidBy: UserProfile;
  splits: ExpenseSplit[];
}

/** Expense split interface */
export interface ExpenseSplit {
  id: string;
  expenseId: string;
  userId: string;
  amount: number;
  percentage?: number;
  splitType: SplitType;
  isPaid: boolean;
  user: UserProfile;
}

/** Repayment interface */
export interface Repayment {
  id: string;
  tripId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency: string;
  status: RepaymentStatus;
  paymentMethod?: PaymentMethod;
  transactionId?: string;
  notes?: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** Repayment with user details */
export interface RepaymentDetails extends Repayment {
  fromUser: UserProfile;
  toUser: UserProfile;
}

/** Balance summary between users */
export interface BalanceSummary {
  userId: string;
  user: UserProfile;
  owes: number;
  isOwed: number;
  netBalance: number;
}
