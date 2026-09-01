export function loadRemote(importFn, { retries = 3, delayMs = 700 } = {}) {
  return async () => {
    let lastError;

    for (let attempt = 0; attempt < retries; attempt += 1) {
      try {
        return await importFn();
      } catch (error) {
        lastError = error;

        if (attempt < retries - 1) {
          await new Promise((resolve) => {
            window.setTimeout(resolve, delayMs);
          });
        }
      }
    }

    throw lastError;
  };
}
