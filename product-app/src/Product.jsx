import { useMemo, useState } from "react";
import { dispatchAddToCart } from "@mfe/contracts";

const CATEGORIES = ["All", "Peripherals", "Accessories", "Workspace"];

const products = [
  { id: 1, name: "Wireless Keyboard", price: 79.99, category: "Peripherals" },
  { id: 2, name: "USB-C Hub", price: 49.99, category: "Accessories" },
  { id: 3, name: "Monitor Stand", price: 39.99, category: "Workspace" },
  { id: 4, name: "Ergonomic Mouse", price: 59.99, category: "Peripherals" },
  { id: 5, name: "Desk Lamp", price: 34.99, category: "Workspace" },
  { id: 6, name: "Webcam HD", price: 89.99, category: "Peripherals" },
  { id: 7, name: "Cable Organizer", price: 14.99, category: "Accessories" },
  { id: 8, name: "Laptop Stand", price: 44.99, category: "Workspace" },
];

const Product = () => {
  const [addedId, setAddedId] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

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
        Search, filter, and add items — Cart remote updates via shared event
        contract
      </p>

      <div style={styles.controls}>
        <input
          type="search"
          placeholder="Search products…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          style={styles.search}
          aria-label="Search products"
        />
        <div style={styles.filters} role="group" aria-label="Filter by category">
          {CATEGORIES.map((value) => (
            <button
              key={value}
              type="button"
              style={{
                ...styles.chip,
                ...(category === value ? styles.chipActive : {}),
              }}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p style={styles.empty}>No products match your filters.</p>
      ) : (
        <ul style={styles.list}>
          {filteredProducts.map((product) => (
            <li key={product.id} style={styles.card}>
              <div>
                <span style={styles.name}>{product.name}</span>
                <span style={styles.meta}>
                  {product.category} · ${product.price.toFixed(2)}
                </span>
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
      )}
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
  controls: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  search: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #bae6fd",
    borderRadius: "8px",
    padding: "0.55rem 0.75rem",
    fontSize: "0.9rem",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
  },
  chip: {
    border: "1px solid #bae6fd",
    background: "#fff",
    color: "#0369a1",
    borderRadius: "999px",
    padding: "0.25rem 0.65rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  chipActive: {
    background: "#0284c7",
    borderColor: "#0284c7",
    color: "#fff",
  },
  empty: {
    margin: 0,
    padding: "1.25rem",
    textAlign: "center",
    color: "#64748b",
    background: "#fff",
    borderRadius: "8px",
    border: "1px dashed #bae6fd",
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
  meta: {
    display: "block",
    fontSize: "0.85rem",
    color: "#64748b",
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
