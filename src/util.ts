/**
 * Async function to sleep for a number of milliseconds.
 *
 * Call like: await sleep(5000);
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
