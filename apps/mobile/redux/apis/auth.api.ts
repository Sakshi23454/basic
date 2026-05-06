import { SIGNIN_REQUEST, SIGNIN_RESPONSE } from "@repo/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { removeStorage, setStorage } from "../utils/authStorage"
import { env } from "./../../config/env";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api/auth`, credentials: "include"  }),
    tagTypes: [],
    endpoints: (builder) => {
        return {
            signin: builder.mutation<SIGNIN_RESPONSE, SIGNIN_REQUEST>({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data: SIGNIN_RESPONSE) => {
                    setStorage(data)
                    return data
                }
            }),

            signout: builder.mutation<void, void>({
                query: userData => {
                    return {
                        url: "/logout",
                        method: "POST",
                    }
                },
                transformResponse: () => {
                    removeStorage()
                }
            }),

        }
    }
})

export const {
    useSigninMutation,
    useSignoutMutation
} = authApi
