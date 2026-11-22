import { describe, expect, it } from 'vitest';
import { makeProduct } from '../../../test/makeProduct';
import { getSearchWords, searchProducts } from './searchProducts';

const products = [
  makeProduct({ itemId: 'pro', name: 'iPhone 18 Pro 256GB Burgundy' }),
  makeProduct({ itemId: 'pro-max', name: 'iPhone 18 Pro Max 512GB Glacier' }),
  makeProduct({ itemId: 'airpods', name: 'AirPods Pro 3' }),
];

const search = (query: string) =>
  searchProducts(products, query).map(product => product.itemId);

describe('getSearchWords', () => {
  it('splits the query into lowercase words', () => {
    expect(getSearchWords('  iPhone   PRO ')).toEqual(['iphone', 'pro']);
  });
});

describe('searchProducts', () => {
  it('ignores letter case', () => {
    expect(search('AIRPODS')).toEqual(['airpods']);
  });

  it('finds products that contain every word in any order', () => {
    expect(search('pro iphone')).toEqual(['pro', 'pro-max']);
    expect(search('pro 512')).toEqual(['pro-max']);
  });

  it('matches the beginning of a word', () => {
    expect(search('burg')).toEqual(['pro']);
  });

  it('returns nothing when no product matches', () => {
    expect(search('ipad')).toEqual([]);
  });

  it('returns nothing for an empty query', () => {
    expect(search('   ')).toEqual([]);
  });
});
