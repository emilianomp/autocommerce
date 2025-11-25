"use client";

import type { User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { LoginCredentials, RegistrationData } from '@/lib/auth-types';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  register: (data: RegistrationData) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin user
const ADMIN_USER = {
  name: 'admi',
  password: 'pr12345678'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('zeuscar_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al analizar el usuario desde localStorage", error);
      localStorage.removeItem('zeuscar_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (credentials: LoginCredentials) => {
    const { name, password } = credentials;

    // Admin login
    if (name === ADMIN_USER.name && password === ADMIN_USER.password) {
      const adminUser: User = { 
        id: 'admin', 
        name: 'Admin',
        email: 'admin@zeuscar.com',
        role: 'admin' 
      };
      localStorage.setItem('zeuscar_user', JSON.stringify(adminUser));
      setUser(adminUser);
      router.push('/admin');
      return;
    }
    
    // Regular user login (simulated)
    const storedUsers = JSON.parse(localStorage.getItem('zeuscar_users') || '[]');
    const foundUser = storedUsers.find((u: RegistrationData) => u.name === name && u.password === password);

    if (foundUser) {
      const regularUser: User = {
        id: foundUser.email, // Use email as ID for uniqueness
        name: foundUser.name,
        email: foundUser.email,
        role: 'user',
      };
      localStorage.setItem('zeuscar_user', JSON.stringify(regularUser));
      setUser(regularUser);
      router.push('/profile');
    } else {
      toast({
        title: 'Error de inicio de sesión',
        description: 'Nombre de usuario o contraseña incorrectos.',
        variant: 'destructive',
      });
    }
  };

  const register = (data: RegistrationData) => {
    const storedUsers = JSON.parse(localStorage.getItem('zeuscar_users') || '[]');
    const userExists = storedUsers.some((u: RegistrationData) => u.email === data.email || u.name === data.name);
    
    if (userExists) {
      toast({
        title: 'Error de registro',
        description: 'El nombre de usuario o el correo electrónico ya existen.',
        variant: 'destructive',
      });
      return;
    }

    const newUser = { ...data };
    storedUsers.push(newUser);
    localStorage.setItem('zeuscar_users', JSON.stringify(storedUsers));
    
    toast({
      title: '¡Registro exitoso!',
      description: 'Ahora puedes iniciar sesión con tu nueva cuenta.',
    });
    router.push('/login');
  };

  const logout = () => {
    localStorage.removeItem('zeuscar_user');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
