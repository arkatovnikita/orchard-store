import { describe, expect, it } from 'vitest';
import { makeProduct } from '../../../test/makeProduct';
import {
  addCartItem,
  changeCartItemQuantity,
  getCartTotals,
  normalizePromoCode,
  removeCartItem,
} from './cart';

const iphone = makeProduct({ itemId: 'iphone', price: 1199 });
const airpods = makeProduct({ itemId: 'airpods', price: 249 });

const cart = [
  { id: 'iphone', quantity: 1, product: iphone },
  { id: 'airpods', quantity: 2, product: airpods },
];

describe('addCartItem', () => {
  it('adds a new product with quantity 1', () => {
    expect(addCartItem([], iphone)).toEqual([
      { id: 'iphone', quantity: 1, product: iphone },
    ]);
  });

  it('does not add the same product twice', () => {
    expect(addCartItem(cart, iphone)).toBe(cart);
  });
});

describe('removeCartItem', () => {
  it('removes only the selected product', () => {
    expect(removeCartItem(cart, 'iphone')).toEqual([cart[1]]);
  });
});

describe('changeCartItemQuantity', () => {
  it('increases and decreases the quantity', () => {
    expect(changeCartItemQuantity(cart, 'iphone', 1)[0].quantity).toBe(2);
    expect(changeCartItemQuantity(cart, 'airpods', -1)[1].quantity).toBe(1);
  });

  it('never goes below 1', () => {
    expect(changeCartItemQuantity(cart, 'iphone', -1)[0].quantity).toBe(1);
  });

  it('does not change the original cart', () => {
    changeCartItemQuantity(cart, 'iphone', 1);

    expect(cart[0].quantity).toBe(1);
  });
});

describe('normalizePromoCode', () => {
  it('accepts a known code in any case and with spaces', () => {
    expect(normalizePromoCode(' orchard10 ')).toBe('ORCHARD10');
  });

  it('rejects an unknown code', () => {
    expect(normalizePromoCode('FREE100')).toBeNull();
    expect(normalizePromoCode('')).toBeNull();
  });
});

describe('getCartTotals', () => {
  it('counts items and the total price', () => {
    expect(getCartTotals(cart, '')).toEqual({
      totalQuantity: 3,
      totalPrice: 1697,
      discount: 0,
      finalPrice: 1697,
    });
  });

  it('applies the promo code discount, rounded to whole dollars', () => {
    expect(getCartTotals(cart, 'ORCHARD10')).toEqual({
      totalQuantity: 3,
      totalPrice: 1697,
      discount: 170,
      finalPrice: 1527,
    });
  });

  it('returns zeros for an empty cart', () => {
    expect(getCartTotals([], 'ORCHARD10')).toEqual({
      totalQuantity: 0,
      totalPrice: 0,
      discount: 0,
      finalPrice: 0,
    });
  });
});
