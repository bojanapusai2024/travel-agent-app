/**
 * Application configuration
 */

export const config = {
  // App
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  
  // URLs
  webUrl: process.env.WEB_URL || 'http://localhost:5173',
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  
  // CORS
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(','),
  
  // Database
  databaseUrl: process.env.DATABASE_URL || 'postgresql://travel_user:travel_password@localhost:5432/travel_agent',
  
  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret-key',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  
  // OAuth
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback',
  },
  apple: {
    clientId: process.env.APPLE_CLIENT_ID || '',
    clientSecret: process.env.APPLE_CLIENT_SECRET || '',
  },
  microsoft: {
    clientId: process.env.MICROSOFT_CLIENT_ID || '',
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
  },
  
  // External Services
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    privateKey: process.env.FIREBASE_PRIVATE_KEY || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
  },
  
  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  
  // File Upload
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
} as const;
