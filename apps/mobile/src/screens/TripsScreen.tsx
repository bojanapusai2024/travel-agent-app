/**
 * Trips screen component
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

interface Trip {
  id: string;
  name: string;
  status: 'planning' | 'confirmed' | 'in_progress' | 'completed';
  startDate: string;
  endDate: string;
  members: number;
}

const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    name: 'Summer Europe Trip',
    status: 'planning',
    startDate: '2024-06-15',
    endDate: '2024-06-30',
    members: 5,
  },
  {
    id: '2',
    name: 'Business Conference NYC',
    status: 'confirmed',
    startDate: '2024-04-10',
    endDate: '2024-04-12',
    members: 3,
  },
  {
    id: '3',
    name: 'Team Retreat Bali',
    status: 'in_progress',
    startDate: '2024-03-01',
    endDate: '2024-03-07',
    members: 8,
  },
];

export function TripsScreen() {
  const isDark = useColorScheme() === 'dark';

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'planning':
        return '#d29922';
      case 'confirmed':
        return '#1f6feb';
      case 'in_progress':
        return '#3fb950';
      case 'completed':
        return '#8b949e';
      default:
        return '#8b949e';
    }
  };

  const getStatusLabel = (status: Trip['status']) => {
    switch (status) {
      case 'planning':
        return 'Planning';
      case 'confirmed':
        return 'Confirmed';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const renderTripCard = ({ item }: { item: Trip }) => (
    <TouchableOpacity
      style={[
        styles.tripCard,
        {
          backgroundColor: isDark ? '#161b22' : '#f6f8fa',
          borderColor: isDark ? '#30363d' : '#d0d7de',
        },
      ]}
    >
      <View style={styles.tripHeader}>
        <Text style={[styles.tripName, { color: isDark ? '#c9d1d9' : '#24292f' }]}>
          {item.name}
        </Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor(item.status)}20` },
          ]}
        >
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </View>
      <View style={styles.tripDetails}>
        <Text style={[styles.detailText, { color: isDark ? '#8b949e' : '#57606a' }]}>
          📅 {item.startDate} - {item.endDate}
        </Text>
        <Text style={[styles.detailText, { color: isDark ? '#8b949e' : '#57606a' }]}>
          👥 {item.members} members
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0d1117' : '#ffffff' }]}>
      <FlatList
        data={MOCK_TRIPS}
        keyExtractor={(item) => item.id}
        renderItem={renderTripCard}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Create New Trip</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  addButton: {
    backgroundColor: '#1f6feb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  tripCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tripName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tripDetails: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
  },
});

export default TripsScreen;
