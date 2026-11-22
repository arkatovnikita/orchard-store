import { Product } from '../../shared/types/Product';

const getDiscount = (product: Product) =>
  (product.fullPrice - product.price) / product.fullPrice;

export const sortProducts = (products: Product[], sort: string) => {
  const sorted = [...products];

  switch (sort) {
    case 'price':
      return sorted.sort((a, b) => a.price - b.price);

    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);

    case 'discount':
      return sorted.sort((a, b) => getDiscount(b) - getDiscount(a));

    default:
      return sorted.sort((a, b) => b.year - a.year);
  }
};
