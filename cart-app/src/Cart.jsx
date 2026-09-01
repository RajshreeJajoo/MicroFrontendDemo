import { useEffect, useState } from "react";
import {
  CART_EVENTS,
  dispatchCartSync,
  dispatchClearCart,
  dispatchRemoveFromCart,
  loadCart,
  saveCart,
  subscribeMfeEvent,
} from "@mfe/contracts";

const Cart = () => {
  const [items, setItems] = useState(() => loadCart());

  useEffect(() => {
    saveCart(items);
    dispatchCartSync(items);
  }, [items]);

  useEffect(() => {
    function onAdd(event) {
      const product = event.detail;

      setItems((previous) => {
        const existing = previous.find((item) => item.id === product.id);

        if (existing) {
          return previous.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...previous, { ...product, quantity: 1 }];
      });
    }

    function onRemove(event) {
      const productId = event.detail?.id;

      setItems((previous) =>
        previous.filter((item) => item.id !== productId)
      );
    }

    function onClear() {
      setItems([]);
    }

    const unsubscribers = [
      subscribeMfeEvent(CART_EVENTS.ADD, onAdd),
      subscribeMfeEvent(CART_EVENTS.REMOVE, onRemove),
      subscribeMfeEvent(CART_EVENTS.CLEAR, onClear),
    ];

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function removeItem(id) {
    dispatchRemoveFromCart(id);
  }

  function clearCart() {
    dispatchClearCart();
  }

  return (
    <section style={styles.section}>
      <div style={styles.headerRow}>
        <div>
          <div style={styles.badge}>Remote MFE · Cart App · :3002</div>
          <h2 style={styles.heading}>Cart</h2>
        </div>
        {items.length > 0 ? (
          <button type="button" style={styles.clearBtn} onClick={clearCart}>
            Clear
          </button>
        ) : null}
      </div>
      <p style={styles.hint}>
        Persists to <code style={styles.code}>localStorage</code> · listens on
        shared <code style={styles.code}>@mfe/contracts</code> event bus
      </p>

      {items.length === 0 ? (
        <p style={styles.empty}>Cart is empty — add products from the shop</p>
      ) : (
        <>
          <ul style={styles.list}>
            {items.map((item) => (
              <li key={item.id} style={styles.card}>
                <span style={styles.name}>
                  {item.name}{" "}
                  <span style={styles.qty}>×{item.quantity}</span>
                </span>
                <div style={styles.actions}>
                  <span style={styles.lineTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    style={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div style={styles.total}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </section>
  );
};

const styles = {
  section: {
    flex: 1,
    minWidth: "280px",
    padding: "1.5rem",
    background: "#f0fdf4",
    borderRadius: "12px",
    border: "1px solid #bbf7d0",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "0.75rem",
  },
  badge: {
    display: "inline-block",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "#15803d",
    background: "#dcfce7",
    padding: "0.25rem 0.5rem",
    borderRadius: "6px",
    marginBottom: "0.75rem",
  },
  heading: {
    margin: "0 0 0.35rem",
    fontSize: "1.25rem",
    color: "#15803d",
  },
  hint: {
    margin: "0 0 1rem",
    fontSize: "0.85rem",
    color: "#64748b",
    lineHeight: 1.4,
  },
  code: {
    fontFamily: "ui-monospace, monospace",
    fontSize: "0.8rem",
    background: "#ecfdf5",
    padding: "0.1rem 0.35rem",
    borderRadius: "4px",
  },
  clearBtn: {
    border: "1px solid #fecaca",
    background: "#fff",
    color: "#b91c1c",
    borderRadius: "8px",
    padding: "0.35rem 0.65rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  empty: {
    margin: 0,
    padding: "1.5rem 1rem",
    textAlign: "center",
    color: "#6b7280",
    background: "#fff",
    borderRadius: "8px",
    border: "1px dashed #bbf7d0",
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
    gap: "0.5rem",
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
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  lineTotal: {
    fontWeight: 600,
    color: "#16a34a",
  },
  removeBtn: {
    border: "none",
    background: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "6px",
    width: "28px",
    height: "28px",
    cursor: "pointer",
    fontSize: "0.85rem",
    lineHeight: 1,
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
