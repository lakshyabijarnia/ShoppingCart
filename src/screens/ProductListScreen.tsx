import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {logger} from '../utils/debugUtils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {fetchProducts} from '../redux/slices/productsSlice';
import {
  selectAllProducts,
  selectProductsLoading,
  selectProductsError,
} from '../redux/selectors/productsSelectors';
import {selectCartTotalItems} from '../redux/selectors/cartSelectors';

import {useTheme} from '../hooks/useTheme';
import {RootStackParamList, Routes} from '../constants/navigation.constants';
import ProductCard from '../components/product/ProductCard';
import {Product} from '../types/product.types';

type ProductListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, Routes.HOME>;
};

const ProductListScreen: React.FC<ProductListScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors, isDarkMode, toggleTheme: handleToggleTheme} = useTheme();

  const products = useAppSelector(selectAllProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const cartItemCount = useAppSelector(selectCartTotalItems);

  useEffect(() => {
    logger.debug('ProductListScreen - Fetching products');
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductPress = (productId: string) => {
    logger.debug('ProductListScreen - Product pressed', {productId});
    navigation.navigate(Routes.PRODUCT_DETAILS, {productId});
  };

  const handleCartPress = () => {
    logger.debug('ProductListScreen - Cart button pressed');

    // Add a direct alert to verify button is working
    Alert.alert('Navigation', 'Navigating to cart...', [
      {text: 'OK', onPress: () => navigation.navigate(Routes.CART)},
    ]);
  };

  const renderProductItem = ({item}: {item: Product}) => (
    <ProductCard product={item} onPress={handleProductPress} />
  );

  const renderEmptyList = () => (
    <SafeAreaView style={styles.emptyContainer}>
      <Text style={[styles.emptyText, {color: colors.secondaryText}]}>
        {error || 'No products available'}
      </Text>
    </SafeAreaView>
  );

  // Log render cycle for debugging
  useEffect(() => {
    logger.debug('ProductListScreen rendered', {
      itemCount: products.length,
      cartItems: cartItemCount,
    });
    return () => {
      logger.debug('ProductListScreen unmounted');
    };
  }, [products.length, cartItemCount]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <View style={[styles.header, {borderBottomColor: colors.border}]}>
        <Text style={[styles.title, {color: colors.text}]}>Products</Text>

        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[
              styles.themeToggle,
              {backgroundColor: colors.secondaryBackground},
            ]}
            activeOpacity={0.6}
            onPress={() => {
              logger.debug('ProductListScreen - Theme toggle pressed');
              handleToggleTheme();
            }}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            testID="theme-toggle-button">
            <Text style={styles.themeToggleText}>
              {isDarkMode ? '🌞' : '🌙'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cartButton, {backgroundColor: colors.primary}]}
            activeOpacity={0.6}
            onPress={handleCartPress}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            testID="cart-button"
            pressRetentionOffset={{top: 20, left: 20, bottom: 20, right: 20}}>
            <Text style={styles.cartIcon}>🛒</Text>
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={renderEmptyList}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  loadingText: {
    color: '#6c757d',
    marginTop: 10,
  },
  themeToggleText: {
    color: '#212529',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cartIcon: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 14,
    minWidth: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productsList: {
    padding: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 200,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProductListScreen;
