import { getProducts } from '@/lib/api';
import ProductGrid from '@/components/ProductGrid';
import {
  Card,
  CardContent,
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
            Find Your Next Ride
          </CardTitle>
          <CardDescription className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Explore our curated collection of premium automobiles. The journey to your dream car starts here.
          </CardDescription>
        </CardHeader>
      </Card>
      <ProductGrid initialProducts={initialProducts} />
    </div>
  );
}
