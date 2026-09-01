/** @typedef {{ id: number, name: string, price: number, category?: string, quantity?: number }} CartItem */

export const CART_EVENTS = {
  ADD: "mfe:add-to-cart",
  REMOVE: "mfe:remove-from-cart",
  SYNC: "mfe:cart-sync",
  CLEAR: "mfe:cart-clear",
};

export const CART_STORAGE_KEY = "mfe:cart";

export function dispatchAddToCart(product) {
  window.dispatchEvent(
    new CustomEvent(CART_EVENTS.ADD, { detail: product })
  );
}

export function dispatchRemoveFromCart(id) {
  window.dispatchEvent(
    new CustomEvent(CART_EVENTS.REMOVE, { detail: { id } })
  );
}

export function dispatchClearCart() {
  window.dispatchEvent(new CustomEvent(CART_EVENTS.CLEAR));
}

/** @param {string} event @param {(event: CustomEvent) => void} handler */
export function subscribeMfeEvent(event, handler) {
  window.addEventListener(event, handler);
  return () => window.removeEventListener(event, handler);
}

/** @returns {CartItem[]} */
export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** @param {CartItem[]} items */
export function saveCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

/** @param {CartItem[]} items */
export function getCartSummary(items) {
  return items.reduce(
    (summary, item) => ({
      count: summary.count + (item.quantity ?? 1),
      total: summary.total + item.price * (item.quantity ?? 1),
    }),
    { count: 0, total: 0 }
  );
}

/** @param {CartItem[]} items */
export function dispatchCartSync(items) {
  const { count, total } = getCartSummary(items);

  window.dispatchEvent(
    new CustomEvent(CART_EVENTS.SYNC, {
      detail: { count, total, items },
    })
  );
}
