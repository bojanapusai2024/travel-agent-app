/**
 * Authentication service
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import type { User, UserProfile } from '@travel-agent/shared';

import { config } from '../config';
import { ApiError } from '../middleware/errorHandler';

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthResult {
  user: UserProfile;
  token: string;
  refreshToken: string;
}

// In-memory user store (replace with database in production)
const users: Map<string, User> = new Map();

export class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResult> {
    // Check if user already exists
    const existingUser = Array.from(users.values()).find((u) => u.email === data.email);
    if (existingUser) {
      throw new ApiError(409, 'EMAIL_EXISTS', 'Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12);

    // Create user
    const user: User = {
      id: uuidv4(),
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: `${data.firstName} ${data.lastName}`,
      authProvider: 'email',
      isEmailVerified: false,
      isPhoneVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.set(user.id, user);

    return this.generateAuthResult(user);
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<AuthResult> {
    const user = Array.from(users.values()).find((u) => u.email === email);
    
    if (!user || !user.passwordHash) {
      throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    // Update last login
    user.lastLoginAt = new Date();
    users.set(user.id, user);

    return this.generateAuthResult(user);
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    try {
      const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret) as { userId: string };
      const user = users.get(decoded.userId);
      
      if (!user) {
        throw new ApiError(401, 'INVALID_TOKEN', 'Invalid refresh token');
      }

      const token = this.generateAccessToken(user.id);
      return { token };
    } catch (_error) {
      throw new ApiError(401, 'INVALID_TOKEN', 'Invalid refresh token');
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<UserProfile | null> {
    const user = users.get(userId);
    if (!user) return null;

    return this.toUserProfile(user);
  }

  /**
   * Generate auth result with tokens
   */
  private generateAuthResult(user: User): AuthResult {
    const token = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return {
      user: this.toUserProfile(user),
      token,
      refreshToken,
    };
  }

  /**
   * Generate access token
   */
  private generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  /**
   * Generate refresh token
   */
  private generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, config.jwtRefreshSecret, {
      expiresIn: config.jwtRefreshExpiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  /**
   * Convert User to UserProfile (without sensitive data)
   */
  private toUserProfile(user: User): UserProfile {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      phoneNumber: user.phoneNumber,
    };
  }
}
