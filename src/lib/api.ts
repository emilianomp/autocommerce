import type { Product } from './types';
import { products as initialProducts } from './mock-data';

let products: Product[] = [...initialProducts];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getProducts = async (): Promise<Product[]> => {
  await delay(200);
  return [...products];
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await delay(100);
  return products.find(p => p.id === id);
};

export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  await delay(500);
  const newProduct: Product = {
    ...productData,
    id: String(Date.now() + Math.random()),
  };
  products.unshift(newProduct);
  return newProduct;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
  await delay(500);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return null;
  }
  products[productIndex] = { ...products[productIndex], ...updates };
  return products[productIndex];
};

export const deleteProduct = async (id: string): Promise<{ success: boolean }> => {
  await delay(500);
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);
  return { success: products.length < initialLength };
};
