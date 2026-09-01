import { lazy, Suspense, useMemo, useState } from "react";
import RemoteErrorBoundary from "../RemoteErrorBoundary";
import { loadRemote } from "../utils/loadRemote";

export default function RemoteSlot({
  label,
  importRemote,
  fallback = "Loading remote…",
  skeleton,
}) {
  const [retryKey, setRetryKey] = useState(0);
  const RemoteComponent = useMemo(
    () => lazy(loadRemote(importRemote)),
    // retryKey forces a fresh lazy import after user clicks Retry
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [retryKey]
  );

  return (
    <RemoteErrorBoundary
      key={retryKey}
      label={label}
      onRetry={() => setRetryKey((value) => value + 1)}
    >
      <Suspense fallback={skeleton ?? <p style={styles.loading}>{fallback}</p>}>
        <RemoteComponent />
      </Suspense>
    </RemoteErrorBoundary>
  );
}

const styles = {
  loading: {
    textAlign: "center",
    color: "#6b7280",
    padding: "2rem",
    margin: 0,
  },
};
