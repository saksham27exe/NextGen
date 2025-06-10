

/**
 * Defines the possible roles a user can have within the application.
 */
export type UserRole = 'Lawyer' | 'Plaintiff' | 'Defendant' | 'CourtOfficial' | 'Judge' | string;

/**
 * Represents user information.
 * For client-side storage demo, passwordHash is added, but it's HIGHLY INSECURE.
 * This hash (or plain text in the example) should NOT typically be part of the standard User model
 * exposed to the rest of the application after login.
 */
export interface User {
  /**
   * The user's unique ID. For Dexie example, might be email.
   */
  id: string;
  /**
   * The user's display name.
   */
  name: string;
  /**
   * The user's email address.
   */
  email: string;
  /**
   * User Role - determines permissions and dashboard views.
   */
  role: UserRole;
   /**
    * IMPORTANT: Only used for the client-side Dexie example.
    * Represents the stored password (plain text in this insecure example).
    * This should NOT be included in a production User model after login.
    * It's defined here temporarily to align with the insecure local storage approach.
    */
   // passwordHash?: string; // Commented out - prefer using UserWithPassword in db.ts/local-user-service.ts
}

// User data should now be managed by the AuthContext using local-user-service (Dexie).
// No backend fetching logic here.
