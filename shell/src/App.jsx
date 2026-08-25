import { lazy, Suspense } from 'react';

const Product = lazy(() => import('product_app/Product'));
const Cart = lazy(() => import('cart_app/Cart'));

export default function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Micro-Frontend Demo</h1>
        <p style={styles.subtitle}>
          Shell app loading Product and Cart remotes via Vite Module Federation
        </p>
      </header>

      <Suspense fallback={<p style={styles.loading}>Loading micro-frontends...</p>}>
        <div style={styles.grid}>
          <Product />
          <Cart />
        </div>
      </Suspense>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: '960px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    color: '#1f2937',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: 700,
  },
  subtitle: {
    margin: '0.5rem 0 0',
    color: '#6b7280',
    fontSize: '0.95rem',
  },
  grid: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  loading: {
    textAlign: 'center',
    color: '#6b7280',
    padding: '2rem',
  },
};
