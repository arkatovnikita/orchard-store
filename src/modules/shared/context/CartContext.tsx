import { createContext, ReactNode, useContext, useMemo } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  addCartItem,
  changeCartItemQuantity,
  getCartTotals,
  normalizePromoCode,
  removeCartItem,
} from '../utils/cart';

type CartContextValue = {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  promoCode: string;
  discount: number;
  finalPrice: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'orchard-cart',
    [],
  );
  const [promoCode, setPromoCode] = useLocalStorage('orchard-promo-code', '');

  const value = useMemo(() => {
    const addToCart = (product: Product) => {
      setCartItems(items => addCartItem(items, product));
    };

    const removeFromCart = (id: string) => {
      setCartItems(items => removeCartItem(items, id));
    };

    const changeQuantity = (id: string, delta: number) => {
      setCartItems(items => changeCartItemQuantity(items, id, delta));
    };

    const clearCart = () => {
      setCartItems([]);
      setPromoCode('');
    };

    const applyPromoCode = (code: string) => {
      const normalizedCode = normalizePromoCode(code);

      if (!normalizedCode) {
        return false;
      }

      setPromoCode(normalizedCode);

      return true;
    };

    const removePromoCode = () => {
      setPromoCode('');
    };

    const isInCart = (id: string) => cartItems.some(item => item.id === id);

    const { totalQuantity, totalPrice, discount, finalPrice } = getCartTotals(
      cartItems,
      promoCode,
    );

    return {
      cartItems,
      totalQuantity,
      totalPrice,
      promoCode,
      discount,
      finalPrice,
      applyPromoCode,
      removePromoCode,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
      isInCart,
    };
  }, [cartItems, setCartItems, promoCode, setPromoCode]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};
