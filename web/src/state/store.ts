import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./persistence";
import { authReducer } from "./slices/authSlice";

const rootReducer = {
  auth: authReducer,
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false, // placeholder to avoid false positives with persisted/empty state
    }),
});

store.subscribe(() => {
  saveState(store.getState());
});

