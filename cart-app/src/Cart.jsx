const cartItems = [
  { id: 1, name: "Wireless Keyboard", quantity: 1, price: 79.99 },
  { id: 2, name: "USB-C Hub", quantity: 2, price: 49.99 },
];

const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

const Cart = () => {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Cart</h2>
      <ul style={styles.list}>
        {cartItems.map((item) => (
          <li key={item.id} style={styles.card}>
            <span style={styles.name}>
              {item.name} <span style={styles.qty}>×{item.quantity}</span>
            </span>
            <span style={styles.price}>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div style={styles.total}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </section>
  );
};

const styles = {
  section: {
    flex: 1,
    padding: "1.5rem",
    background: "#f0fdf4",
    borderRadius: "12px",
    border: "1px solid #bbf7d0",
  },
  heading: {
    margin: "0 0 1rem",
    fontSize: "1.25rem",
    color: "#15803d",
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
    border: "1px solid #dcfce7",
  },
  name: {
    fontWeight: 500,
    color: "#14532d",
  },
  qty: {
    color: "#6b7280",
    fontWeight: 400,
  },
  price: {
    fontWeight: 600,
    color: "#16a34a",
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "2px solid #bbf7d0",
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "#15803d",
  },
};

export default Cart;
