import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import * as authApi from './api/auth';
import { ApiError, clearToken, getToken, setToken } from './api/client';
import type { Member } from './api/auth';

type AuthContextValue = {
  loggedIn: boolean;
  /** True until the initial "is there already a valid session?" check resolves. */
  initializing: boolean;
  currentMember: Member | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [initializing, setInitializing] = useState(true);

  // A token surviving a page reload (stored in localStorage) doesn't mean it's
  // still valid — re-fetch the member it belongs to, and drop it if the API
  // says otherwise (expired, revoked...).
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setInitializing(false);
      return;
    }
    authApi
      .fetchCurrentMember()
      .then(setCurrentMember)
      .catch(() => clearToken())
      .finally(() => setInitializing(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      loggedIn: currentMember !== null,
      initializing,
      currentMember,
      login: async (username, password) => {
        try {
          const response = await authApi.login(username, password);
          setToken(response.token);
          setCurrentMember(response.member);
          return true;
        } catch (error) {
          if (error instanceof ApiError) return false;
          throw error;
        }
      },
      logout: () => {
        clearToken();
        setCurrentMember(null);
      },
    }),
    [currentMember, initializing],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
