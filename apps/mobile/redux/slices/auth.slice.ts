import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth.api";

type AdminType = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  role: string;
};

type authType = {
  admin: AdminType | null;
};

const initialState: authType = {
  admin: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<AdminType | null>) => {
      state.admin = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(authApi.endpoints.signin.matchFulfilled, (state, { payload }) => {
        state.admin = payload.result as AdminType;
      })
      .addMatcher(authApi.endpoints.signout.matchFulfilled, (state) => {
        state.admin = null;
      }),
});

export const { setAdmin } = authSlice.actions; 
export default authSlice.reducer;