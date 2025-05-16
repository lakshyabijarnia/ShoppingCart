import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

// Import reducers
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import themeReducer from './slices/themeSlice';

// Import types
import { RootState, AppDispatch } from '../types/store.types';

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'theme'], // Only persist cart and theme
};

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  theme: themeReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable for Redux Persist
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Refine AppDispatch type with actual store type
export type AppDispatchTyped = typeof store.dispatch;