import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {UsernameID, UserProfile, VerificationRequest} from "../types/IProfile";
import {readCookie} from "./Service";


export const profileAPI = createApi({
    reducerPath: 'profileAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers) => {
            const crfToken = readCookie('csrftoken');

            // If we have a token set in state, let's assume that we should be passing it.
            if (crfToken) {
                headers.set('X-CSRFToken', `${crfToken}`)
            }

            return headers
        },},),
    tagTypes: ['Profile'],
    endpoints: (build) => ({
        userProfile: build.query<UserProfile, UsernameID>({
            query: (request) => ({
                url: `/api/v1/users/profiles/${request.id}/`,
                headers: {
                    Authorization: 'Token '+request.token,
                }
            }),
            providesTags: ['Profile']
        }),
        updateProfile: build.mutation<UserProfile, UserProfile>({
            query: (profile_data) => ({
                url: `/api/v1/users/profiles/${profile_data.id}/`,
                method: 'PATCH',
                headers: {
                    Authorization: 'Token '+profile_data.token,
                },
                body: profile_data,
            }),
            invalidatesTags: ['Profile']
        }),
        updateAvatar: build.mutation<string, UserProfile>({
            query: (data) => ({
                url: '/api/v1//users/profiles/image/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Profile']
        }),
        deleteAvatar: build.mutation<string, UserProfile>({
            query: (data) => ({
                url: '/api/v1//users/profiles/image/',
                method: 'DELETE',
            }),
            invalidatesTags: ['Profile']
        }),
        verificationPhone: build.mutation<VerificationRequest, VerificationRequest>({
            query: (data) => ({
                url: `/api/v1/dj-rest-auth/logout/`,
                headers: {
                    Authorization: 'Token '+data.token,
                },
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Profile']
        }),
    })
})
