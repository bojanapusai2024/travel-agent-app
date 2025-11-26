/**
 * Navigation setup for the mobile app
 */

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme, Text } from 'react-native';

import { HomeScreen } from '../screens/HomeScreen';
import { TripsScreen } from '../screens/TripsScreen';
import { ExpensesScreen } from '../screens/ExpensesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

// Type definitions for navigation
export type RootStackParamList = {
  Main: undefined;
  TripDetails: { tripId: string };
  ExpenseDetails: { expenseId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Trips: undefined;
  Expenses: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Custom dark theme with GitHub colors
 */
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#1f6feb',
    background: '#0d1117',
    card: '#161b22',
    text: '#c9d1d9',
    border: '#30363d',
    notification: '#f85149',
  },
};

/**
 * Custom light theme with GitHub colors
 */
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0969da',
    background: '#ffffff',
    card: '#f6f8fa',
    text: '#24292f',
    border: '#d0d7de',
    notification: '#d1242f',
  },
};

/**
 * Main tab navigator
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#1f6feb',
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
          title: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>✈️</Text>,
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>💰</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Root navigation component
 */
export function Navigation() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
