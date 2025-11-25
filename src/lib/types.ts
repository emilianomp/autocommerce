export interface Product {
  id: string;
  brand: string;
  model: string;
  version: string;
  price: number;
  description:string;
  category: string;
  imageUrl: string;
  imageHint: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface CartItem extends Product {
  quantity: number;
}
