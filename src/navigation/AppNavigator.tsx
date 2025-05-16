import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  RootStackParamList,
  Routes,
  defaultScreenOptions,
} from '../constants/navigation.constants';
import {useTheme} from '../hooks/useTheme';
import {logger} from '../utils/debugUtils';

// Import screens
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  // Get theme from Redux store for styling
  const {colors, isDarkMode} = useTheme();

  logger.debug(
    'AppNavigator rendering with theme:',
    isDarkMode ? 'dark' : 'light',
  );

  return (
    <Stack.Navigator
      initialRouteName={Routes.HOME}
      screenOptions={{
        ...defaultScreenOptions,
        headerShown: false,
        contentStyle: {backgroundColor: colors.background},
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen name={Routes.HOME} component={ProductListScreen} />
      <Stack.Screen
        name={Routes.PRODUCT_DETAILS}
        component={ProductDetailsScreen}
      />
      <Stack.Screen name={Routes.CART} component={CartScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
