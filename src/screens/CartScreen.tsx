import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector, useAppDispatch} from '../redux/store';
import {
  selectCartItems,
  selectCartTotalItems,
  selectFormattedTotalAmount,
} from '../redux/selectors/cartSelectors';
import {clearCart} from '../redux/slices/cartSlice';
import {RootStackParamList, Routes} from '../constants/navigation.constants';
import {useTheme} from '../hooks/useTheme';
import CartItem from '../components/cart/CartItem';
import Button from '../components/common/Button';
import {CartItem as CartItemType} from '../types/product.types';

type CartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, Routes.CART>;
};

const CartScreen: React.FC<CartScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors, isDarkMode} = useTheme();

  const cartItems = useAppSelector(selectCartItems);
  const cartItemCount = useAppSelector(selectCartTotalItems);
  const totalAmount = useAppSelector(selectFormattedTotalAmount);

  console.log('CartScreen rendered with', cartItems.length, 'items');

  const handleItemPress = (productId: string) => {
    navigation.navigate(Routes.PRODUCT_DETAILS, {productId});
  };

  const handleContinueShopping = () => {
    console.log('Continue shopping pressed');
    navigation.navigate(Routes.HOME);
  };

  const handleCheckout = () => {
    console.log('Checkout pressed');
    // In a real app, this would navigate to a checkout screen
    Alert.alert(
      'Checkout',
      'This would proceed to checkout in a complete app.',
      [{text: 'OK'}],
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => dispatch(clearCart()),
        },
      ],
    );
  };

  const renderCartItem = ({item}: {item: CartItemType}) => (
    <CartItem item={item} onItemPress={handleItemPress} />
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, {color: colors.secondaryText}]}>
        Your cart is empty
      </Text>
      <Button
        title="Continue Shopping"
        onPress={handleContinueShopping}
        variant="primary"
        style={styles.continueButton}
      />
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <View style={[styles.header, {borderBottomColor: colors.border}]}>
        <TouchableOpacity
          style={[
            styles.backButton,
            {backgroundColor: colors.secondaryBackground},
          ]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.title, {color: colors.text}]}>Shopping Cart</Text>

        {cartItems.length > 0 && (
          <TouchableOpacity
            style={[styles.clearButton, {backgroundColor: colors.error}]}
            onPress={handleClearCart}
            activeOpacity={0.7}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={item => item.product.id}
          contentContainerStyle={[
            styles.cartList,
            cartItems.length === 0
              ? {flex: 1, justifyContent: 'center'}
              : {paddingBottom: 200},
          ]}
          ListEmptyComponent={renderEmptyCart}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {cartItems.length > 0 && (
        <View
          style={[
            styles.cartSummary,
            {backgroundColor: colors.card, borderTopColor: colors.border},
          ]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, {color: colors.secondaryText}]}>
              Items:
            </Text>
            <Text style={[styles.summaryValue, {color: colors.text}]}>
              {cartItemCount}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, {color: colors.secondaryText}]}>
              Total:
            </Text>
            <Text style={[styles.summaryTotal, {color: colors.accent}]}>
              {totalAmount}
            </Text>
          </View>

          <Button
            title="Checkout"
            onPress={handleCheckout}
            variant="primary"
            fullWidth
            style={styles.checkoutButton}
          />

          <Button
            title="Continue Shopping"
            onPress={handleContinueShopping}
            variant="outline"
            fullWidth
            style={styles.summaryShoppingButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  backButtonText: {
    color: '#212529',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1, // makes FlatList scrollable
  },
  continueButton: {
    marginTop: 20,
  },
  cartList: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  cartSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    zIndex: 1,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryTotal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 16,
  },
  summaryShoppingButton: {
    marginTop: 12,
  },
});

export default CartScreen;
