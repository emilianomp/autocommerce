"use client";

import Link from 'next/link';
import { ShoppingCart, User as UserIcon, LogOut, Shield } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';

export default function Header() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 text-primary"
          >
            <path d="M12.38 4.03A1.5 1.5 0 0 0 11 5.5v1.27a.5.5 0 0 1-.4.48L6.4 8.73A1.5 1.5 0 0 0 5 10.1v3.82a.5.5 0 0 0 .4.48l4.2 1.47a1.5 1.5 0 0 0 1.18 0l4.2-1.47a.5.5 0 0 0 .4-.48V10.1a1.5 1.5 0 0 0-1.4-1.37l-4.2-1.48a.5.5 0 0 1-.4-.48V5.5A1.5 1.5 0 0 0 12.38 4.03Z" />
            <path d="M19 14.52V10.1a1.5 1.5 0 0 0-1.4-1.37l-1.47-.51" />
            <path d="m5 14.52.39-.14" />
            <path d="M5 10.1 3.53 9.6a.5.5 0 0 0-.62.33L2 12.5" />
            <path d="m19 10.1 1.47-.51a.5.5 0 0 1 .62.33L22 12.5" />
            <path d="M3 20.97a1.5 1.5 0 0 0 1.4 1.37l4.2 1.48a.5.5 0 0 1 .4.48V21" />
            <path d="M19 20.97a1.5 1.5 0 0 1-1.4 1.37l-4.2 1.48a.5.5 0 0 0-.4.48V21" />
            <path d="M12.5 2C12.5 2 15 2 15 4" />
            <path d="M11.5 2C11.5 2 9 2 9 4" />
          </svg>
          <span className="text-xl font-bold tracking-tight font-headline text-primary">
            AutoCommerce
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/cart" className="relative" aria-label={`Carrito de compras con ${totalItems} artículos`}>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link href="/admin">
                 <Button variant="ghost" size="icon" aria-label="Panel de Administrador">
                    <Shield className="h-5 w-5" />
                  </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Cerrar sesión">
                <LogOut className="h-5 w-5" />
              </Button>
              <span className="hidden text-sm font-medium sm:block">{user.name}</span>
            </>
          ) : (
            <Link href="/login" aria-label="Iniciar Sesión">
               <Button variant="ghost" size="icon">
                <UserIcon className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
