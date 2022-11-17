import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {
    IMedia,
    MediaRating,
    MediaUnit,
    SearchService,
    SimpleMediaRequest,
    MediaRatingRequest,
    CommentsRequest, CommentResponse, SearchMediaByAuthor
} from "../types/IMedia";
import {readCookie} from "./Service";

export const mediaAPI = createApi({
    reducerPath: 'mediaAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers) => {
            const crfToken = readCookie('csrftoken');

            // If we have a token set in state, let's assume that we should be passing it.
            if (crfToken) {
                headers.set('X-CSRFToken', `${crfToken}`)
            }

            return headers
        },
    }),
    tagTypes: ['Media'],
    endpoints: (build) => ({
        fetchAllMedia: build.query<MediaUnit[], string>({
            query: (token) => ({
                url: `/api/v1/media/`,
                headers: {
                    Authorization: 'Token '+token,
                }
            }),
            providesTags: result => ['Media']
        }),
        fetchLast10: build.query<MediaUnit[], string>({
            query: (token) => ({
                url: `/api/v1/media/order?ordering=-date_posted`,
                headers: {
                    Authorization: 'Token '+token,
                }
            }),
            providesTags: result => ['Media']
        }),
        fetchMostPopular: build.query<MediaUnit[], string>({
            query: (token) => ({
                url: `/api/v1/media/order?ordering=-views_count`,
                headers: {
                    Authorization: 'Token '+token,
                }
            }),
            providesTags: result => ['Media']
        }),
        fetchSearch: build.query<MediaUnit[], SearchService>({
            query: (searchData) => ({
                url: `/api/v1/media/search?media=${searchData.searchString}`,
                headers: {
                    Authorization: 'Token '+searchData.token,
                }
            }),
            providesTags: result => ['Media']
        }),
        getMediaByAuthor: build.query<MediaUnit[], SearchMediaByAuthor>({
            query: (request) => ({
                url: `/api/v1/media/author?author=${request.author}`,
                headers: {
                    Authorization: 'Token '+request.token,
                }
            }),
            providesTags: result => ['Media']
        }),
        getCommentsByMedia: build.query<CommentResponse[], CommentsRequest>({
            query: (request) => ({
                url: `/api/v1/media/comments?media=${request.media}`,
                headers: {
                    Authorization: 'Token '+request.token,
                }
            }),
            providesTags: result => ['Media']
        }),
        postMediaRating: build.mutation<MediaRating, MediaRating>({
            query: (rating, ) => ({
                url: `/api/v1/rating/`,
                headers: {
                    Authorization: 'Token '+rating.token,
                },
                method: 'POST',
                body: rating,
            }),
            invalidatesTags: ['Media']
        }),
        updateMediaRating: build.mutation<MediaRating, MediaRating>({
            query: (data, ) => ({
                url: `/api/v1/rating/${data.id}/`,
                headers: {
                    Authorization: 'Token '+data.token,
                },
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Media']
        }),
        getMediaRating: build.query<MediaRating[], MediaRatingRequest>({
            query: (rating, ) => ({
                url: `/api/v1/rating/`,
                headers: {
                    Authorization: 'Token '+rating.token,
                },
                params: {
                    media: rating.media,
                    author: rating.author,
                },
            }),
            providesTags: ['Media']
        }),
        createMedia: build.mutation<MediaUnit, IMedia>({
            query: (media, ) => ({
                url: `/api/v1/media/`,
                headers: {
                    Authorization: 'Token '+media.token,
                },
                method: 'POST',
                body: media.media
            }),
            invalidatesTags: ['Media']
        }),
        getMedia: build.query<MediaUnit, SimpleMediaRequest>({
            query: (media, ) => ({
                url: `/api/v1/media/${media.id}`,
                headers: {
                    Authorization: 'Token '+media.token,
                },
            }),
            providesTags: result => ['Media']
        }),
        updateMedia: build.mutation<MediaUnit, IMedia>({
            query: (media, ) => ({
                url: `/api/v1/media/${media.media.id}`,
                headers: {
                    Authorization: 'Token '+media.token,
                },
                method: 'PUT',
                body: media.media
            }),
            invalidatesTags: ['Media']
        }),
        deleteMedia: build.mutation<MediaUnit, IMedia>({
            query: (media, ) => ({
                url: `/api/v1/media/${media.media.id}`,
                headers: {
                    Authorization: 'Token '+media.token,
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['Media']
        }),
    })
})