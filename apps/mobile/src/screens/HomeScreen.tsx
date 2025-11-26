/**
 * Home screen component
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';

export function HomeScreen() {
  const isDark = useColorScheme() === 'dark';

  const stats = [
    { label: 'Active Trips', value: '3', icon: '✈️' },
    { label: 'Total Expenses', value: '$2,450', icon: '💰' },
    { label: 'Team Members', value: '12', icon: '👥' },
    { label: 'Upcoming', value: '5', icon: '📅' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? '#0d1117' : '#ffffff' }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: isDark ? '#c9d1d9' : '#24292f' }]}>
          Welcome back! 👋
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#8b949e' : '#57606a' }]}>
          Here&apos;s your travel overview
        </Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={[
              styles.statCard,
              {
                backgroundColor: isDark ? '#161b22' : '#f6f8fa',
                borderColor: isDark ? '#30363d' : '#d0d7de',
              },
            ]}
          >
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={[styles.statValue, { color: isDark ? '#c9d1d9' : '#24292f' }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: isDark ? '#8b949e' : '#57606a' }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#c9d1d9' : '#24292f' }]}>
          Quick Actions
        </Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#1f6feb' }]}
          >
            <Text style={styles.actionButtonText}>New Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: isDark ? '#30363d' : '#d0d7de',
              },
            ]}
          >
            <Text style={[styles.actionButtonText, { color: isDark ? '#c9d1d9' : '#24292f' }]}>
              Add Expense
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 24,
  },
  statCard: {
    width: '50%',
    padding: 8,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
});

export default HomeScreen;
