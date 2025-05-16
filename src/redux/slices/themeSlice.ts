import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '../../types/store.types';
import { lightTheme, darkTheme } from '../../constants/theme.constants';
import { ThemeMode } from '../../types/theme.types';

const initialState: ThemeState = {
  theme: lightTheme, // Default to light theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const themeMode = action.payload as ThemeMode;
      state.theme = themeMode === 'light' ? lightTheme : darkTheme;
    },
    toggleTheme: (state) => {
      // Toggle between light and dark theme
      state.theme = state.theme.mode === 'light' ? darkTheme : lightTheme;
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;