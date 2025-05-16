import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppDispatch} from '../../redux/store';
import {
  updateCartItemQuantity,
  removeFromCart,
} from '../../redux/slices/cartSlice';
import {CartItem as CartItemType} from '../../types/product.types';
import {useTheme} from '../../hooks/useTheme';
import {SafeAreaView} from 'react-native-safe-area-context';

interface CartItemProps {
  item: CartItemType;
  onItemPress?: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({item, onItemPress}) => {
  const {product, quantity} = item;
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(
      updateCartItemQuantity({productId: product.id, quantity: quantity + 1}),
    );
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      dispatch(
        updateCartItemQuantity({productId: product.id, quantity: quantity - 1}),
      );
    } else {
      dispatch(removeFromCart(product.id));
    }
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: colors.card, borderColor: colors.border},
      ]}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => onItemPress && onItemPress(product.id)}
        disabled={!onItemPress}>
        <Image
          source={{uri: product.image}}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => onItemPress && onItemPress(product.id)}
          disabled={!onItemPress}>
          <Text style={[styles.name, {color: colors.text}]} numberOfLines={1}>
            {product.name}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.price, {color: colors.accent}]}>
          ${product.price.toFixed(2)}
        </Text>

        <View style={styles.quantityContainer}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[styles.quantityButton, {borderColor: colors.border}]}
              onPress={handleDecreaseQuantity}>
              <Text style={[styles.quantityButtonText, {color: colors.text}]}>
                -
              </Text>
            </TouchableOpacity>

            <Text style={[styles.quantity, {color: colors.text}]}>
              {quantity}
            </Text>
            <TouchableOpacity
              style={[styles.quantityButton, {borderColor: colors.border}]}
              onPress={handleIncreaseQuantity}>
              <Text style={[styles.quantityButtonText, {color: colors.text}]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.removeButton, {backgroundColor: colors.error}]}
            onPress={handleRemoveItem}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 100,
    padding: 10,
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    padding: 10,
    objectFit: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    gap: 5,
    // justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CartItem;
