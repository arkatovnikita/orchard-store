import { describe, expect, it } from 'vitest';
import { makeProduct } from '../../../test/makeProduct';
import {
  CatalogFilters,
  countActiveFilters,
  filterProducts,
  getFilterCounts,
  getOptionSize,
  getPriceRange,
} from './filters';

const noFilters: CatalogFilters = {
  minPrice: null,
  maxPrice: null,
  options: [],
  sale: false,
  isNew: false,
};

const newPhone = makeProduct({
  itemId: 'new-phone',
  price: 999,
  fullPrice: 999,
  capacityAvailable: ['256GB', '1TB'],
  year: 2026,
});

const salePhone = makeProduct({
  itemId: 'sale-phone',
  price: 599,
  fullPrice: 699,
  capacityAvailable: ['128GB', '256GB'],
  year: 2025,
});

const oldPhone = makeProduct({
  itemId: 'old-phone',
  price: 429,
  fullPrice: 429,
  capacityAvailable: ['128GB'],
  year: 2024,
});

const products = [newPhone, salePhone, oldPhone];

const getIds = (list: { itemId: string }[]) => list.map(item => item.itemId);

describe('filterProducts', () => {
  it('returns every product when no filter is set', () => {
    expect(filterProducts(products, noFilters)).toEqual(products);
  });

  it('filters by price, including the edges', () => {
    const filtered = filterProducts(products, {
      ...noFilters,
      minPrice: 429,
      maxPrice: 599,
    });

    expect(getIds(filtered)).toEqual(['sale-phone', 'old-phone']);
  });

  it('shows products that have any of the selected options', () => {
    const filtered = filterProducts(products, {
      ...noFilters,
      options: ['1TB', '128GB'],
    });

    expect(getIds(filtered)).toEqual(['new-phone', 'sale-phone', 'old-phone']);
  });

  it('shows only discounted products for "On sale"', () => {
    const filtered = filterProducts(products, { ...noFilters, sale: true });

    expect(getIds(filtered)).toEqual(['sale-phone']);
  });

  it('shows only this year models for "New"', () => {
    const filtered = filterProducts(products, { ...noFilters, isNew: true });

    expect(getIds(filtered)).toEqual(['new-phone']);
  });

  it('combines filters', () => {
    const filtered = filterProducts(products, {
      ...noFilters,
      options: ['256GB'],
      maxPrice: 900,
    });

    expect(getIds(filtered)).toEqual(['sale-phone']);
  });
});

describe('getFilterCounts', () => {
  it('lists options from smallest to largest', () => {
    const counts = getFilterCounts(products, noFilters);

    expect(counts.options.map(option => option.value)).toEqual([
      '128GB',
      '256GB',
      '1TB',
    ]);
  });

  it('counts products for each option, sale and new', () => {
    const counts = getFilterCounts(products, noFilters);

    expect(counts.options).toEqual([
      { value: '128GB', count: 2 },
      { value: '256GB', count: 2 },
      { value: '1TB', count: 1 },
    ]);
    expect(counts.sale).toBe(1);
    expect(counts.isNew).toBe(1);
  });

  it('respects the other filters but not the selected options', () => {
    const counts = getFilterCounts(products, {
      ...noFilters,
      options: ['1TB'],
      maxPrice: 600,
    });

    expect(counts.options).toEqual([
      { value: '128GB', count: 2 },
      { value: '256GB', count: 1 },
      { value: '1TB', count: 0 },
    ]);
  });
});

describe('getOptionSize', () => {
  it('compares terabytes, gigabytes and millimeters as numbers', () => {
    expect(getOptionSize('1TB')).toBe(1024);
    expect(getOptionSize('512GB')).toBe(512);
    expect(getOptionSize('46mm')).toBe(46);
  });

  it('returns 0 for an unknown format', () => {
    expect(getOptionSize('Large')).toBe(0);
  });
});

describe('getPriceRange', () => {
  it('finds the lowest and the highest price', () => {
    expect(getPriceRange(products)).toEqual({ min: 429, max: 999 });
  });

  it('returns zeros for an empty list', () => {
    expect(getPriceRange([])).toEqual({ min: 0, max: 0 });
  });
});

describe('countActiveFilters', () => {
  it('counts each option, the price range, sale and new', () => {
    expect(countActiveFilters(noFilters)).toBe(0);
    expect(
      countActiveFilters({
        minPrice: 100,
        maxPrice: 500,
        options: ['128GB', '256GB'],
        sale: true,
        isNew: true,
      }),
    ).toBe(5);
  });
});
