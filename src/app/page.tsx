import { getProducts } from '@/lib/api';
import ProductGrid from '@/components/ProductGrid';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function Home() {
  const initialProducts = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 border-none bg-transparent shadow-none">
        <CardHeader className="p-0">
          <CardTitle className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Encuentra Tu Próximo Viaje
          </CardTitle>
          <CardDescription className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Explora nuestra colección curada de automóviles premium. El viaje hacia el auto de tus sueños comienza aquí.
          </CardDescription>
        </CardHeader>
      </Card>
      <ProductGrid initialProducts={initialProducts} />
    </div>
  );
}
