import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addToCart } from '../../redux/slices/cartSlice';
import { selectIsProductInCart, selectProductQuantityInCart } from '../../redux/selectors/cartSelectors';
import { Product } from '../../types/product.types';
import { useTheme } from '../../hooks/useTheme';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
  onPress: (productId: string) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // 2 columns with padding

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const isInCart = useAppSelector(selectIsProductInCart(product.id));
  const quantityInCart = useAppSelector(selectProductQuantityInCart(product.id));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          width: cardWidth,
        },
      ]}
      onPress={() => onPress(product.id)}
      activeOpacity={0.8}
    >
      {!product.inStock && (
        <View style={[styles.outOfStockBadge, { backgroundColor: colors.error }]}>
          <Text style={styles.outOfStockText}>Out of Stock</Text>
        </View>
      )}

      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.contentContainer}>
        <Text
          style={[styles.name, { color: colors.text }]}
          numberOfLines={1}
        >
          {product.name}
        </Text>

        <Text
          style={[styles.price, { color: colors.accent }]}
        >
          ${product.price.toFixed(2)}
        </Text>

        {isInCart && (
          <Text style={[styles.inCart, { color: colors.secondaryText }]}>
            {quantityInCart} in cart
          </Text>
        )}

        <Button
          title={isInCart ? 'Add More' : 'Add to Cart'}
          onPress={handleAddToCart}
          variant="primary"
          size="small"
          disabled={!product.inStock}
          style={styles.button}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    padding: 12,
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
  button: {
    marginTop: 8,
  },
  inCart: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  outOfStockText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ProductCard;