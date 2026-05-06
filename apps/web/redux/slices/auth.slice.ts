import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth.api";
import { getStorage } from "../utils/authStorage";

type authType = {
    admin: {
        id: number,
        name: string,
        email: string,
        mobile: string,
        role: string
    } | null,
}

const initialState: authType = {
    admin: getStorage() 
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},

    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.signin.matchFulfilled, (state, { payload }) => {
            state.admin = payload.result as authType["admin"]
        })
        .addMatcher(authApi.endpoints.signout.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })
})

// export const {  } = authSlice.actions
export default authSlice.reducer