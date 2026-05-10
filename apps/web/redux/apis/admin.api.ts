import { ADD_PROFILEPIC_REQUEST, ADD_PROFILEPIC_RESPONSE, EDUCATION_CREATE_REQUEST, EDUCATION_CREATE_RESPONSE, EDUCATION_DELETE_REQUEST, EDUCATION_DELETE_RESPONSE, EDUCATION_READ_RESPONSE, EDUCATION_UPDATE_REQUEST, EDUCATION_UPDATE_RESPONSE, EXPERIENCE_CREATE_REQUEST, EXPERIENCE_CREATE_RESPONSE, EXPERIENCE_DELETE_REQUEST, EXPERIENCE_DELETE_RESPONSE, EXPERIENCE_READ_RESPONSE, EXPERIENCE_UPDATE_REQUEST, EXPERIENCE_UPDATE_RESPONSE, GET_CONTACT_RESPONSE, GET_STATS_RESPONSE, PROFILE_READ_REQUEST, PROFILE_READ_RESPONSE, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_RESPONSE, PROJECT_CREATE_REQUEST, PROJECT_CREATE_RESPONSE, PROJECT_DELETE_REQUEST, PROJECT_DELETE_RESPONSE, PROJECT_READ_RESPONSE, PROJECT_UPDATE_REQUEST, PROJECT_UPDATE_RESPONSE, READ_SKILLS_RESPONSE, SKILL_CREATE_REQUEST, SKILL_CREATE_RESPONSE, SKILL_DELETE_REQUEST, SKILL_DELETE_RESPONSE, STATS_CREATE_REQUEST, STATS_CREATE_RESPONSE } from "@repo/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { APP_URL } from "../../config/env"

export const adminApi = createApi({
    reducerPath: "adminApi",
    // baseQuery: fetchBaseQuery({ baseUrl: `${APP_URL}/api/admin`, credentials: "include"  }),
    baseQuery: fetchBaseQuery({ baseUrl: `/api/admin`, credentials: "include" }),

    tagTypes: ["project", "skill", "experience", "education", "profile", "resume", "stats"],
    endpoints: (builder) => {
        return {
            addProject: builder.mutation<PROJECT_CREATE_RESPONSE, PROJECT_CREATE_REQUEST>({
                query: userData => {
                    return {
                        url: "/addproject",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["project"]
            }),

            readProjects: builder.query<PROJECT_READ_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/readprojects",
                        method: "GET"
                    }
                },
                providesTags: ["project"]
            }),


            updateProject: builder.mutation<PROJECT_UPDATE_RESPONSE, PROJECT_UPDATE_REQUEST>({
                query: userData => {
                    return {
                        url: "/update-project/" + userData.id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["project"]
            }),

            deleteProject: builder.mutation<PROJECT_DELETE_RESPONSE, PROJECT_DELETE_REQUEST>({
                query: (data) => {
                    return {
                        url: "/delete-project/" + data.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["project"]
            }),

            addSkill: builder.mutation<SKILL_CREATE_RESPONSE, SKILL_CREATE_REQUEST>({
                query: userData => {
                    return {
                        url: "/addskill",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["skill"]
            }),

            readSkill: builder.query<READ_SKILLS_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/readskill",
                        method: "GET"
                    }
                },
                providesTags: ["skill"]
            }),


            deleteSkill: builder.mutation<SKILL_DELETE_RESPONSE, SKILL_DELETE_REQUEST>({
                query: (data) => {
                    return {
                        url: "/delete-skill/" + data.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["skill"]
            }),

            addExperience: builder.mutation<EXPERIENCE_CREATE_RESPONSE, EXPERIENCE_CREATE_REQUEST>({
                query: userData => {
                    return {
                        url: "/addexperience",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["experience"]
            }),

            readExperience: builder.query<EXPERIENCE_READ_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/readexperience",
                        method: "GET"
                    }
                },
                providesTags: ["experience"]
            }),


            updateExperience: builder.mutation<EXPERIENCE_UPDATE_RESPONSE, EXPERIENCE_UPDATE_REQUEST>({
                query: userData => {
                    return {
                        url: "/update-experience/" + userData.id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["experience"]
            }),

            deleteExperience: builder.mutation<EXPERIENCE_DELETE_RESPONSE, EXPERIENCE_DELETE_REQUEST>({
                query: (data) => {
                    return {
                        url: "/delete-experience/" + data.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["experience"]
            }),

            addEducation: builder.mutation<EDUCATION_CREATE_RESPONSE, EDUCATION_CREATE_REQUEST>({
                query: userData => {
                    return {
                        url: "/addeducation",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["education"]
            }),

            readEducation: builder.query<EDUCATION_READ_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/readeducation",
                        method: "GET"
                    }
                },
                providesTags: ["education"]
            }),

            updateEducation: builder.mutation<EDUCATION_UPDATE_RESPONSE, EDUCATION_UPDATE_REQUEST>({
                query: userData => {
                    return {
                        url: "/update-education/" + userData.id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["education"]
            }),

            deleteEducation: builder.mutation<EDUCATION_DELETE_RESPONSE, EDUCATION_DELETE_REQUEST>({
                query: (data) => {
                    return {
                        url: "/delete-education/" + data.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["education"]
            }),

            addProfile: builder.mutation<ADD_PROFILEPIC_RESPONSE, ADD_PROFILEPIC_REQUEST>({
                query: userData => {
                    return {
                        url: "/addprofile",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["profile"]
            }),

            readProfile: builder.query<PROFILE_READ_RESPONSE, PROFILE_READ_REQUEST>({
                query: () => {
                    return {
                        url: "/readprofile",
                        method: "GET"
                    }
                },
                providesTags: ["profile"]
            }),


            updateProfile: builder.mutation<PROFILE_UPDATE_RESPONSE, PROFILE_UPDATE_REQUEST>({
                query: userData => {
                    return {
                        url: "/update-profile/" + userData.id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["profile"]
            }),


            addResume: builder.mutation<void, FormData>({
                query: userData => {
                    return {
                        url: "/addresume",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["resume"]
            }),

            deleteResume: builder.mutation<void, string>({
                query: (id) => {
                    return {
                        url: "/deleteresume/" + id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["resume"]
            }),

            getContacts: builder.query<GET_CONTACT_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/getcontacts",
                        method: "GET"
                    }
                },
            }),

            addStats: builder.mutation<STATS_CREATE_RESPONSE, STATS_CREATE_REQUEST>({
                query: userData => {
                    return {
                        url: "/addstats",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["stats"]
            }),

            readStats: builder.query<GET_STATS_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/readstats",
                        method: "GET",
                    }
                },
                providesTags: ["stats"]
            }),
        }
    }
})

export const {
    useAddProjectMutation,
    useReadProjectsQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useAddSkillMutation,
    useReadSkillQuery,
    useDeleteSkillMutation,
    useAddExperienceMutation,
    useReadExperienceQuery,
    useUpdateExperienceMutation,
    useDeleteExperienceMutation,
    useAddEducationMutation,
    useReadEducationQuery,
    useUpdateEducationMutation,
    useDeleteEducationMutation,
    useAddProfileMutation,
    useReadProfileQuery,
    useUpdateProfileMutation,
    useAddResumeMutation,
    useDeleteResumeMutation,
    useGetContactsQuery,
    useAddStatsMutation,
    useReadStatsQuery
} = adminApi