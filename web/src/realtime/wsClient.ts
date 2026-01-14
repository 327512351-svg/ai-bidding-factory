/**
 * WebSocket client placeholder (Task 2.5).
 * - Provides connect/disconnect hooks
 * - No real server interaction; fail-closed by default
 */

export interface WsStatus {
  connected: boolean;
  lastError?: string;
  notes?: string;
}

export type WsMessage = {
  type: string;
  payload: unknown;
};

/**
 * WebSocket client placeholder (Task 14).
 * - Does NOT connect to real backend; emits mock events locally.
 * - Fail-closed: if not connected, emitMock will no-op.
 */
export class WsClient {
  private status: WsStatus = { connected: false, notes: "placeholder client" };
  private listeners: Array<(msg: WsMessage) => void> = [];

  connect(_url: string): WsStatus {
    // Placeholder: immediately mark connected but note no real backend.
    this.status = { connected: true, notes: "connected (mock, no real server)" };
    return this.status;
  }

  disconnect(): WsStatus {
    this.status = { connected: false, notes: "disconnected" };
    return this.status;
  }

  getStatus(): WsStatus {
    return this.status;
  }

  onMessage(fn: (msg: WsMessage) => void) {
    this.listeners.push(fn);
  }

  emitMock(msg: WsMessage) {
    if (!this.status.connected) {
      return;
    }
    this.listeners.forEach((cb) => cb(msg));
  }
}


