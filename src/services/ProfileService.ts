import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ImageUploadType, UserAvatar, UsernameID, UserProfile, VerificationRequest} from "../types/IProfile";
import {readCookie} from "./Service";
import {backendURL} from "../types/constants";


export const profileAPI = createApi({
    reducerPath: 'profileAPI',
    baseQuery: fetchBaseQuery({baseUrl: backendURL,
        prepareHeaders: (headers) => {
            const crfToken = readCookie('csrftoken');

            // If we have a token set in state, let's assume that we should be passing it.
            if (crfToken) {
                headers.set('X-CSRFToken', `${crfToken}`)
            }

            return headers
        },},),
    tagTypes: ['Profile', 'Avatar', 'Verification'],
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
        getAvatar: build.query<UserAvatar, ImageUploadType>({
            query: (request) => ({
                url: '/api/v1/profiles/image/',
                headers: {
                    'authorization': 'Token '+request.token,
                },
            }),
            providesTags: ['Avatar']
        }),
        uploadAvatar: build.mutation<UserAvatar, ImageUploadType>({
            query: (request) => ({
                url: '/api/v1/profiles/image/',
                headers: {
                    'Authorization': 'Token '+request.token,
                    'Content-type': 'multipart/form-data'
                },
                method: 'POST',
                body: request.data,
            }),
            invalidatesTags: ['Avatar']
        }),
        deleteAvatar: build.mutation<string, string>({
            query: (data) => ({
                url: '/api/v1/profiles/image/',
                headers: {
                    'authorization': 'Token '+data,
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['Avatar']
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
            invalidatesTags: ['Verification']
        }),
    })
})
