export default function ToastStack({ toasts }) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div style={styles.container} aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} style={styles.toast}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    zIndex: 1000,
    maxWidth: "min(320px, calc(100vw - 2rem))",
  },
  toast: {
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    background: "#111827",
    color: "#f9fafb",
    fontSize: "0.875rem",
    fontWeight: 500,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
};
