import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { PROMO_CODES } from '../constants/promoCodes';

export const addCartItem = (items: CartItem[], product: Product) =>
  items.some(item => item.id === product.itemId)
    ? items
    : [...items, { id: product.itemId, quantity: 1, product }];

export const removeCartItem = (items: CartItem[], id: string) =>
  items.filter(item => item.id !== id);

export const changeCartItemQuantity = (
  items: CartItem[],
  id: string,
  delta: number,
) =>
  items.map(item =>
    item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + delta) }
      : item,
  );

export const normalizePromoCode = (code: string) => {
  const normalizedCode = code.trim().toUpperCase();

  return PROMO_CODES[normalizedCode] ? normalizedCode : null;
};

export const getCartTotals = (items: CartItem[], promoCode: string) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );
  const discountPercent = PROMO_CODES[promoCode] ?? 0;
  const discount = Math.round((totalPrice * discountPercent) / 100);

  return {
    totalQuantity,
    totalPrice,
    discount,
    finalPrice: totalPrice - discount,
  };
};
