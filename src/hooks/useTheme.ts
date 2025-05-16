import {useCallback} from 'react';
import {useAppSelector, useAppDispatch} from '../redux/store';
import {toggleTheme, setTheme} from '../redux/slices/themeSlice';
import {
  selectTheme,
  selectThemeMode,
  selectIsDarkMode,
  selectThemeColors,
  selectThemeSpacing,
  selectThemeFontSizes,
} from '../redux/selectors/themeSelectors';
import {ThemeMode} from '../types/theme.types';

export const useTheme = () => {
  const dispatch = useAppDispatch();

  // Select theme data from the store
  const theme = useAppSelector(selectTheme);
  const themeMode = useAppSelector(selectThemeMode);
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const colors = useAppSelector(selectThemeColors);
  const spacing = useAppSelector(selectThemeSpacing);
  const fontSizes = useAppSelector(selectThemeFontSizes);

  // Actions to change theme
  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const handleSetTheme = useCallback(
    (mode: ThemeMode) => {
      dispatch(setTheme(mode));
    },
    [dispatch],
  );

  return {
    theme,
    themeMode,
    isDarkMode,
    colors,
    spacing,
    fontSizes,
    toggleTheme: handleToggleTheme,
    setTheme: handleSetTheme,
  };
};
