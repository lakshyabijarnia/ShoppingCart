import { Theme, ThemeColors, Spacing, FontSizes } from '../types/theme.types';

// Colors for light theme
export const lightColors: ThemeColors = {
  primary: '#3498db',
  background: '#f8f9fa',
  card: '#ffffff',
  text: '#212529',
  border: '#dee2e6',
  notification: '#e74c3c',
  shadow: 'rgba(0, 0, 0, 0.1)',
  error: '#e74c3c',
  success: '#2ecc71',
  secondaryText: '#6c757d',
  secondaryBackground: '#e9ecef',
  accent: '#f39c12',
  placeholder: '#adb5bd',
};

// Colors for dark theme
export const darkColors: ThemeColors = {
  primary: '#3498db',
  background: '#121212',
  card: '#1e1e1e',
  text: '#f8f9fa',
  border: '#343a40',
  notification: '#e74c3c',
  shadow: 'rgba(0, 0, 0, 0.3)',
  error: '#e74c3c',
  success: '#2ecc71',
  secondaryText: '#adb5bd',
  secondaryBackground: '#2d3436',
  accent: '#f39c12',
  placeholder: '#6c757d',
};

// Spacing values
export const spacing: Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

// Font sizes
export const fontSizes: FontSizes = {
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 24,
  xxl: 32,
};

// Light theme
export const lightTheme: Theme = {
  mode: 'light',
  colors: lightColors,
  spacing,
  fontSizes,
};

// Dark theme
export const darkTheme: Theme = {
  mode: 'dark',
  colors: darkColors,
  spacing,
  fontSizes,
};