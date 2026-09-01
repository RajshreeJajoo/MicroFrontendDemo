import { useEffect, useState } from "react";
import { CART_EVENTS, subscribeMfeEvent } from "@mfe/contracts";

let toastId = 0;

export default function useToasts() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    function onAdd(event) {
      const product = event.detail;
      const id = ++toastId;

      setToasts((previous) => [
        ...previous,
        { id, message: `${product.name} added to cart` },
      ]);

      window.setTimeout(() => {
        setToasts((previous) => previous.filter((toast) => toast.id !== id));
      }, 2800);
    }

    const unsubscribe = subscribeMfeEvent(CART_EVENTS.ADD, onAdd);
    return unsubscribe;
  }, []);

  return toasts;
}
