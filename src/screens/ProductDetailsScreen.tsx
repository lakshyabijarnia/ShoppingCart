import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {useAppSelector, useAppDispatch} from '../redux/store';
import {selectProductById} from '../redux/selectors/productsSelectors';
import {
  selectIsProductInCart,
  selectProductQuantityInCart,
} from '../redux/selectors/cartSelectors';
import {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
} from '../redux/slices/cartSlice';
import {RootStackParamList, Routes} from '../constants/navigation.constants';
import {useTheme} from '../hooks/useTheme';
import Button from '../components/common/Button';

type ProductDetailsScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    Routes.PRODUCT_DETAILS
  >;
  route: RouteProp<RootStackParamList, Routes.PRODUCT_DETAILS>;
};

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const {colors, isDarkMode} = useTheme();
  const {productId} = route.params;
  const product = useAppSelector(selectProductById(productId));
  const isInCart = useAppSelector(selectIsProductInCart(productId));
  const quantityInCart = useAppSelector(selectProductQuantityInCart(productId));

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (isInCart) {
      setQuantity(quantityInCart);
    }
  }, [isInCart, quantityInCart]);
  if (!product) {
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, {color: colors.error}]}>
            Product not found
          </Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="primary"
          />
        </View>
      </SafeAreaView>
    );
  }
  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(updateCartItemQuantity({productId, quantity}));
    } else {
      dispatch(addToCart(product));
    }
  };
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(productId));
    navigation.goBack();
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <SafeAreaView style={[styles.header, {borderBottomColor: colors.border}]}>
        <TouchableOpacity
          style={[
            styles.backButton,
            {backgroundColor: colors.secondaryBackground},
            {zIndex: 100},
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.title, {color: colors.text}]} numberOfLines={1}>
          {product.name}
        </Text>
        <View style={styles.headerPlaceholder} />

        <View style={styles.headerPlaceholder} />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.imageContainer, {backgroundColor: colors.card}]}>
          {!product.inStock && (
            <View
              style={[styles.outOfStockBadge, {backgroundColor: colors.error}]}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
          <Image
            source={{uri: product.image}}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.detailsContainer, {backgroundColor: colors.card}]}>
          <Text style={[styles.productName, {color: colors.text}]}>
            {product.name}
          </Text>

          <Text style={[styles.productPrice, {color: colors.accent}]}>
            ${product.price.toFixed(2)}
          </Text>

          <View style={[styles.divider, {backgroundColor: colors.border}]} />

          <Text style={[styles.descriptionTitle, {color: colors.text}]}>
            Description
          </Text>

          <Text style={[styles.description, {color: colors.secondaryText}]}>
            {product.description}
          </Text>

          {isInCart && (
            <View style={styles.quantityContainer}>
              <Text style={[styles.quantityLabel, {color: colors.text}]}>
                Quantity:
              </Text>

              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={[styles.quantityButton, {borderColor: colors.border}]}
                  onPress={handleDecreaseQuantity}>
                  <Text
                    style={[styles.quantityButtonText, {color: colors.text}]}>
                    -
                  </Text>
                </TouchableOpacity>

                <Text style={[styles.quantity, {color: colors.text}]}>
                  {quantity}
                </Text>

                <TouchableOpacity
                  style={[styles.quantityButton, {borderColor: colors.border}]}
                  onPress={handleIncreaseQuantity}>
                  <Text
                    style={[styles.quantityButtonText, {color: colors.text}]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.actionButtons}>
            <Button
              title={isInCart ? 'Update Cart' : 'Add to Cart'}
              onPress={handleAddToCart}
              variant="primary"
              disabled={!product.inStock}
              fullWidth={!isInCart}
              style={isInCart ? styles.updateButton : {}}
            />

            {isInCart && (
              <Button
                title="Remove"
                onPress={handleRemoveFromCart}
                variant="outline"
                style={styles.removeButton}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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
  },
  backButtonText: {
    color: '#212529',
  },
  headerPlaceholder: {
    width: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  content: {
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    borderRadius: 12,
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 24,
  },
  updateButton: {
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    width: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 1,
  },
  outOfStockText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
