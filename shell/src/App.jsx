import { lazy, Suspense } from "react";
import RemoteErrorBoundary from "./RemoteErrorBoundary";

const Product = lazy(() => import("product_app/Product"));
const Cart = lazy(() => import("cart_app/Cart"));

export default function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <p style={styles.eyebrow}>Module Federation · Vite · React 19</p>
        <h1 style={styles.title}>Micro-Frontend Demo</h1>
        <p style={styles.subtitle}>
          Shell host composes Product and Cart remotes at runtime — try Add to
          Cart for cross-MFE communication
        </p>
      </header>

      <Suspense fallback={<p style={styles.loading}>Loading micro-frontends...</p>}>
        <div style={styles.grid}>
          <RemoteErrorBoundary label="Product remote">
            <Product />
          </RemoteErrorBoundary>
          <RemoteErrorBoundary label="Cart remote">
            <Cart />
          </RemoteErrorBoundary>
        </div>
      </Suspense>

      <footer style={styles.footer}>
        <span>Shell :3000</span>
        <span>·</span>
        <span>Product :3001</span>
        <span>·</span>
        <span>Cart :3002</span>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    maxWidth: "980px",
    margin: "0 auto",
    padding: "2rem 1.5rem 3rem",
    color: "#1f2937",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  eyebrow: {
    margin: 0,
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#6366f1",
  },
  title: {
    margin: "0.35rem 0 0",
    fontSize: "2rem",
    fontWeight: 800,
    color: "#111827",
  },
  subtitle: {
    margin: "0.65rem auto 0",
    maxWidth: "520px",
    color: "#6b7280",
    fontSize: "0.95rem",
    lineHeight: 1.5,
  },
  grid: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  loading: {
    textAlign: "center",
    color: "#6b7280",
    padding: "2rem",
  },
  footer: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    fontSize: "0.8rem",
    color: "#9ca3af",
  },
};
