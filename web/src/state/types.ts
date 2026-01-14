import { AuthState } from "./slices/authSlice";
import { NotificationState } from "./slices/notificationSlice";

export interface RootState {
  auth: AuthState;
  notifications: NotificationState;
}

export type AppDispatch = typeof import("./store").store.dispatch;

