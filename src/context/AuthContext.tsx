import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, isAuthenticated, logout as authLogout, User } from '../services/auth.service';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  /**
   * Load user from storage on app start
   */
  async function loadUser() {
    // For pure UI mode, we don't load from storage to always show Role Selection
    setUser(null);
    setIsLoading(false);
  }

  /**
   * Login user
   */
  function login(userData: User) {
    setUser(userData);
  }

  /**
   * Logout user
   */
  async function logout() {
    await authLogout();
    setUser(null);
  }

  /**
   * Update user data
   */
  function updateUser(userData: User) {
    setUser(userData);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


