"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);

  const displayName = `${product.brand} ${product.model} ${product.version}`;

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`} className="block">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={displayName}
              data-ai-hint={product.imageHint}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="flex-grow p-4">
        <div className='space-y-0'>
           <p className="text-sm font-medium text-muted-foreground">{product.brand}</p>
          <CardTitle className="font-headline text-xl tracking-tight !mt-0">
            <Link href={`/products/${product.id}`} className="hover:text-primary">
              {product.model}
            </Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground">{product.version}</p>
        </div>
        <CardDescription className="mt-2 text-base font-semibold text-primary">
          {formattedPrice}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Button 
          variant="outline"
          asChild
          className="w-full"
        >
          <Link href={`/products/${product.id}`}>
            <Eye className="mr-2 h-4 w-4" /> Ver Detalle
          </Link>
        </Button>
        <Button 
          className="w-full" 
          onClick={() => addToCart(product)}
          aria-label={`Añadir ${displayName} al carrito`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Añadir
        </Button>
      </CardFooter>
    </Card>
  );
}
