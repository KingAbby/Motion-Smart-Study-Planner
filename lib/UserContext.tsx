"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_USER_KEY = "appUserAccount";
const STORAGE_AUTH_KEY = "appIsAuthenticated";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  major: string;
  semester: string;
  joinedAt: string;
}

interface StoredUserAccount extends UserProfile {
  password: string;
}

interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  university: string;
  major: string;
  semester: string;
}

interface UserContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  signUp: (payload: SignUpPayload) => { ok: boolean; error?: string };
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signOut: () => void;
  updateProfile: (payload: Omit<SignUpPayload, "email" | "password">) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function readStoredAccount(): StoredUserAccount | null {
  if (typeof window === "undefined") return null;
  const storedUser = localStorage.getItem(STORAGE_USER_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as StoredUserAccount;
  } catch {
    localStorage.removeItem(STORAGE_USER_KEY);
    return null;
  }
}

function readStoredAuth(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_AUTH_KEY) === "true";
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<StoredUserAccount | null>(() =>
    readStoredAccount(),
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    readStoredAuth(),
  );

  const persist = useCallback((nextAccount: StoredUserAccount | null, auth: boolean) => {
    if (typeof window === "undefined") return;

    if (nextAccount) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(nextAccount));
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }

    localStorage.setItem(STORAGE_AUTH_KEY, String(auth));
  }, []);

  const signUp = useCallback(
    (payload: SignUpPayload) => {
      if (account && normalizeEmail(account.email) === normalizeEmail(payload.email)) {
        return { ok: false, error: "email_exists" };
      }

      const next: StoredUserAccount = {
        firstName: payload.firstName.trim(),
        lastName: payload.lastName.trim(),
        email: normalizeEmail(payload.email),
        password: payload.password,
        university: payload.university.trim(),
        major: payload.major.trim(),
        semester: payload.semester.trim(),
        joinedAt: new Date().toISOString().slice(0, 10),
      };

      setAccount(next);
      setIsAuthenticated(true);
      persist(next, true);
      return { ok: true };
    },
    [account, persist],
  );

  const signIn = useCallback(
    (email: string, password: string) => {
      if (!account) {
        return { ok: false, error: "invalid_credentials" };
      }

      const validEmail = normalizeEmail(account.email) === normalizeEmail(email);
      const validPassword = account.password === password;

      if (!validEmail || !validPassword) {
        return { ok: false, error: "invalid_credentials" };
      }

      setIsAuthenticated(true);
      persist(account, true);
      return { ok: true };
    },
    [account, persist],
  );

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
    persist(account, false);
  }, [account, persist]);

  const updateProfile = useCallback(
    (payload: Omit<SignUpPayload, "email" | "password">) => {
      if (!account) return;

      const next: StoredUserAccount = {
        ...account,
        firstName: payload.firstName.trim(),
        lastName: payload.lastName.trim(),
        university: payload.university.trim(),
        major: payload.major.trim(),
        semester: payload.semester.trim(),
      };

      setAccount(next);
      persist(next, isAuthenticated);
    },
    [account, isAuthenticated, persist],
  );

  const userProfile = useMemo<UserProfile | null>(() => {
    if (!account) return null;
    return {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      university: account.university,
      major: account.major,
      semester: account.semester,
      joinedAt: account.joinedAt,
    };
  }, [account]);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        userProfile,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}