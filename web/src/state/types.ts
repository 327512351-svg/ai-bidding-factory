import { AuthState } from "./slices/authSlice";

export interface RootState {
  auth: AuthState;
}

export type AppDispatch = typeof import("./store").store.dispatch;

