/**
 * Application-specific types
 */

export interface NavItem {
  path: string;
  label: string;
  icon: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}
