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

function readCookie(name:string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000',
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
                params: {
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
                params: {
                    Authorization: 'Token '+token,
                }
            }),
            providesTags: result => ['Authorization']
        }),
        patchUser: build.mutation<UserDetails, AuthUserDetails>({
            query: (auth_data) => ({
                url: `/api/v1/dj-rest-auth/user/`,
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
