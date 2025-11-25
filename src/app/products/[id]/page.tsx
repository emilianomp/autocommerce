import { getProductById } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AddToCartButton from './AddToCartButton';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);
  
  const displayName = `${product.brand} ${product.model} ${product.version}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <CardHeader className="p-0">
            <div className="aspect-video md:aspect-auto md:h-full">
              <Image
                src={product.imageUrl}
                alt={displayName}
                data-ai-hint={product.imageHint}
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </CardHeader>
          <div className="flex flex-col">
            <CardContent className="flex-grow p-6 md:p-8">
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <CardTitle className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                {displayName}
              </CardTitle>
              <CardDescription className="mt-4 text-lg text-muted-foreground">
                {product.description}
              </CardDescription>
              <p className="mt-6 text-4xl font-bold text-primary">
                {formattedPrice}
              </p>
            </CardContent>
            <div className="bg-muted/50 p-6 md:p-8">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
