import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../types/store.types';

// Basic selectors
export const selectCartState = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalAmount = (state: RootState) =>
  state.cart.totalAmount;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;

// Check if a product is in the cart
export const selectIsProductInCart = (productId: string) =>
  createSelector(selectCartItems, items =>
    items.some(item => item.product.id === productId),
  );

// Get product quantity in cart
export const selectProductQuantityInCart = (productId: string) =>
  createSelector(selectCartItems, items => {
    const foundItem = items.find(item => item.product.id === productId);
    return foundItem ? foundItem.quantity : 0;
  });

// Get cart item by product ID
export const selectCartItemByProductId = (productId: string) =>
  createSelector(
    selectCartItems,
    items => items.find(item => item.product.id === productId) || null,
  );

// Format total amount as currency
export const selectFormattedTotalAmount = createSelector(
  selectCartTotalAmount,
  amount => `$${amount.toFixed(2)}`,
);

// Get cart summary for display
export const selectCartSummary = createSelector(
  [selectCartItems, selectCartTotalAmount, selectCartTotalItems],
  (items, totalAmount, totalItems) => ({
    items,
    totalAmount,
    totalItems,
    formattedTotalAmount: `$${totalAmount.toFixed(2)}`,
  }),
);
