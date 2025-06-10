
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User as AppUser } from '@/services/user-management';
import { getLoggedInUserData } from '@/services/local-user-service'; // Import Dexie service

// Key for storing login status (e.g., email of logged-in user) in localStorage
const LOGGED_IN_USER_EMAIL_KEY = 'nextgen-ecourt-logged-in-email';

interface AuthContextType {
  user: AppUser | null;
  login: (userData: AppUser) => void; // Keep login simple for context update
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage for logged-in user email on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const loggedInEmail = localStorage.getItem(LOGGED_IN_USER_EMAIL_KEY);
        if (loggedInEmail) {
          console.log('Found logged in email in localStorage:', loggedInEmail);
          // Fetch full user data from Dexie (local DB)
          const userData = await getLoggedInUserData(loggedInEmail);
          if (userData) {
             console.log('Fetched user data from Dexie for initial load:', userData.email);
             setAppUser(userData);
          } else {
            console.warn('User email found in localStorage, but no matching user in Dexie DB. Logging out.');
            localStorage.removeItem(LOGGED_IN_USER_EMAIL_KEY); // Clean up inconsistent state
            setAppUser(null);
          }
        } else {
           console.log('No logged in user email found in localStorage.');
           setAppUser(null);
        }
      } catch (error) {
          console.error("Error checking auth status:", error);
          setAppUser(null); // Ensure logged out state on error
          localStorage.removeItem(LOGGED_IN_USER_EMAIL_KEY);
      } finally {
          setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // Function called after successful login (e.g., on login page)
  const login = useCallback((userData: AppUser) => {
    console.log('AuthContext: Setting logged in user:', userData.email);
    setAppUser(userData);
    localStorage.setItem(LOGGED_IN_USER_EMAIL_KEY, userData.email); // Store email to indicate login
    setLoading(false); // Ensure loading is false after login sets user
  }, []);

  // Function to log out
  const logout = useCallback(() => {
    console.log('AuthContext: Logging out user.');
    setLoading(true);
    setAppUser(null);
    localStorage.removeItem(LOGGED_IN_USER_EMAIL_KEY); // Remove login marker
    // Simulate delay if needed, or just update state
    setTimeout(() => setLoading(false), 50); // Short delay for transition
  }, []);

  return (
    <AuthContext.Provider value={{ user: appUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
