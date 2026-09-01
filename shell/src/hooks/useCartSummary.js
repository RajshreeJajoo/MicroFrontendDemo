import { useEffect, useState } from "react";
import {
  CART_EVENTS,
  getCartSummary,
  loadCart,
  subscribeMfeEvent,
} from "@mfe/contracts";

export default function useCartSummary() {
  const [summary, setSummary] = useState(() => getCartSummary(loadCart()));

  useEffect(() => {
    function onSync(event) {
      setSummary({
        count: event.detail.count,
        total: event.detail.total,
      });
    }

    const unsubscribe = subscribeMfeEvent(CART_EVENTS.SYNC, onSync);
    return unsubscribe;
  }, []);

  return summary;
}
