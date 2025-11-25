import type { Product } from './types';

const API_URL = 'https://6925028882b59600d7220ab1.mockapi.io/productos';

// Helper para manejar las respuestas de la API
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en la API: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
};


export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  const data = await handleResponse(response);
  // La API de mockapi devuelve en orden inverso, así que lo revertimos
  return data.reverse();
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error al obtener el producto ${id}:`, error);
    return undefined;
  }
};

export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return await handleResponse(response);
  } catch(error) {
    console.error(`Error al actualizar el producto ${id}:`, error);
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<{ success: boolean }> => {
   try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
    return { success: true };
  } catch (error) {
    console.error(`Error al eliminar el producto ${id}:`, error);
    return { success: false };
  }
};
