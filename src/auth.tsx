import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { loginAccounts, type MemberAccount } from './data';

type AuthContextValue = {
  loggedIn: boolean;
  currentMember: MemberAccount | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentMember, setCurrentMember] = useState<MemberAccount | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      loggedIn: currentMember !== null,
      currentMember,
      login: (username, password) => {
        const u = username.trim().toLowerCase();
        const found = loginAccounts.find((m) => m.username === u && m.password === password);
        if (found) {
          setCurrentMember(found);
          return true;
        }
        return false;
      },
      logout: () => setCurrentMember(null),
    }),
    [currentMember],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
