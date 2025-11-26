/**
 * User role constants and permissions
 */

import type { UserRole } from '../types';

/** Role hierarchy - higher value means more permissions */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  owner: 100,
  admin: 50,
  member: 10,
} as const;

/** Role display names */
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  owner: 'Owner',
  admin: 'Administrator',
  member: 'Member',
} as const;

/** Permission types */
export type Permission =
  | 'trip:create'
  | 'trip:edit'
  | 'trip:delete'
  | 'trip:archive'
  | 'member:invite'
  | 'member:remove'
  | 'member:promote'
  | 'department:create'
  | 'department:edit'
  | 'department:delete'
  | 'expense:create'
  | 'expense:edit'
  | 'expense:delete'
  | 'expense:approve'
  | 'budget:edit'
  | 'location:share'
  | 'settings:edit';

/** Role permissions mapping */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  owner: [
    'trip:create',
    'trip:edit',
    'trip:delete',
    'trip:archive',
    'member:invite',
    'member:remove',
    'member:promote',
    'department:create',
    'department:edit',
    'department:delete',
    'expense:create',
    'expense:edit',
    'expense:delete',
    'expense:approve',
    'budget:edit',
    'location:share',
    'settings:edit',
  ],
  admin: [
    'trip:create',
    'trip:edit',
    'trip:archive',
    'member:invite',
    'member:remove',
    'department:create',
    'department:edit',
    'expense:create',
    'expense:edit',
    'expense:approve',
    'budget:edit',
    'location:share',
    'settings:edit',
  ],
  member: [
    'trip:create',
    'expense:create',
    'expense:edit',
    'location:share',
  ],
} as const;

/**
 * Check if a role has a specific permission
 * @param role - The user role
 * @param permission - The permission to check
 * @returns Whether the role has the permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

/**
 * Check if role1 outranks role2
 * @param role1 - First role to compare
 * @param role2 - Second role to compare
 * @returns Whether role1 has higher rank than role2
 */
export function outranks(role1: UserRole, role2: UserRole): boolean {
  return ROLE_HIERARCHY[role1] > ROLE_HIERARCHY[role2];
}
