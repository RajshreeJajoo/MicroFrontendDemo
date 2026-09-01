export const CART_EVENTS = {
  ADD: "mfe:add-to-cart",
  REMOVE: "mfe:remove-from-cart",
};

export function dispatchAddToCart(product) {
  window.dispatchEvent(
    new CustomEvent(CART_EVENTS.ADD, { detail: product })
  );
}
