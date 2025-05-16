import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState, Product } from '../../types/product.types';

// Sample product data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Fitness tracking smart watch with heart rate monitor and GPS.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Lightweight, breathable running shoes for maximum comfort.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'Sportswear',
    inStock: true,
  },
  {
    id: '4',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with built-in grinder for fresh coffee.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3',
    category: 'Home',
    inStock: true,
  },
  {
    id: '5',
    name: 'Backpack',
    description: 'Durable water-resistant backpack with laptop compartment.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    category: 'Accessories',
    inStock: true,
  },
  {
    id: '6',
    name: 'Smartphone',
    description: 'Latest smartphone with high-resolution camera and long battery life.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505',
    category: 'Electronics',
    inStock: false,
  },
];

// For a real app, we would fetch this data from an API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return sampleProducts;
    } catch (error) {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;