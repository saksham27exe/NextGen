export type CaseStatus =
  | 'Pending'
  | 'Filed'
  | 'Investigation'
  | 'In Progress'
  | 'Hearing'
  | 'Judgement'
  | 'Resolved'
  | 'Appealed'
  | 'On Hold'
  | 'Closed';

export interface DocumentUpload {
  name: string;
  url: string; // Blob URL for local demo, Cloud Storage URL for production
  uploadedAt: string; // ISO Date string
  uploadedBy: string; // User ID of uploader (email)
  fileType?: string; // e.g., 'application/pdf'
}

export interface JudgeNote {
  text: string;
  date: string; // ISO Date string
  author: string; // Name of the judge
}

export interface CaseOrder {
  text: string;
  date: string; // ISO Date string
  author: string; // Name of the judge who passed the order
  // authorId: string; // User ID of the judge (optional, for future use)
}

export interface Case {
  // id: string; // Removed if caseNumber is the primary key
  caseNumber: string; // Use as primary key
  title: string;
  status: CaseStatus;
  court: string;
  judge?: string; // Display name of the judge (optional denormalization)
  judgeId?: string; // User ID of the assigned judge (email)
  plaintiff: string; // Display name of plaintiff
  plaintiffId: string; // User ID of plaintiff (email)
  defendant: string; // Display name of defendant
  defendantId: string; // User ID of defendant (email)
  lawyerIds?: string[]; // Array of User IDs for assigned lawyers (emails)
  addedBy: string; // User ID of the Court Official who added the case (email)
  filingDate: string; // ISO Date string
  lastUpdate: string; // ISO Date string
  description: string;
  nextHearingDate?: string; // ISO Date string (optional)
  documents?: DocumentUpload[]; // Store array of document info
  judgeNotes?: JudgeNote[]; // Store array of notes
  orders?: CaseOrder[]; // Store array of case orders
  urgency?: 'High' | 'Medium' | 'Low';
}
