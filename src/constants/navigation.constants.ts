export enum Routes {
  HOME = 'Home',
  PRODUCT_DETAILS = 'ProductDetails',
  CART = 'Cart',
  CHECKOUT = 'Checkout',
}

export type RootStackParamList = {
  [Routes.HOME]: undefined;
  [Routes.PRODUCT_DETAILS]: { productId: string };
  [Routes.CART]: undefined;
  [Routes.CHECKOUT]: undefined;
};

export type NavigationParams = {
  [Routes.PRODUCT_DETAILS]: { productId: string };
};

// Default screen options to use across the app
export const defaultScreenOptions = {
  gestureEnabled: true,
  animationEnabled: true,
  headerShown: false,
};

// Navigation events for analytics and debugging
export const NavigationEvents = {
  NAVIGATE_TO_HOME: 'navigate_to_home',
  NAVIGATE_TO_PRODUCT_DETAILS: 'navigate_to_product_details',
  NAVIGATE_TO_CART: 'navigate_to_cart',
  NAVIGATE_TO_CHECKOUT: 'navigate_to_checkout',
  NAVIGATE_BACK: 'navigate_back',
};

// Helper function to format navigation path with params
export const formatPath = (route: Routes, params?: any): string => {
  switch (route) {
    case Routes.PRODUCT_DETAILS:
      return `${route}/${params?.productId || ''}`;
    default:
      return route;
  }
};