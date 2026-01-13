/**
 * API client placeholder (Task 2.3).
 * - Provides a thin wrapper over fetch with basic error handling and retry hook.
 * - No real endpoints; returns fail-closed placeholders.
 */

export interface ApiResponse<T = unknown> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

export async function apiGet(url: string): Promise<ApiResponse> {
  try {
    const res = await fetch(url, { method: "GET" });
    return { ok: res.ok, status: res.status, data: res.ok ? await res.json().catch(() => null) : undefined };
  } catch (e) {
    return { ok: false, status: 0, error: (e as Error).message };
  }
}

export async function apiPost(url: string, body: unknown): Promise<ApiResponse> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, data: res.ok ? await res.json().catch(() => null) : undefined };
  } catch (e) {
    return { ok: false, status: 0, error: (e as Error).message };
  }
}

