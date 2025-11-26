/**
 * User-related TypeScript interfaces
 */

/** User role enumeration */
export type UserRole = 'owner' | 'admin' | 'member';

/** Authentication provider enumeration */
export type AuthProvider = 'email' | 'google' | 'apple' | 'microsoft';

/** Subscription tier enumeration */
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise';

/** Subscription status enumeration */
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'trial';

/** Base user interface */
export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl?: string;
  phoneNumber?: string;
  authProvider: AuthProvider;
  authProviderId?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** User profile for display purposes */
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl?: string;
  phoneNumber?: string;
}

/** User session information */
export interface UserSession {
  id: string;
  userId: string;
  deviceId: string;
  deviceName: string;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  lastActiveAt: Date;
  expiresAt: Date;
  createdAt: Date;
}

/** User subscription details */
export interface UserSubscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  razorpaySubscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

/** User preferences */
export interface UserPreferences {
  userId: string;
  currency: string;
  timezone: string;
  language: string;
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationPreferences;
}

/** Notification preferences */
export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  tripReminders: boolean;
  expenseUpdates: boolean;
  paymentReminders: boolean;
  locationSharing: boolean;
}
