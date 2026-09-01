import { NavLink } from "react-router-dom";
import useCartSummary from "../hooks/useCartSummary";

export default function ShellNav() {
  const { count, total } = useCartSummary();

  return (
    <nav style={styles.nav} aria-label="Main">
      <NavLink
        to="/"
        style={({ isActive }) => ({
          ...styles.link,
          ...(isActive ? styles.linkActive : {}),
        })}
        end
      >
        Shop
      </NavLink>
      <NavLink
        to="/cart"
        style={({ isActive }) => ({
          ...styles.link,
          ...(isActive ? styles.linkActive : {}),
        })}
      >
        Cart
        {count > 0 ? <span style={styles.badge}>{count}</span> : null}
      </NavLink>
      {count > 0 ? (
        <span style={styles.total}>${total.toFixed(2)}</span>
      ) : null}
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "none",
    color: "#4b5563",
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "0.45rem 0.9rem",
    borderRadius: "999px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  linkActive: {
    color: "#4338ca",
    borderColor: "#c7d2fe",
    background: "#eef2ff",
  },
  badge: {
    minWidth: "1.25rem",
    height: "1.25rem",
    padding: "0 0.35rem",
    borderRadius: "999px",
    background: "#6366f1",
    color: "#fff",
    fontSize: "0.7rem",
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  total: {
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "#15803d",
    padding: "0.35rem 0.65rem",
    background: "#ecfdf5",
    borderRadius: "999px",
  },
};
