import { lazy } from 'react';

export const CatalogPage = lazy(() =>
  import('./modules/CatalogPage').then(module => ({
    default: module.CatalogPage,
  })),
);

export const ProductDetailsPage = lazy(() =>
  import('./modules/ProductDetailsPage').then(module => ({
    default: module.ProductDetailsPage,
  })),
);

export const FavoritesPage = lazy(() =>
  import('./modules/FavoritesPage').then(module => ({
    default: module.FavoritesPage,
  })),
);

export const CartPage = lazy(() =>
  import('./modules/CartPage').then(module => ({
    default: module.CartPage,
  })),
);

export const CheckoutPage = lazy(() =>
  import('./modules/CheckoutPage').then(module => ({
    default: module.CheckoutPage,
  })),
);

export const SearchPage = lazy(() =>
  import('./modules/SearchPage').then(module => ({
    default: module.SearchPage,
  })),
);

export const NotFoundPage = lazy(() =>
  import('./modules/NotFoundPage').then(module => ({
    default: module.NotFoundPage,
  })),
);
