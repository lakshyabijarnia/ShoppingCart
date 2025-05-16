import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types/store.types';
import type { ThemeColors, Spacing, FontSizes } from '../../types/theme.types';

// Basic selector for theme state
export const selectThemeState = (state: RootState) => state.theme;

// Select the current theme
export const selectTheme = (state: RootState) => state.theme.theme;

// Select theme mode (light or dark)
export const selectThemeMode = createSelector(
  selectTheme,
  (theme) => theme.mode
);

// Select if theme is dark mode
export const selectIsDarkMode = createSelector(
  selectThemeMode,
  (mode) => mode === 'dark'
);

// Select theme colors
export const selectThemeColors = createSelector(
  selectTheme,
  (theme) => theme.colors
);

// Select theme spacing
export const selectThemeSpacing = createSelector(
  selectTheme,
  (theme) => theme.spacing
);

// Select theme font sizes
export const selectThemeFontSizes = createSelector(
  selectTheme,
  (theme) => theme.fontSizes
);

// Select specific color
export const selectColor = (colorName: keyof ThemeColors) =>
  createSelector(
    selectThemeColors,
    (colors) => colors[colorName]
  );



// Select specific spacing
export const selectSpacing = (spacingName: keyof Spacing) =>
  createSelector(
    selectThemeSpacing,
    (spacing) => spacing[spacingName]
  );

// Select specific font size
export const selectFontSize = (fontSizeName: keyof FontSizes) =>
  createSelector(
    selectThemeFontSizes,
    (fontSizes) => fontSizes[fontSizeName]
  );