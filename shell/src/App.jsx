import { Routes, Route } from "react-router-dom";
import ShellNav from "./components/ShellNav";
import ToastStack from "./components/ToastStack";
import useToasts from "./hooks/useToasts";
import CartPage from "./pages/CartPage";
import ShopPage from "./pages/ShopPage";

export default function App() {
  const toasts = useToasts();

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <p style={styles.eyebrow}>Module Federation · Vite · React 19</p>
        <h1 style={styles.title}>Micro-Frontend Demo</h1>
        <p style={styles.subtitle}>
          Shell orchestrates Product and Cart remotes — routing, shared contracts,
          persistent cart, and cross-MFE events
        </p>
        <ShellNav />
      </header>

      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      <footer style={styles.footer}>
        <span>Shell :3000</span>
        <span>·</span>
        <span>Product :3001</span>
        <span>·</span>
        <span>Cart :3002</span>
      </footer>

      <ToastStack toasts={toasts} />
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
    marginBottom: "0.5rem",
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
    maxWidth: "560px",
    color: "#6b7280",
    fontSize: "0.95rem",
    lineHeight: 1.5,
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
