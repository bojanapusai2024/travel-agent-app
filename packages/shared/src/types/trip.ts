/**
 * Trip-related TypeScript interfaces
 */

import type { UserProfile, UserRole } from './user';
import type { Budget } from './expense';

/** Trip status enumeration */
export type TripStatus = 'planning' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

/** Travel segment type enumeration */
export type TravelSegmentType = 'flight' | 'train' | 'bus' | 'car' | 'ferry' | 'other';

/** Travel segment status */
export type TravelSegmentStatus = 'scheduled' | 'delayed' | 'cancelled' | 'completed';

/** Accommodation type enumeration */
export type AccommodationType = 'hotel' | 'hostel' | 'airbnb' | 'resort' | 'camping' | 'other';

/** Activity type enumeration */
export type ActivityType =
  | 'sightseeing'
  | 'adventure'
  | 'dining'
  | 'entertainment'
  | 'shopping'
  | 'relaxation'
  | 'cultural'
  | 'nature'
  | 'other';

/** Trip interface */
export interface Trip {
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  startDate: Date;
  endDate: Date;
  status: TripStatus;
  isArchived: boolean;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Trip with extended details */
export interface TripDetails extends Trip {
  createdBy: UserProfile;
  members: TripMember[];
  departments: Department[];
  locations: Location[];
  segments: TravelSegment[];
  budget: Budget;
}

/** Trip member interface */
export interface TripMember {
  id: string;
  tripId: string;
  userId: string;
  role: UserRole;
  joinedAt: Date;
  user: UserProfile;
}

/** Department interface */
export interface Department {
  id: string;
  tripId: string;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
  members: TeamMember[];
}

/** Team member within a department */
export interface TeamMember {
  id: string;
  departmentId: string;
  userId: string;
  isLead: boolean;
  joinedAt: Date;
  user: UserProfile;
}

/** Location interface */
export interface Location {
  id: string;
  tripId: string;
  name: string;
  address?: string;
  placeId?: string;
  latitude: number;
  longitude: number;
  type: 'start' | 'destination' | 'stopover';
  arrivalDate?: Date;
  departureDate?: Date;
  order: number;
  notes?: string;
  createdAt: Date;
}

/** Travel segment interface */
export interface TravelSegment {
  id: string;
  tripId: string;
  type: TravelSegmentType;
  status: TravelSegmentStatus;
  departureLocationId: string;
  arrivalLocationId: string;
  departureTime: Date;
  arrivalTime: Date;
  carrier?: string;
  bookingReference?: string;
  cost: number;
  currency: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Accommodation interface */
export interface Accommodation {
  id: string;
  tripId: string;
  locationId: string;
  type: AccommodationType;
  name: string;
  address: string;
  checkIn: Date;
  checkOut: Date;
  bookingReference?: string;
  cost: number;
  currency: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Activity interface */
export interface Activity {
  id: string;
  tripId: string;
  locationId?: string;
  type: ActivityType;
  name: string;
  description?: string;
  scheduledAt: Date;
  duration?: number;
  cost?: number;
  currency: string;
  bookingReference?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
