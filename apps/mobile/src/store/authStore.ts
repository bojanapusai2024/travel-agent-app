import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

import type { User } from '@travel-agent/shared';

import { apiClient } from '../services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

/**
 * Authentication store using Zustand
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { user, token } = response.data;
      await SecureStore.setItemAsync('token', token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (_error) {
      set({ isLoading: false });
      throw _error;
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('token');
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        const response = await apiClient.get('/auth/me');
        set({ user: response.data, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (_error) {
      await SecureStore.deleteItemAsync('token');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
