import RemoteSlot from "../components/RemoteSlot";

export default function ProductPage() {
  return (
    <div style={styles.wrap}>
      <RemoteSlot
        label="Product remote"
        importRemote={() => import("product_app/Product")}
        fallback="Loading products…"
      />
    </div>
  );
}

const styles = {
  wrap: {
    maxWidth: "560px",
    margin: "0 auto",
  },
};
