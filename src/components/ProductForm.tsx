"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import type { Product } from '@/lib/types';
import { createProduct, updateProduct } from '@/lib/api';
import { PlaceHolderImages } from '@/lib/placeholder-images';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';


const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  imageId: z.string().min(1, 'Image is required'),
});

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      description: product?.description || '',
      category: product?.category || '',
      imageId: PlaceHolderImages.find(img => img.imageUrl === product?.imageUrl)?.id || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const selectedImage = PlaceHolderImages.find(img => img.id === values.imageId);
      if (!selectedImage) {
        throw new Error('Invalid image selected');
      }

      const productData = {
        ...values,
        imageUrl: selectedImage.imageUrl,
        imageHint: selectedImage.imageHint,
      };
      
      delete (productData as any).imageId;

      if (product) {
        await updateProduct(product.id, productData);
        toast({ title: 'Success', description: 'Product updated successfully.' });
      } else {
        await createProduct(productData);
        toast({ title: 'Success', description: 'Product created successfully.' });
      }
      router.push('/admin');
      router.refresh();
    } catch (error) {
      toast({ title: 'Error', description: `Failed to ${product ? 'update' : 'create'} product.`, variant: 'destructive' });
      setIsSubmitting(false);
    }
  };
  
  if (authLoading || !user) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Porsche 911 Carrera" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 114400" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the car..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sports Car" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an image" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PlaceHolderImages.map(img => (
                        <SelectItem key={img.id} value={img.id}>{img.description}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Choose a placeholder image for the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push('/admin')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {product ? 'Update Car' : 'Add Car'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
