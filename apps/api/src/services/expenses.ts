/**
 * Expense service
 */

import { v4 as uuidv4 } from 'uuid';

import type { Expense, ExpenseCategory } from '@travel-agent/shared';

// In-memory expense store (replace with database in production)
const expenses: Map<string, Expense> = new Map();

interface CreateExpenseData {
  tripId: string;
  amount: number;
  currency: string;
  category: ExpenseCategory;
  description: string;
  paidById: string;
}

export class ExpenseService {
  /**
   * Get expenses, optionally filtered by tripId
   */
  async getExpenses(tripId?: string): Promise<Expense[]> {
    let result = Array.from(expenses.values());
    
    if (tripId) {
      result = result.filter((expense) => expense.tripId === tripId);
    }
    
    return result.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  /**
   * Get expense by ID
   */
  async getExpenseById(id: string): Promise<Expense | null> {
    return expenses.get(id) || null;
  }

  /**
   * Create a new expense
   */
  async createExpense(data: CreateExpenseData): Promise<Expense> {
    const expense: Expense = {
      id: uuidv4(),
      tripId: data.tripId,
      paidById: data.paidById,
      amount: data.amount,
      currency: data.currency,
      category: data.category,
      description: data.description,
      status: 'pending',
      expenseDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expenses.set(expense.id, expense);
    return expense;
  }

  /**
   * Update an expense
   */
  async updateExpense(id: string, data: Partial<Expense>): Promise<Expense | null> {
    const expense = expenses.get(id);
    if (!expense) return null;

    const updatedExpense: Expense = {
      ...expense,
      ...data,
      updatedAt: new Date(),
    };

    expenses.set(id, updatedExpense);
    return updatedExpense;
  }

  /**
   * Delete an expense
   */
  async deleteExpense(id: string): Promise<boolean> {
    return expenses.delete(id);
  }
}
