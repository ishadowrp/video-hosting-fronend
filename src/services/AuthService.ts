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


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    tagTypes: ['Authorization'],
    endpoints: (build) => ({
        registrationUser: build.mutation<AuthLogSuccess, AuthReg>({
            query: (auth_data,) => ({
                url: `/dj-rest-auth/registration/`,
                method: 'POST',
                body: auth_data
            }),
            invalidatesTags: result => ['Authorization']
        }),
        passwordChange: build.mutation<AuthDetail, PasswordChange>({
            query: (auth_data,) => ({
                url: `/dj-rest-auth/password/change/`,
                method: 'POST',
                params: {
                    Authorization: 'Token '+auth_data.token,
                },
                body: auth_data.auth_data,
            }),
            invalidatesTags: result => ['Authorization']
        }),
        loginUser: build.mutation<AuthLogSuccess, AuthLogin>({
            query: (auth_data,) => ({
                url: `/dj-rest-auth/login/`,
                method: 'POST',
                body: auth_data
            }),
            invalidatesTags: result => ['Authorization']
        }),
        logoutUser: build.mutation<AuthDetail, string>({
            query: (token, ) => ({
                url: `/dj-rest-auth/logout/`,
                params: {
                    Authorization: 'Token '+token,
                },
                method: 'POST',
            }),
            invalidatesTags: ['Authorization']
        }),
        getUser: build.query<UserDetails, string>({
            query: (token,) => ({
                url: `/dj-rest-auth/user/`,
                params: {
                    Authorization: 'Token '+token,
                }
            }),
            providesTags: result => ['Authorization']
        }),
        patchUser: build.mutation<UserDetails, AuthUserDetails>({
            query: (auth_data, ) => ({
                url: `/dj-rest-auth/user/`,
                params: {
                    Authorization: 'Token '+auth_data.token,
                },
                body: auth_data.details,
                method: 'PATCH',
            }),
            invalidatesTags: ['Authorization']
        }),
    })
})
