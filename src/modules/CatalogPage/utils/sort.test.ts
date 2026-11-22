import { describe, expect, it } from 'vitest';
import { makeProduct } from '../../../test/makeProduct';
import { sortProducts } from './sort';

const cheap = makeProduct({
  itemId: 'cheap',
  price: 429,
  fullPrice: 499,
  year: 2024,
});

const middle = makeProduct({
  itemId: 'middle',
  price: 699,
  fullPrice: 999,
  year: 2025,
});

const expensive = makeProduct({
  itemId: 'expensive',
  price: 1199,
  fullPrice: 1199,
  year: 2026,
});

const products = [middle, expensive, cheap];

const getIds = (list: { itemId: string }[]) => list.map(item => item.itemId);

describe('sortProducts', () => {
  it('shows the newest models first by default', () => {
    expect(getIds(sortProducts(products, 'age'))).toEqual([
      'expensive',
      'middle',
      'cheap',
    ]);
  });

  it('sorts by price from low to high', () => {
    expect(getIds(sortProducts(products, 'price'))).toEqual([
      'cheap',
      'middle',
      'expensive',
    ]);
  });

  it('sorts by price from high to low', () => {
    expect(getIds(sortProducts(products, 'price-desc'))).toEqual([
      'expensive',
      'middle',
      'cheap',
    ]);
  });

  it('sorts by the discount in percent, not in dollars', () => {
    expect(getIds(sortProducts(products, 'discount'))).toEqual([
      'middle',
      'cheap',
      'expensive',
    ]);
  });

  it('falls back to the newest first for an unknown value', () => {
    expect(getIds(sortProducts(products, 'rating'))[0]).toBe('expensive');
  });

  it('does not change the original list', () => {
    sortProducts(products, 'price');

    expect(getIds(products)).toEqual(['middle', 'expensive', 'cheap']);
  });
});
