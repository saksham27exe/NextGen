// src/services/local-case-service.ts
'use client';

import { db } from '@/lib/db';
import type { Case } from '@/types';
import Dexie from 'dexie'; // Import Dexie for error types

/**
 * Adds a new case to the local Dexie database.
 * @param caseData - The case data object.
 * @returns The caseNumber of the newly added case.
 * @throws Error if a case with the same caseNumber already exists or other DB error occurs.
 */
export async function addCase(caseData: Case): Promise<string> {
  try {
    console.log('[LocalCaseService] Attempting to add case:', caseData.caseNumber);
    // Dexie's add() method throws if the primary key already exists.
    await db.cases.add(caseData);
    console.log('[LocalCaseService] Case added successfully:', caseData.caseNumber);
    return caseData.caseNumber;
  } catch (error) {
    if (error instanceof Dexie.ConstraintError) {
      console.error('[LocalCaseService] Failed to add case: ConstraintError (Case number likely exists)', error);
      // Throw a specific error code/message that can be caught and translated
      const customError = new Error("CASE_NUMBER_EXISTS");
      (customError as any).caseNumber = caseData.caseNumber; // Attach caseNumber for translation
      throw customError;
    } else {
      console.error('[LocalCaseService] Failed to add case to Dexie:', error);
      throw new Error('Failed to save case locally.');
    }
  }
}

/**
 * Retrieves a case by its caseNumber from the local database.
 * @param caseNumber - The case number (primary key) to retrieve.
 * @returns The case object or undefined if not found.
 */
export async function getCaseById(caseNumber: string): Promise<Case | undefined> {
  try {
    console.log('[LocalCaseService] Fetching case by ID (caseNumber):', caseNumber);
    const caseData = await db.cases.get(caseNumber);
    console.log('[LocalCaseService] Case fetched:', caseData ? 'Found' : 'Not Found');
    return caseData;
  } catch (error) {
    console.error('[LocalCaseService] Failed to get case by ID from Dexie:', error);
    return undefined;
  }
}

/**
 * Retrieves all cases from the local database.
 * @returns An array of all Case objects.
 */
export async function getAllCases(): Promise<Case[]> {
  try {
    console.log('[LocalCaseService] Fetching all cases');
    const cases = await db.cases.toArray();
    console.log(`[LocalCaseService] Fetched ${cases.length} total cases.`);
    return cases;
  } catch (error) {
    console.error('[LocalCaseService] Failed to get all cases from Dexie:', error);
    return [];
  }
}

/**
 * Retrieves cases relevant to a specific user ID based on their involvement.
 * Checks plaintiffId, defendantId, judgeId, and lawyerIds.
 * @param userId - The ID (email in this context) of the user.
 * @returns An array of relevant Case objects.
 */
export async function getCasesByUserId(userId: string): Promise<Case[]> {
  if (!userId) return [];
  try {
    console.log('[LocalCaseService] Fetching cases for user ID:', userId);
    // Use Dexie's multi-index querying capabilities for efficiency
    const userCases = await db.cases.where('plaintiffId').equals(userId)
      .or('defendantId').equals(userId)
      .or('judgeId').equals(userId)
      .or('lawyerIds').equals(userId) // 'equals' works for multiEntry arrays
      .toArray();

    console.log(`[LocalCaseService] Found ${userCases.length} cases for user ${userId}.`);
    return userCases;
  } catch (error) {
    console.error(`[LocalCaseService] Failed to get cases for user ${userId} from Dexie:`, error);
    return [];
  }
}

/**
 * Updates an existing case in the local database.
 * @param caseNumber - The case number (primary key) of the case to update.
 * @param updates - An object containing the fields to update.
 * @returns The number of updated records (should be 1 if successful).
 * @throws Error if the update fails.
 */
export async function updateCase(caseNumber: string, updates: Partial<Case>): Promise<number> {
  try {
    console.log('[LocalCaseService] Attempting to update case:', caseNumber, 'with updates:', updates);
    // Ensure lastUpdate is always set on any update
    const updatesWithTimestamp = { ...updates, lastUpdate: new Date().toISOString() };
    const count = await db.cases.update(caseNumber, updatesWithTimestamp);
    if (count > 0) {
      console.log('[LocalCaseService] Case updated successfully:', caseNumber);
    } else {
      console.warn('[LocalCaseService] Case update attempt failed, case not found or no changes needed:', caseNumber);
      // Throw an error if the case wasn't found to indicate the update failed
      throw new Error(`Case with number "${caseNumber}" not found for update.`);
    }
    return count;
  } catch (error) {
    console.error('[LocalCaseService] Failed to update case in Dexie:', error);
    throw new Error('Failed to update case locally.');
  }
}

/**
 * Deletes a case from the local database.
 * @param caseNumber - The case number (primary key) of the case to delete.
 * @throws Error if the deletion fails.
 */
export async function deleteCase(caseNumber: string): Promise<void> {
  try {
    console.log('[LocalCaseService] Attempting to delete case:', caseNumber);
    await db.cases.delete(caseNumber);
    console.log('[LocalCaseService] Case deleted successfully:', caseNumber);
  } catch (error) {
    console.error('[LocalCaseService] Failed to delete case from Dexie:', error);
    throw new Error('Failed to delete case locally.');
  }
}
