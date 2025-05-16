import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types/store.types';

// Basic selectors
export const selectProductsState = (state: RootState) => state.products;
export const selectAllProducts = (state: RootState) => state.products.products;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;

// Get product by ID selector
export const selectProductById = (productId: string) =>
  createSelector(
    selectAllProducts,
    (products) => products.find((product) => product.id === productId) || null
  );

// Get products by category
export const selectProductsByCategory = (category: string) =>
  createSelector(
    selectAllProducts,
    (products) => products.filter((product) => product.category === category)
  );

// Get in-stock products only
export const selectInStockProducts = createSelector(
  selectAllProducts,
  (products) => products.filter((product) => product.inStock)
);

// Get product categories
export const selectProductCategories = createSelector(
  selectAllProducts,
  (products) => {
    const categories = new Set(products.map((product) => product.category).filter(Boolean));
    return Array.from(categories) as string[];
  }
);
