/**
 * Trip service
 */

import { v4 as uuidv4 } from 'uuid';

import type { Trip } from '@travel-agent/shared';

// In-memory trip store (replace with database in production)
const trips: Map<string, Trip> = new Map();

interface CreateTripData {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  createdById: string;
}

export class TripService {
  /**
   * Get all trips for a user
   */
  async getTrips(userId: string): Promise<Trip[]> {
    return Array.from(trips.values())
      .filter((trip) => trip.createdById === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Get trip by ID
   */
  async getTripById(id: string): Promise<Trip | null> {
    return trips.get(id) || null;
  }

  /**
   * Create a new trip
   */
  async createTrip(data: CreateTripData): Promise<Trip> {
    const trip: Trip = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      status: 'planning',
      isArchived: false,
      createdById: data.createdById,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    trips.set(trip.id, trip);
    return trip;
  }

  /**
   * Update a trip
   */
  async updateTrip(id: string, data: Partial<Trip>): Promise<Trip | null> {
    const trip = trips.get(id);
    if (!trip) return null;

    const updatedTrip: Trip = {
      ...trip,
      ...data,
      updatedAt: new Date(),
    };

    trips.set(id, updatedTrip);
    return updatedTrip;
  }

  /**
   * Delete a trip
   */
  async deleteTrip(id: string): Promise<boolean> {
    return trips.delete(id);
  }
}
