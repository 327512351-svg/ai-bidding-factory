const KEY = "aiba_web_state_v0";

export function loadState(): unknown {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined; // fail-closed: ignore corrupted state
  }
}

export function saveState(state: unknown): void {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(KEY, serialized);
  } catch {
    // ignore persistence errors (placeholder)
  }
}

