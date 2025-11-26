/**
 * User service
 */

import { v4 as uuidv4 } from 'uuid';

import type { UserProfile, UserPreferences } from '@travel-agent/shared';

// In-memory stores (replace with database in production)
const profiles: Map<string, UserProfile> = new Map();
const preferences: Map<string, UserPreferences> = new Map();

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export class UserService {
  /**
   * Get user profile
   */
  async getProfile(userId: string): Promise<UserProfile | null> {
    return profiles.get(userId) || this.getDefaultProfile(userId);
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: UpdateProfileData): Promise<UserProfile> {
    const existing = profiles.get(userId) || this.getDefaultProfile(userId);
    
    const updated: UserProfile = {
      ...existing,
      ...data,
      displayName: data.displayName || 
        (data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : existing.displayName),
    };
    
    profiles.set(userId, updated);
    return updated;
  }

  /**
   * Get user preferences
   */
  async getPreferences(userId: string): Promise<UserPreferences> {
    return preferences.get(userId) || this.getDefaultPreferences(userId);
  }

  /**
   * Update user preferences
   */
  async updatePreferences(
    userId: string, 
    data: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    const existing = preferences.get(userId) || this.getDefaultPreferences(userId);
    
    const updated: UserPreferences = {
      ...existing,
      ...data,
      notifications: {
        ...existing.notifications,
        ...(data.notifications || {}),
      },
    };
    
    preferences.set(userId, updated);
    return updated;
  }

  /**
   * Delete user account
   */
  async deleteAccount(userId: string): Promise<boolean> {
    profiles.delete(userId);
    preferences.delete(userId);
    return true;
  }

  /**
   * Get default profile for new user
   */
  private getDefaultProfile(userId: string): UserProfile {
    return {
      id: userId,
      email: '',
      firstName: '',
      lastName: '',
      displayName: 'New User',
    };
  }

  /**
   * Get default preferences for new user
   */
  private getDefaultPreferences(userId: string): UserPreferences {
    return {
      userId,
      currency: 'USD',
      timezone: 'UTC',
      language: 'en',
      theme: 'system',
      notifications: {
        email: true,
        push: true,
        tripReminders: true,
        expenseUpdates: true,
        paymentReminders: true,
        locationSharing: false,
      },
    };
  }
}
