// src/lib/db.ts
import Dexie, { type Table } from 'dexie';
import type { User } from '@/services/user-management';
import type { Case, CaseOrder } from '@/types'; // Import the Case type

// IMPORTANT: Storing passwords (even hashes) client-side is generally insecure.
// This is for demonstration/prototyping ONLY. Do NOT use in production.
export interface UserWithPassword extends User {
  passwordHash: string; // Storing plain text password for simplicity in this example. HIGHLY INSECURE.
}

export class UserDatabase extends Dexie {
  users!: Table<UserWithPassword, string>; // Primary key is string (email)
  cases!: Table<Case, string>; // Primary key is string (caseNumber)

  constructor() {
    super('NextgenEcourtUserDB');
    // Version 3: Added 'orders' field to cases table
    this.version(3).stores({
      users: '&email, id, role',
      // Added 'orders' to cases schema. Dexie handles new optional fields.
      // No specific index needed for 'orders' itself unless searching within orders.
      cases: '&caseNumber, judgeId, plaintiffId, defendantId, *lawyerIds, addedBy, status',
    }).upgrade(tx => {
      console.log("Upgrading Dexie schema to version 3, ensuring 'orders' field can be added to existing cases.");
      // No specific data migration needed here for adding an optional 'orders' array.
      // Dexie will allow new records to have 'orders' and old records will have it as undefined.
      // If we wanted to initialize 'orders' for existing cases, we could do:
      // return tx.table('cases').toCollection().modify(caseItem => {
      //   if (typeof caseItem.orders === 'undefined') {
      //     caseItem.orders = [];
      //   }
      // });
      return Promise.resolve();
    });

    this.version(2).stores({
      users: '&email, id, role',
      cases: '&caseNumber, judgeId, plaintiffId, defendantId, *lawyerIds, addedBy, status',
    }).upgrade(tx => {
        console.log("Upgrading Dexie schema from version 1 to version 2");
        return Promise.resolve();
    });

     this.version(1).stores({
      users: '&email, id', 
    });

    this.on('populate', () => {
        console.log('Populating Dexie database...');
    });

    this.on('blocked', () => {
        console.warn('Dexie database access is blocked, possibly due to an open tab with an older version.');
    });
  }
}

// Export a singleton instance of the database
export const db = new UserDatabase();
