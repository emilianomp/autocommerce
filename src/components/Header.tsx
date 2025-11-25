"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User as UserIcon, LogOut, Shield, Menu } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const NavLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={cn(
        "text-sm font-medium transition-colors hover:text-foreground",
        isActive ? "text-foreground" : "text-muted-foreground"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = (
    <>
      <NavLink href="/" onClick={() => setIsSheetOpen(false)}>Inicio</NavLink>
      <NavLink href="/about" onClick={() => setIsSheetOpen(false)}>Quiénes Somos</NavLink>
      <NavLink href="/contact" onClick={() => setIsSheetOpen(false)}>Contacto</NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
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
        <nav className="hidden md:flex items-center gap-6">
          {navLinks}
        </nav>
        <div className="flex items-center gap-2">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className='cursor-pointer'><UserIcon className="mr-2 h-4 w-4" />Perfil</Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                     <Link href="/admin" className='cursor-pointer'><Shield className="mr-2 h-4 w-4" />Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className='cursor-pointer'>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Registro</Link>
              </Button>
            </>
          )}

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                {navLinks}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
