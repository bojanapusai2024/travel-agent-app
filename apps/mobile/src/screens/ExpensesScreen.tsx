/**
 * Expenses screen component
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

interface Expense {
  id: string;
  description: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
  paidBy: string;
}

const MOCK_EXPENSES: Expense[] = [
  {
    id: '1',
    description: 'Flight tickets',
    amount: 450.0,
    currency: 'USD',
    category: 'transport',
    date: '2024-03-01',
    paidBy: 'John Doe',
  },
  {
    id: '2',
    description: 'Hotel booking',
    amount: 320.0,
    currency: 'USD',
    category: 'accommodation',
    date: '2024-03-01',
    paidBy: 'Jane Smith',
  },
  {
    id: '3',
    description: 'Dinner at restaurant',
    amount: 85.0,
    currency: 'USD',
    category: 'food',
    date: '2024-03-02',
    paidBy: 'John Doe',
  },
];

const CATEGORY_ICONS: Record<string, string> = {
  transport: '🚗',
  accommodation: '🏨',
  food: '🍽️',
  activities: '🎯',
  shopping: '🛍️',
  emergency: '🚨',
  miscellaneous: '📦',
};

export function ExpensesScreen() {
  const isDark = useColorScheme() === 'dark';

  const totalExpenses = MOCK_EXPENSES.reduce((sum, exp) => sum + exp.amount, 0);

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <TouchableOpacity
      style={[
        styles.expenseCard,
        {
          backgroundColor: isDark ? '#161b22' : '#f6f8fa',
          borderColor: isDark ? '#30363d' : '#d0d7de',
        },
      ]}
    >
      <View style={styles.expenseIcon}>
        <Text style={styles.iconText}>{CATEGORY_ICONS[item.category] || '📦'}</Text>
      </View>
      <View style={styles.expenseDetails}>
        <Text style={[styles.expenseDescription, { color: isDark ? '#c9d1d9' : '#24292f' }]}>
          {item.description}
        </Text>
        <Text style={[styles.expenseMeta, { color: isDark ? '#8b949e' : '#57606a' }]}>
          {item.date} • {item.paidBy}
        </Text>
      </View>
      <Text style={[styles.expenseAmount, { color: isDark ? '#c9d1d9' : '#24292f' }]}>
        ${item.amount.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0d1117' : '#ffffff' }]}>
      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: isDark ? '#161b22' : '#f6f8fa',
            borderColor: isDark ? '#30363d' : '#d0d7de',
          },
        ]}
      >
        <Text style={[styles.summaryLabel, { color: isDark ? '#8b949e' : '#57606a' }]}>
          Total Expenses
        </Text>
        <Text style={[styles.summaryAmount, { color: isDark ? '#c9d1d9' : '#24292f' }]}>
          ${totalExpenses.toFixed(2)}
        </Text>
      </View>

      <FlatList
        data={MOCK_EXPENSES}
        keyExtractor={(item) => item.id}
        renderItem={renderExpenseItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Expense</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryCard: {
    margin: 16,
    marginBottom: 0,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
  },
  addButton: {
    backgroundColor: '#1f6feb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  expenseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
  },
  expenseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(31, 111, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  expenseDetails: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  expenseMeta: {
    fontSize: 12,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExpensesScreen;
