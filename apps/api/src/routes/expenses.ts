/**
 * Expense routes
 */

import { Router } from 'express';

import { ExpenseController } from '../controllers/expenses';
import { authenticate } from '../middleware/auth';

const router = Router();
const expenseController = new ExpenseController();

// All routes require authentication
router.use(authenticate);

// GET /api/v1/expenses
router.get('/', expenseController.getExpenses);

// GET /api/v1/expenses/:id
router.get('/:id', expenseController.getExpenseById);

// POST /api/v1/expenses
router.post('/', expenseController.createExpense);

// PUT /api/v1/expenses/:id
router.put('/:id', expenseController.updateExpense);

// DELETE /api/v1/expenses/:id
router.delete('/:id', expenseController.deleteExpense);

export default router;
