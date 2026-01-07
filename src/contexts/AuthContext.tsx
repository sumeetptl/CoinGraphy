import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, User } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, password2: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userData = await authService.initializeAuth();
        setUser(userData);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      
      if (response.error) {
        return { success: false, error: response.error };
      }

      if (response.data) {
        const userData: User = {
          id: response.data.user?.id || 0,
          email,
          onboardingComplete: false,
          first_name: response.data.user?.first_name,
          last_name: response.data.user?.last_name,
        };
        setUser(userData);
        return { success: true };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (email: string, password: string, password2: string) => {
    try {
      const response = await authService.register({ email, password, password2 });
      
      if (response.error) {
        return { success: false, error: response.error };
      }

      if (response.data) {
        const userData: User = {
          id: response.data.user?.id || 0,
          email,
          onboardingComplete: false,
          first_name: response.data.user?.first_name,
          last_name: response.data.user?.last_name,
        };
        setUser(userData);
        return { success: true };
      }

      return { success: false, error: 'Registration failed' };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
