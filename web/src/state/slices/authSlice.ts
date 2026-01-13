import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  status: "unauthenticated" | "requires_human_review" | "authenticated";
  user?: string;
}

const initialState: AuthState = {
  status: "unauthenticated",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<AuthState>) {
      state.status = action.payload.status;
      state.user = action.payload.user;
    },
    logout(state) {
      state.status = "unauthenticated";
      state.user = undefined;
    },
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

