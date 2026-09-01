import { useState } from "react";
import { dispatchAddToCart } from "./cartEvents";

const products = [
  { id: 1, name: "Wireless Keyboard", price: 79.99 },
  { id: 2, name: "USB-C Hub", price: 49.99 },
  { id: 3, name: "Monitor Stand", price: 39.99 },
];

const Product = () => {
  const [addedId, setAddedId] = useState(null);

  function handleAdd(product) {
    dispatchAddToCart(product);
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 1200);
  }

  return (
    <section style={styles.section}>
      <div style={styles.badge}>Remote MFE · Product App · :3001</div>
      <h2 style={styles.heading}>Products</h2>
      <p style={styles.hint}>
        Add items to cart — updates the Cart remote via browser event bus
      </p>
      <ul style={styles.list}>
        {products.map((product) => (
          <li key={product.id} style={styles.card}>
            <div>
              <span style={styles.name}>{product.name}</span>
              <span style={styles.price}>${product.price.toFixed(2)}</span>
            </div>
            <button
              type="button"
              style={{
                ...styles.button,
                ...(addedId === product.id ? styles.buttonAdded : {}),
              }}
              onClick={() => handleAdd(product)}
            >
              {addedId === product.id ? "Added ✓" : "Add to Cart"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const styles = {
  section: {
    flex: 1,
    minWidth: "280px",
    padding: "1.5rem",
    background: "#f0f9ff",
    borderRadius: "12px",
    border: "1px solid #bae6fd",
  },
  badge: {
    display: "inline-block",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "#0369a1",
    background: "#e0f2fe",
    padding: "0.25rem 0.5rem",
    borderRadius: "6px",
    marginBottom: "0.75rem",
  },
  heading: {
    margin: "0 0 0.35rem",
    fontSize: "1.25rem",
    color: "#0369a1",
  },
  hint: {
    margin: "0 0 1rem",
    fontSize: "0.85rem",
    color: "#64748b",
    lineHeight: 1.4,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.85rem 1rem",
    background: "#fff",
    borderRadius: "8px",
    border: "1px solid #e0f2fe",
  },
  name: {
    display: "block",
    fontWeight: 600,
    color: "#0c4a6e",
    marginBottom: "0.15rem",
  },
  price: {
    fontWeight: 600,
    color: "#0284c7",
    fontSize: "0.95rem",
  },
  button: {
    border: "none",
    borderRadius: "8px",
    padding: "0.5rem 0.85rem",
    background: "#0284c7",
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.85rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  buttonAdded: {
    background: "#16a34a",
  },
};

export default Product;
