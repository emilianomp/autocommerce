import AdminProductList from '@/components/AdminProductList';
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <CardHeader className="p-0">
          <CardTitle className="font-headline text-4xl font-bold">
            Manage Inventory
          </CardTitle>
          <CardDescription>
            Add, edit, or remove cars from your e-commerce listing.
          </CardDescription>
        </CardHeader>
        <Button asChild>
          <Link href="/admin/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Car
          </Link>
        </Button>
      </div>
      <div className="mt-8">
        <AdminProductList />
      </div>
    </div>
  );
}
