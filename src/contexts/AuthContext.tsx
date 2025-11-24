"use client";

import type { User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (name: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('autocommerce_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('autocommerce_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (name: string) => {
    const newUser: User = { id: '1', name, email: `${name.toLowerCase().replace(' ', '.')}@example.com` };
    localStorage.setItem('autocommerce_user', JSON.stringify(newUser));
    setUser(newUser);
    router.push('/admin');
  };

  const logout = () => {
    localStorage.removeItem('autocommerce_user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
