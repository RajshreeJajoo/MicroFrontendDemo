import { lazy, Suspense } from 'react';

const Product = lazy(() => import('product_app/Product'));
const Cart = lazy(() => import('cart_app/Cart'));

export default function App() {
  return (
    <>
      <h1> MicroFrontend With React</h1>
      <Suspense fallback={<p>Loading Microfrontends...</p>}>
        <Product />
        <Cart />
      </Suspense>
    </>
  );
}