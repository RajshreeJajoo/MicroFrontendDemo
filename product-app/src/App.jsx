import Product from "./Product";

function App() {
  return (
    <div style={styles.page}>
      <div style={styles.banner}>
        <strong>Product Remote</strong> · port 3001 · dev preview only
        <p style={styles.bannerText}>
          Open the shell at{" "}
          <a href="http://localhost:3000" style={styles.link}>
            localhost:3000
          </a>{" "}
          for the full micro-frontend demo.
        </p>
      </div>
      <Product />
    </div>
  );
}

const styles = {
  page: {
    maxWidth: "520px",
    margin: "0 auto",
    padding: "2rem 1.25rem",
    fontFamily: "system-ui, sans-serif",
  },
  banner: {
    marginBottom: "1rem",
    padding: "0.85rem 1rem",
    borderRadius: "10px",
    background: "#fef3c7",
    border: "1px solid #fcd34d",
    color: "#92400e",
    fontSize: "0.9rem",
  },
  bannerText: {
    margin: "0.35rem 0 0",
    fontSize: "0.85rem",
    lineHeight: 1.4,
  },
  link: {
    color: "#b45309",
    fontWeight: 700,
  },
};

export default App;
