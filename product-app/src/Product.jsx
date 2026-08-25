const products = [
  { id: 1, name: "Wireless Keyboard", price: 79.99 },
  { id: 2, name: "USB-C Hub", price: 49.99 },
  { id: 3, name: "Monitor Stand", price: 39.99 },
];

const Product = () => {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Products</h2>
      <ul style={styles.list}>
        {products.map((product) => (
          <li key={product.id} style={styles.card}>
            <span style={styles.name}>{product.name}</span>
            <span style={styles.price}>${product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const styles = {
  section: {
    flex: 1,
    padding: "1.5rem",
    background: "#f0f9ff",
    borderRadius: "12px",
    border: "1px solid #bae6fd",
  },
  heading: {
    margin: "0 0 1rem",
    fontSize: "1.25rem",
    color: "#0369a1",
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
    padding: "0.75rem 1rem",
    background: "#fff",
    borderRadius: "8px",
    border: "1px solid #e0f2fe",
  },
  name: {
    fontWeight: 500,
    color: "#0c4a6e",
  },
  price: {
    fontWeight: 600,
    color: "#0284c7",
  },
};

export default Product;
