import ProductForm from '@/components/ProductForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Add New Car</CardTitle>
          <CardDescription>Fill out the form below to add a new car to the inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
