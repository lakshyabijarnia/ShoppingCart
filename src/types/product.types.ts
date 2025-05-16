export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}