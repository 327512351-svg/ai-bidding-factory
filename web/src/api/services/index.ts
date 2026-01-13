/**
 * Service layer placeholder (Task 2.3).
 * Extend with real endpoints later. Currently returns fail-closed placeholders.
 */

import { apiGet, apiPost } from "../client";

export const services = {
  // Example placeholder; replace with real endpoint usage later.
  async fetchStatus() {
    return apiGet("/api/status");
  },
  async submitPlaceholder(payload: unknown) {
    return apiPost("/api/submit", payload);
  },
};

