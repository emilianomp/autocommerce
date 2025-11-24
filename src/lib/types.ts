export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  imageHint: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CartItem extends Product {
  quantity: number;
}
