import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NotificationLevel = "info" | "warning" | "error";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  level: NotificationLevel;
  timestamp: string;
  read: boolean;
}

export interface NotificationState {
  status: "disconnected" | "connected";
  lastError?: string;
  items: NotificationItem[];
}

const initialState: NotificationState = {
  status: "disconnected",
  items: [],
};

const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    connect(state) {
      state.status = "connected";
      state.lastError = undefined;
    },
    disconnect(state) {
      state.status = "disconnected";
    },
    setError(state, action: PayloadAction<string>) {
      state.lastError = action.payload;
    },
    pushNotification(state, action: PayloadAction<NotificationItem>) {
      state.items = [action.payload, ...state.items];
    },
    markAllRead(state) {
      state.items = state.items.map((item) => ({ ...item, read: true }));
    },
    clearAll(state) {
      state.items = [];
    },
  },
});

export const notificationsReducer = slice.reducer;
export const notificationsActions = slice.actions;

