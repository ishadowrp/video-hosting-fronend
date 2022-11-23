import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {
    AuthDetail,
    AuthLogin,
    AuthLogSuccess,
    AuthReg,
    AuthUserDetails,
    PasswordChange,
    UserDetails
} from "../types/IAuth";
import {readCookie} from "./Service";
import {backendURL} from "../types/constants";


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: backendURL,
        prepareHeaders: (headers) => {
            const crfToken = readCookie('csrftoken');

            // If we have a token set in state, let's assume that we should be passing it.
            if (crfToken) {
                headers.set('X-CSRFToken', `${crfToken}`)
            }

            return headers
        },},),
    tagTypes: ['Authorization'],
    endpoints: (build) => ({
        registrationUser: build.mutation<AuthLogSuccess, AuthReg>({
            query: (auth_data) => ({
                url: `/api/v1/dj-rest-auth/registration/`,
                method: 'POST',
                body: auth_data
            }),
            invalidatesTags: result => ['Authorization']
        }),
        passwordChange: build.mutation<AuthDetail, PasswordChange>({
            query: (auth_data) => ({
                url: `/api/v1/dj-rest-auth/password/change/`,
                method: 'POST',
                headers: {
                    Authorization: 'Token '+auth_data.token,
                },
                body: auth_data.auth_data,
            }),
            invalidatesTags: result => ['Authorization']
        }),
        loginUser: build.mutation<AuthLogSuccess, AuthLogin>({
            query: (auth_data) => ({
                url: '/api/v1/dj-rest-auth/login/',
                method: 'POST',
                body: auth_data,
            }),
            invalidatesTags: result => ['Authorization']
        }),
        logoutUser: build.mutation<AuthDetail, string>({
            query: (token) => ({
                url: `/api/v1/dj-rest-auth/logout/`,
                headers: {
                    Authorization: 'Token '+token,
                },
                method: 'POST',
            }),
            invalidatesTags: ['Authorization']
        }),
        getUser: build.query<UserDetails, string>({
            query: (token) => ({
                url: `/api/v1/dj-rest-auth/user/`,
                headers: {
                    Authorization: 'Token '+token,
                }
            }),
            providesTags: result => ['Authorization']
        }),
        patchUser: build.mutation<UserDetails, AuthUserDetails>({
            query: (auth_data) => ({
                url: `/api/v1/dj-rest-auth/user/`,
                headers: {
                    Authorization: 'Token '+auth_data.token,
                },
                body: auth_data.details,
                method: 'PATCH',
            }),
            invalidatesTags: ['Authorization']
        }),
    })
})
