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
            query: (id) => ({
                url: `/api/v1/users/profile/${id}/`,
            }),
            providesTags: result => ['Profile']
        }),
        updateProfile: build.mutation<UserProfile, UserProfile>({
            query: (profile_data) => ({
                url: `api/v1/users/profile/${profile_data.id}/`,
                method: 'PATCH',
                headers: {
                    Authorization: 'Token '+profile_data.token,
                },
                body: profile_data,
            }),
            invalidatesTags: result => ['Profile']
        }),
        updateAvatar: build.mutation<string, UserProfile>({
            query: (data) => ({
                url: '/api/v1//users/profiles/image/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: result => ['Profile']
        }),
        deleteAvatar: build.mutation<string, UserProfile>({
            query: (data) => ({
                url: '/api/v1//users/profiles/image/',
                method: 'DELETE',
            }),
            invalidatesTags: result => ['Profile']
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
