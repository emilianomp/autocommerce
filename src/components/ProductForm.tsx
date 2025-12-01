
"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import type { Product } from '@/lib/types';
import { createProduct, updateProduct } from '@/lib/api';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const MAX_FILE_SIZE = 300 * 1024; // 300 KB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  brand: z.string().min(1, 'La marca es obligatoria'),
  model: z.string().min(1, 'El modelo es obligatorio'),
  version: z.string().min(1, 'La versión es obligatoria'),
  price: z.coerce.number().positive('El precio debe ser mayor que 0'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  image: z.any()
    .refine(
      (files) => files?.[0], 
      "La imagen es obligatoria."
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `El tamaño máximo de la imagen es de 300KB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Solo se aceptan formatos .jpg, .jpeg, .png y .webp."
    ),
});

// Create a separate schema for editing since image is not required
const editFormSchema = formSchema.extend({
  image: z.any().optional(),
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
    resolver: zodResolver(product ? editFormSchema : formSchema),
    defaultValues: {
      brand: product?.brand || '',
      model: product?.model || '',
      version: product?.version || '',
      price: product?.price || 0,
      description: product?.description || '',
      category: product?.category || '',
      image: undefined,
    },
  });
  
  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      let imageUrl = product?.imageUrl;

      if (values.image && values.image[0]) {
        const file = values.image[0];
        imageUrl = await fileToDataUri(file);
      }

      if (!imageUrl) {
        throw new Error('La imagen es obligatoria');
      }

      const productData = {
        ...values,
        imageUrl: imageUrl,
        imageHint: `${values.brand} ${values.model}`.toLowerCase(),
      };
      
      delete (productData as any).image;

      if (product) {
        await updateProduct(product.id, productData);
        toast({ title: 'Éxito', description: 'Producto actualizado correctamente.' });
      } else {
        await createProduct(productData);
        toast({ title: 'Éxito', description: 'Producto creado correctamente.' });
      }
      router.push('/admin');
      router.refresh();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Error al ${product ? 'actualizar' : 'crear'} el producto.`;
      toast({ title: 'Error', description: errorMessage, variant: 'destructive' });
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
  
  const fileRef = form.register("image");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input placeholder="ej., Porsche" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input placeholder="ej., 911 Carrera" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Versión</FormLabel>
                <FormControl>
                  <Input placeholder="ej., S" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input type="number" placeholder="ej., 114400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe el auto..." {...field} />
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
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    <Input placeholder="ej., Deportivo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen</FormLabel>
                  <FormControl>
                     <Input type="file" {...fileRef} />
                  </FormControl>
                  <FormDescription>
                    Sube una imagen para el producto (Máx 300KB).
                    {product && " Dejar vacío para no modificar la imagen actual."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push('/admin')}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {product ? 'Actualizar Auto' : 'Añadir Auto'}
            </Button>
        </div>
      </form>
    </Form>
  );
}

