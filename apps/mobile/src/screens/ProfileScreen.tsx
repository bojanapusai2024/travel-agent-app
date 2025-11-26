/**
 * Profile screen component
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

export function ProfileScreen() {
  const isDark = useColorScheme() === 'dark';

  const menuItems = [
    { icon: '👤', label: 'Edit Profile' },
    { icon: '🔔', label: 'Notifications' },
    { icon: '💳', label: 'Payment Methods' },
    { icon: '🔒', label: 'Privacy & Security' },
    { icon: '🌙', label: 'Appearance' },
    { icon: '❓', label: 'Help & Support' },
    { icon: '📄', label: 'Terms of Service' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? '#0d1117' : '#ffffff' }]}
      contentContainerStyle={styles.content}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: isDark ? '#30363d' : '#d0d7de' },
          ]}
        >
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={[styles.userName, { color: isDark ? '#c9d1d9' : '#24292f' }]}>
          John Doe
        </Text>
        <Text style={[styles.userEmail, { color: isDark ? '#8b949e' : '#57606a' }]}>
          john.doe@example.com
        </Text>
      </View>

      {/* Menu Items */}
      <View
        style={[
          styles.menuCard,
          {
            backgroundColor: isDark ? '#161b22' : '#f6f8fa',
            borderColor: isDark ? '#30363d' : '#d0d7de',
          },
        ]}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.menuItem,
              index < menuItems.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: isDark ? '#30363d' : '#d0d7de',
              },
            ]}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={[styles.menuLabel, { color: isDark ? '#c9d1d9' : '#24292f' }]}>
              {item.label}
            </Text>
            <Text style={[styles.menuArrow, { color: isDark ? '#8b949e' : '#57606a' }]}>
              ›
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[
          styles.logoutButton,
          {
            backgroundColor: isDark ? '#161b22' : '#f6f8fa',
            borderColor: '#f85149',
          },
        ]}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Version */}
      <Text style={[styles.version, { color: isDark ? '#8b949e' : '#57606a' }]}>
        Version 1.0.0
      </Text>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#c9d1d9',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  menuCard: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
  },
  menuArrow: {
    fontSize: 20,
  },
  logoutButton: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  logoutText: {
    color: '#f85149',
    fontSize: 16,
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default ProfileScreen;
