/**
 * WebSocket client placeholder (Task 2.5).
 * - Provides connect/disconnect hooks
 * - No real server interaction; fail-closed by default
 */

export interface WsStatus {
  connected: boolean;
  lastError?: string;
}

export class WsClient {
  private status: WsStatus = { connected: false };

  connect(_url: string): WsStatus {
    // placeholder: do not connect in skeleton
    this.status = { connected: false, lastError: "WebSocket not implemented (placeholder)" };
    return this.status;
  }

  disconnect(): WsStatus {
    this.status = { connected: false };
    return this.status;
  }

  getStatus(): WsStatus {
    return this.status;
  }
}

