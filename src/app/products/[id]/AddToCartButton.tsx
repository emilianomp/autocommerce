"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <Button size="lg" className="w-full" onClick={() => addToCart(product)}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
