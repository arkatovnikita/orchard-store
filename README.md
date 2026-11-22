# Orchard — Apple devices store

An online store for iPhone, iPad, Mac, Apple Watch, AirPods and accessories, built with React and TypeScript.

This is a portfolio project. Orders and payments are a demo: nothing is charged or shipped.

## Features

- **Home page** — hero banner with autoplay, product sliders (new models, hot prices, recently viewed), shop by category, FAQ.
- **Catalog** — 6 categories, 98 models and 780 variants. Filters by price, storage or case size, sale and new items, with live result counts. Sorting and pagination. Filters are stored in the URL, so a filtered page can be shared or reloaded.
- **Search** — instant results in the header with highlighted matches and keyboard navigation, plus a full results page.
- **Product page** — photo gallery, color and storage variants, specs, reviews, sticky "Add to cart" bar on mobile.
- **Cart and favorites** — saved in the browser, quantity controls, promo codes.
- **Checkout** — 4 steps: contact, delivery, payment and review.
  - Field validation with focus on the first error, name and address formatting, email typo suggestions.
  - US phone mask, state picker, card number formatting with Visa / Mastercard detection and Luhn check.
  - Each step has its own URL, so the browser Back button works. Card details are never stored.
- **Polish** — light and dark theme, loading skeletons, images that fade in, keyboard and screen reader support.

## Performance

Lighthouse, mobile:

| Page    | Performance | Accessibility | Best Practices | SEO |
| ------- | ----------- | ------------- | -------------- | --- |
| Home    | 95          | 100           | 100            | 100 |
| Product | 91          | 100           | 100            | 100 |

- Pages are loaded lazily with `React.lazy`, so the main bundle is 71 KB gzipped.
- Product data is fetched once per visit and cached.
- The first banner image is preloaded with high priority.

## Tech stack

- React 18 and TypeScript
- React Router 6
- SCSS modules
- Vite
- ESLint (Airbnb), Prettier and Stylelint

No UI kits or state management libraries: state lives in React hooks and Context, shared logic in custom hooks.

## Getting started

```bash
git clone https://github.com/arkatovnikita/orchard-store.git
cd orchard-store
npm install
npm start
```

| Command          | What it does                       |
| ---------------- | ---------------------------------- |
| `npm start`      | Starts the dev server              |
| `npm run build`  | Type-checks and builds the project |
| `npm run lint`   | Runs ESLint and Stylelint          |
| `npm run deploy` | Publishes the build to GitHub Pages |

## Project structure

```
src/
  modules/
    HomePage/  CatalogPage/  ProductDetailsPage/  SearchPage/
    CartPage/  CheckoutPage/  FavoritesPage/  NotFoundPage/
    shared/
      api/  components/  context/  hooks/  constants/  types/  utils/
  styles/          theme, variables, mixins
public/
  api/             catalog data in JSON
  img/products/    product photos
```

## Data

The catalog was prepared from Apple's public product information and photos. Prices and reviews are illustrative.

## License

MIT. Orchard is not affiliated with Apple Inc. Product names and images belong to Apple Inc.
