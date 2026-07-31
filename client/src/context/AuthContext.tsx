import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { authService, type AuthUser } from "../services/authService";

interface AuthContextValue {
  currentUser: AuthUser | null;
  isAdmin: boolean;
  loading: boolean;
  setCurrentUser: (user: AuthUser | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser()
      .then(({ user }) => setCurrentUser(user))
      .catch(() => setCurrentUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setCurrentUser(null);
    }
  }, []);

  const value: AuthContextValue = {
    currentUser,
    isAdmin: currentUser?.isAdmin ?? false,
    loading,
    setCurrentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
