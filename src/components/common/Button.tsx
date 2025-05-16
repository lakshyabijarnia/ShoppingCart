import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  Platform,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  testID,
}) => {
  const { colors, spacing } = useTheme();

  const buttonStyles: ViewStyle = {
    backgroundColor: colors.primary,
    borderRadius: spacing.s,
    paddingVertical: size === 'small' ? spacing.xs : size === 'medium' ? spacing.s : spacing.m,
    paddingHorizontal: size === 'small' ? spacing.m : size === 'medium' ? spacing.l : spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : undefined,
    elevation: variant !== 'text' ? 2 : 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  };

  const textStyles: TextStyle = {
    color: colors.card,
    fontWeight: '600',
    fontSize: size === 'small' ? 14 : size === 'medium' ? 16 : 18,
    textAlign: 'center',
  };

  // Apply variant-specific styles
  switch (variant) {
    case 'secondary':
      buttonStyles.backgroundColor = colors.secondaryBackground;
      textStyles.color = colors.text;
      break;
    case 'outline':
      buttonStyles.backgroundColor = 'transparent';
      buttonStyles.borderWidth = 1;
      buttonStyles.borderColor = colors.primary;
      textStyles.color = colors.primary;
      break;
    case 'text':
      buttonStyles.backgroundColor = 'transparent';
      textStyles.color = colors.primary;
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[buttonStyles, style]}
      activeOpacity={0.7}
      hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.card : colors.primary}
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text 
            style={[
              textStyles,
              leftIcon ? { marginLeft: spacing.s } : undefined,
              rightIcon ? { marginRight: spacing.s } : undefined,
              textStyle
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;