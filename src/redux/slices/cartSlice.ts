import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Product } from '../../types/product.types';

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const calculateTotals = (items: CartItem[]): { totalAmount: number; totalItems: number } => {
  return items.reduce(
    (totals, item) => {
      return {
        totalAmount: totals.totalAmount + item.product.price * item.quantity,
        totalItems: totals.totalItems + item.quantity,
      };
    },
    { totalAmount: 0, totalItems: 0 }
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // If item exists, increase quantity
        state.items[existingItemIndex].quantity += 1;
      } else {
        // Add new item with quantity 1
        state.items.push({ product, quantity: 1 });
      }

      // Recalculate totals
      const { totalAmount, totalItems } = calculateTotals(state.items);
      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
      
      // Recalculate totals
      const { totalAmount, totalItems } = calculateTotals(state.items);
      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
    },
    
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );
      
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          state.items = state.items.filter((item) => item.product.id !== productId);
        } else {
          // Update quantity
          state.items[itemIndex].quantity = quantity;
        }
        
        // Recalculate totals
        const { totalAmount, totalItems } = calculateTotals(state.items);
        state.totalAmount = totalAmount;
        state.totalItems = totalItems;
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;