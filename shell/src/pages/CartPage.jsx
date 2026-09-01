import RemoteSlot from "../components/RemoteSlot";

export default function CartPage() {
  return (
    <div style={styles.wrap}>
      <RemoteSlot
        label="Cart remote"
        importRemote={() => import("cart_app/Cart")}
        fallback="Loading cart…"
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
