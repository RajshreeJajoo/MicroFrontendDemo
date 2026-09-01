import RemoteSlot from "../components/RemoteSlot";

function RemoteSkeleton({ label }) {
  return (
    <div style={styles.skeleton} aria-busy="true" aria-label={`Loading ${label}`}>
      <div style={styles.shimmer} />
      <div style={{ ...styles.shimmer, width: "70%" }} />
      <div style={{ ...styles.shimmer, width: "85%" }} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <div style={styles.grid}>
      <RemoteSlot
        label="Product remote"
        importRemote={() => import("product_app/Product")}
        skeleton={<RemoteSkeleton label="Product remote" />}
      />
      <RemoteSlot
        label="Cart remote"
        importRemote={() => import("cart_app/Cart")}
        skeleton={<RemoteSkeleton label="Cart remote" />}
      />
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  skeleton: {
    flex: 1,
    minWidth: "280px",
    padding: "1.5rem",
    borderRadius: "12px",
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  shimmer: {
    height: "14px",
    borderRadius: "6px",
    background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
    backgroundSize: "200% 100%",
    animation: "mfe-shimmer 1.2s infinite",
  },
};
