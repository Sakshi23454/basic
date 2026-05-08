import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/auth.api";
import { adminApi } from "./apis/admin.api";
import { userApi } from "./apis/user.api";
import { useSelector } from "react-redux";
import authSlice from "./slices/auth.slice";

const reduxStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authSlice,
  },
  middleware: (def) =>
    def().concat(authApi.middleware, adminApi.middleware, userApi.middleware),
});

export type RootType = ReturnType<typeof reduxStore.getState>;
export const useAppSelector = useSelector.withTypes<RootType>();

export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;