export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  shadow: string;
  error: string;
  success: string;
  secondaryText: string;
  secondaryBackground: string;
  accent: string;
  placeholder: string;
}

export interface Spacing {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

export interface FontSizes {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: Spacing;
  fontSizes: FontSizes;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}