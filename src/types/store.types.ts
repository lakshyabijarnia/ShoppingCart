import { ProductsState, CartState } from './product.types';
import { Theme } from './theme.types';

export interface ThemeState {
  theme: Theme;
}

export interface RootState {
  products: ProductsState;
  cart: CartState;
  theme: ThemeState;
}

export type AppDispatch = import('@reduxjs/toolkit').ThunkDispatch<RootState, unknown, import('@reduxjs/toolkit').AnyAction> & import('@reduxjs/toolkit').Dispatch;

export interface ReduxAction<T = any> {
  type: string;
  payload?: T;
}