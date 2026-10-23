/** Simulates network latency for mocked backend calls so loading states show. */
export function mockDelay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
