
// src/services/local-user-service.ts
'use client'; // Mark as client component because it uses browser APIs (IndexedDB via Dexie)

import { db, type UserWithPassword } from '@/lib/db';
import type { User, UserRole } from '@/services/user-management';

// IMPORTANT: This service interacts with client-side storage (IndexedDB).
// Password handling here is NOT secure (stores plain text). For demonstration ONLY.

/**
 * Adds a new user to the local database.
 * @param userData - User data including plain text password.
 * @returns The ID of the newly added user.
 * @throws Error if email already exists.
 */
export async function addUser(userData: Omit<UserWithPassword, 'id'>): Promise<string> {
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('auth/email-already-in-use');
  }

  // In a real app, generate a secure ID and HASH the password here.
  // Using email as ID and plain text password for simplicity. HIGHLY INSECURE.
  const newUser: UserWithPassword = {
    ...userData,
    id: userData.email, // Using email as ID for simplicity
    passwordHash: userData.passwordHash, // Storing plain text password! INSECURE!
  };

  try {
    await db.users.add(newUser);
    console.log('User added to Dexie:', newUser.email);
    return newUser.id;
  } catch (error) {
    console.error('Failed to add user to Dexie:', error);
    throw new Error('Failed to register user locally.');
  }
}

/**
 * Retrieves a user by their email address from the local database.
 * @param email - The email address of the user to retrieve.
 * @returns The user object (including password) or undefined if not found.
 */
export async function getUserByEmail(email: string): Promise<UserWithPassword | undefined> {
  try {
    const user = await db.users.get(email);
    console.log('Fetched user by email from Dexie:', email, user ? 'Found' : 'Not Found');
    return user;
  } catch (error) {
    console.error('Failed to get user by email from Dexie:', error);
    return undefined;
  }
}

/**
 * Simulates fetching user data after login confirmation.
 * Removes the insecure password field.
 * @param email - The email of the logged-in user.
 * @returns User data without password, or null if not found.
 */
export async function getLoggedInUserData(email: string): Promise<User | null> {
  const userWithPassword = await getUserByEmail(email);
  if (!userWithPassword) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...userData } = userWithPassword;
  return userData;
}

/**
 * Retrieves all users matching a specific role from the local database.
 * @param role - The role to filter users by.
 * @returns An array of User objects (without passwords) matching the role.
 */
export async function getUsersByRole(role: UserRole): Promise<User[]> {
  try {
    const usersWithPasswords = await db.users.where('role').equals(role).toArray();
    console.log(`Fetched ${usersWithPasswords.length} users with role "${role}" from Dexie.`);
    // Strip passwords before returning
    const users = usersWithPasswords.map(uwp => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...userData } = uwp;
      return userData;
    });
    return users;
  } catch (error) {
    console.error(`Failed to get users by role "${role}" from Dexie:`, error);
    return [];
  }
}

/**
 * Retrieves all users from the local database.
 * Used for populating dropdowns where any user might be needed initially.
 * @returns An array of all User objects (without passwords).
 */
export async function getAllUsers(): Promise<User[]> {
   try {
    const usersWithPasswords = await db.users.toArray();
    console.log(`Fetched all ${usersWithPasswords.length} users from Dexie.`);
    // Strip passwords before returning
    const users = usersWithPasswords.map(uwp => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...userData } = uwp;
      return userData;
    });
    return users;
  } catch (error) {
    console.error(`Failed to get all users from Dexie:`, error);
    return [];
  }
}
