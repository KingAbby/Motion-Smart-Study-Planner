"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

function toTitleCase(value: string) {
  return value
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function fallbackFromEmail(email: string) {
  const localPart = normalizeEmail(email).split("@")[0] || "student";
  const clean = localPart.replace(/[^a-zA-Z]/g, " ").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  const first = toTitleCase(parts[0] || "Student");
  const last = toTitleCase(parts.slice(1).join(" ") || "User");

  return { firstName: first, lastName: last };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<StoredUserAccount | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const signUp = (payload: SignUpPayload) => {
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
    return { ok: true };
  };

  const signIn = (email: string, password: string) => {
    const normalizedEmail = normalizeEmail(email);

    if (!account) {
      const fallbackIdentity = fallbackFromEmail(normalizedEmail);
      setAccount({
        firstName: fallbackIdentity.firstName,
        lastName: fallbackIdentity.lastName,
        email: normalizedEmail,
        password,
        university: "-",
        major: "-",
        semester: "-",
        joinedAt: new Date().toISOString().slice(0, 10),
      });
    } else {
      setAccount((prev) =>
        prev
          ? {
              ...prev,
              email: normalizedEmail,
              password,
            }
          : prev,
      );
    }

    setIsAuthenticated(true);
    return { ok: true };
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setAccount(null);
  };

  const updateProfile = (payload: Omit<SignUpPayload, "email" | "password">) => {
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
  };

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