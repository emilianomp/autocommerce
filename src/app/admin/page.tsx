"use client";

import AdminProductList from '@/components/AdminProductList';
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';


export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      toast({ title: 'Acceso Denegado', description: 'Debes ser administrador para acceder a esta página.', variant: 'destructive'});
      router.push('/login');
    }
  }, [user, loading, router, toast]);

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <CardHeader className="p-0">
          <CardTitle className="font-headline text-4xl font-bold">
            Gestionar Inventario
          </CardTitle>
          <CardDescription>
            Agrega, edita o elimina autos de tu listado de e-commerce.
          </CardDescription>
        </CardHeader>
        <Button asChild>
          <Link href="/admin/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Nuevo Auto
          </Link>
        </Button>
      </div>
      <div className="mt-8">
        <AdminProductList />
      </div>
    </div>
  );
}
