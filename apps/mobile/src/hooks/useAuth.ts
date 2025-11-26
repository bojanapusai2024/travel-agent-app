/**
 * Authentication hook
 */

import { useCallback } from 'react';

import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuthStore();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      await login(email, password);
    },
    [login]
  );

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
  };
}
