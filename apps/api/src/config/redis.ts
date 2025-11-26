/**
 * Redis connection
 */

import Redis from 'ioredis';

import { config } from './config';

/**
 * Redis client instance
 */
export const redis = new Redis(config.redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

/**
 * Connect to Redis and test connection
 */
export async function connectRedis(): Promise<void> {
  return new Promise((resolve, reject) => {
    redis.on('connect', () => {
      console.warn('📮 Connected to Redis');
      resolve();
    });

    redis.on('error', (error) => {
      console.error('❌ Redis connection error:', error);
      reject(error);
    });
  });
}

/**
 * Close Redis connection
 */
export async function closeRedis(): Promise<void> {
  await redis.quit();
  console.warn('📮 Redis connection closed');
}
