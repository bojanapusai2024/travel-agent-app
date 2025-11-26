/**
 * Navigation types
 */

export type RootStackParamList = {
  Main: undefined;
  TripDetails: { tripId: string };
  ExpenseDetails: { expenseId: string };
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Trips: undefined;
  Expenses: undefined;
  Profile: undefined;
};
