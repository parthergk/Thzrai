'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';

interface UserType {
  _id?: string;
  name?: string | null;
  username?: string;
  email?: string | null;
}

interface Session {
  user: UserType;
}

interface AuthContextType {
  data: Session | null;
  status: "authenticated" | "unauthenticated" | "loading";
  signIn: (user: UserType) => void;
  signOut: () => void;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Session | null>(null);
  const [status, setStatus] = useState<"authenticated" | "unauthenticated" | "loading">("loading");
  const router = useRouter();

  const checkSession = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      if (res.ok) {
        const userData = await res.json();
        setData({
          user: {
            _id: userData.id?.toString(),
            name: userData.name,
            username: userData.username,
            email: userData.email
          }
        });
        setStatus("authenticated");
      } else {
        setData(null);
        setStatus("unauthenticated");
      }
    } catch (error) {
      console.error("Session verification error:", error);
      setData(null);
      setStatus("unauthenticated");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const signIn = (user: UserType) => {
    setData({
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email
      }
    });
    setStatus("authenticated");
  };

  const signOut = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (error) {
      console.error("Logout request error:", error);
    }
    setData(null);
    setStatus("unauthenticated");
    router.push('/sign-in');
  };

  return (
    <AuthContext.Provider value={{ data, status, signIn, signOut, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};