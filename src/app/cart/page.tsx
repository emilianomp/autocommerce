"use client";

import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Autenticación Requerida",
        description: "Por favor, inicia sesión para ver tu carrito.",
        variant: "destructive",
      });
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const formattedTotal = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(cartTotal);

  if (authLoading || !user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CardHeader className="px-0">
        <CardTitle className="font-headline text-4xl font-bold">Tu Carrito</CardTitle>
        <CardDescription>Revisa y gestiona los artículos en tu carrito de compras.</CardDescription>
      </CardHeader>

      {cartItems.length === 0 ? (
        <Card className="mt-8">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="font-headline text-2xl font-semibold">Tu carrito está vacío</h3>
            <p className="text-muted-foreground">Parece que aún no has agregado ningún auto.</p>
            <Button asChild className="mt-6">
              <Link href="/">Empezar a Comprar</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Producto</TableHead>
                    <TableHead></TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead className="w-[100px]">Cantidad</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image src={item.imageUrl} alt={item.name} data-ai-hint={item.imageHint} width={100} height={75} className="rounded-md object-cover" />
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(item.price)}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-20"
                          aria-label={`Cantidad para ${item.name}`}
                        />
                      </TableCell>
                      <TableCell>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(item.price * item.quantity)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} aria-label={`Eliminar ${item.name} del carrito`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <Button variant="outline" onClick={clearCart} className="mt-4">
              Vaciar Carrito
            </Button>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formattedTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos y Tasas</span>
                  <span>Calculado al pagar</span>
                </div>
                <hr/>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formattedTotal}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={() => toast({ title: "¡Próximamente!", description: "La funcionalidad de pago aún no está implementada."})}>
                  Proceder al Pago
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
