import React, { useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { logger, monitorNavigationEvents } from './src/utils/debugUtils';

// Enable better navigation performance
enableScreens();

// Ignore certain warnings that might be shown in development
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

/**
 * Shopping Cart App with TypeScript and Redux
 * Features:
 * - Product listing page
 * - Product details page
 * - Shopping cart
 * - Dark/Light theme support
 * - State management with Redux
 * - Persistence with Redux Persist
 */
function App(): React.JSX.Element {
  // Create a navigation ref to access navigation outside of components
  const navigationRef = useRef<any>(null);

  useEffect(() => {
    logger.info('App initialized');
    
    // Set up navigation monitoring for debugging
    if (__DEV__ && navigationRef.current) {
      monitorNavigationEvents(navigationRef);
    }
  }, []);
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
