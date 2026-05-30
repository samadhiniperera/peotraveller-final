import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAuthToken, getProfileData, loginUser, logoutUser as clearAuthToken } from "@/lib/api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  bio?: string;
  profileImage?: string;
  location?: string;
  joinedDate?: string;
  placesVisited?: number;
  placesWishlisted?: number;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setUser(null);
        setError(null);
        return;
      }
      const profile = await getProfileData();
      setUser(profile as AuthUser);
      setError(null);
    } catch (err) {
      console.error("Failed to refresh auth user:", err);
      setUser(null);
      setError("Failed to refresh session. Please sign in again.");
      clearAuthToken();
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await loginUser(email, password);
      await refreshUser();
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign in failed";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthToken();
    setUser(null);
    setError(null);
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      error,
      login,
      logout,
      refreshUser,
    }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
