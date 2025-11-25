"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { getProductById } from '@/lib/api';
import type { Product } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        toast({ title: 'Acceso Denegado', description: 'Debes ser administrador para acceder a esta página.', variant: 'destructive'});
        router.push('/login');
      }
    }
  }, [user, authLoading, router, toast]);

  useEffect(() => {
    if (user && user.role === 'admin' && typeof id === 'string') {
      const fetchProduct = async () => {
        try {
          const data = await getProductById(id);
          if (data) {
            setProduct(data);
          } else {
            toast({ title: 'Error', description: 'Producto no encontrado.', variant: 'destructive' });
            router.push('/admin');
          }
        } catch (error) {
          toast({ title: 'Error', description: 'Error al cargar los datos del producto.', variant: 'destructive' });
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [id, user, router, toast]);
  
  const getDisplayName = (p: Product | null) => p ? `${p.brand} ${p.model} ${p.version}`: '';

  if (authLoading || loading || !user || user.role !== 'admin') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Editar Detalles del Auto</CardTitle>
          <CardDescription>Actualiza la información para {getDisplayName(product)}.</CardDescription>
        </CardHeader>
        <CardContent>
          {product && <ProductForm product={product} />}
        </CardContent>
      </Card>
    </div>
  );
}
