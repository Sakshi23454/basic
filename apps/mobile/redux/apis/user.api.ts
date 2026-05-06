import { CONTACT_FORM_REQUEST, CONTACT_FORM_RESPONSE, EDUCATION_GET_RESPONSE, EXPERIENCE_GET_RESPONSE, GET_SKILLS_RESPONSE, GET_STATS_RESPONSE, PROFILE_GET_RESPONSE, PROJECT_GET_RESPONSE } from "@repo/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { env } from "./../../config/env";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api/user`, credentials: "include" }),
    tagTypes: [],
    endpoints: (builder) => {
        return {
            getProjects: builder.query<PROJECT_GET_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/getproject",
                        method: "GET"
                    }
                },
            }),

            getSkills: builder.query<GET_SKILLS_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/getskills",
                        method: "GET"
                    }
                },
            }),

            getExperience: builder.query<EXPERIENCE_GET_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/getexperience",
                        method: "GET"
                    }
                },
            }),

            getEducation: builder.query<EDUCATION_GET_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/geteducation",
                        method: "GET"
                    }
                },
            }),

            getProfile: builder.query<PROFILE_GET_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/getprofile",
                        method: "GET"
                    }
                },
            }),

            addcontactForm: builder.mutation<CONTACT_FORM_RESPONSE, CONTACT_FORM_REQUEST>({
                query: userData => {
                    return {
                        url: "/addcontactform",
                        method: "POST",
                        body: userData
                    }
                },
            }),

            viewStats: builder.query<GET_STATS_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/viewstats",
                        method: "GET"
                    }
                },
            }),
        }
    }
})

export const {
    useGetProjectsQuery,
    useGetSkillsQuery,
    useGetExperienceQuery,
    useGetEducationQuery,
    useGetProfileQuery,
    useAddcontactFormMutation,
    useViewStatsQuery
} = userApi