/**
 * Location tracking and sharing TypeScript interfaces
 */

/** Location sharing status */
export type LocationSharingStatus = 'active' | 'paused' | 'stopped';

/** Location update interface */
export interface LocationUpdate {
  id: string;
  userId: string;
  tripId: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number;
  speed?: number;
  heading?: number;
  timestamp: Date;
}

/** Location sharing settings */
export interface LocationSharingSettings {
  id: string;
  userId: string;
  tripId: string;
  status: LocationSharingStatus;
  shareWithDepartment: boolean;
  shareWithTrip: boolean;
  updateInterval: number;
  batteryOptimization: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/** Luggage item status */
export type LuggageStatus = 'packed' | 'unpacked' | 'lost' | 'damaged';

/** Luggage item interface */
export interface LuggageItem {
  id: string;
  userId: string;
  tripId: string;
  name: string;
  description?: string;
  category: LuggageCategory;
  quantity: number;
  status: LuggageStatus;
  isEssential: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Luggage category enumeration */
export type LuggageCategory =
  | 'clothing'
  | 'toiletries'
  | 'electronics'
  | 'documents'
  | 'medications'
  | 'accessories'
  | 'other';

/** Luggage checklist interface */
export interface LuggageChecklist {
  tripId: string;
  userId: string;
  items: LuggageItem[];
  packedCount: number;
  totalCount: number;
}

/** Geofence interface */
export interface Geofence {
  id: string;
  tripId: string;
  locationId: string;
  radius: number;
  notifyOnEnter: boolean;
  notifyOnExit: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/** Location alert interface */
export interface LocationAlert {
  id: string;
  userId: string;
  tripId: string;
  geofenceId?: string;
  type: 'enter' | 'exit' | 'sos' | 'low_battery';
  message: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  isRead: boolean;
}
