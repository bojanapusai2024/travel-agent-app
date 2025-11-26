/**
 * Expense controller
 */

import type { Request, Response, NextFunction } from 'express';

import { ExpenseService } from '../services/expenses';

const expenseService = new ExpenseService();

export class ExpenseController {
  /**
   * Get expenses
   */
  async getExpenses(req: Request, res: Response, next: NextFunction) {
    try {
      const { tripId } = req.query;
      const expenses = await expenseService.getExpenses(tripId as string | undefined);
      res.json({
        success: true,
        data: expenses,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get expense by ID
   */
  async getExpenseById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const expense = await expenseService.getExpenseById(id);
      if (!expense) {
        res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Expense not found' },
        });
        return;
      }
      res.json({
        success: true,
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create expense
   */
  async createExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { userId?: string }).userId;
      const expense = await expenseService.createExpense({ ...req.body, paidById: userId });
      res.status(201).json({
        success: true,
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update expense
   */
  async updateExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const expense = await expenseService.updateExpense(id, req.body);
      res.json({
        success: true,
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete expense
   */
  async deleteExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await expenseService.deleteExpense(id);
      res.json({
        success: true,
        message: 'Expense deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
