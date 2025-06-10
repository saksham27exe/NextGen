
// Firebase initialization is removed as requested and replaced with client-side Dexie DB.

// import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';

// const firebaseConfig: FirebaseOptions = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
// };

// // Initialize Firebase only if it hasn't been initialized yet
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app);


// export { app, db, auth, storage };

// Export null placeholders if absolutely necessary for existing imports,
// but ideally refactor imports away from this file.
export const db = null;
export const auth = null;
export const storage = null;
export const app = null;
console.warn("Firebase configuration has been removed. Using client-side Dexie storage for auth (DEMO ONLY - INSECURE).");
