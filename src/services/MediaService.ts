import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IMedia, Media, SearchService} from "../types/IMedia";


export const mediaAPI = createApi({
    reducerPath: 'mediaAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    tagTypes: ['Media'],
    endpoints: (build) => ({
        fetchAllMedia: build.query<Media[], string>({
            query: (token) => ({
                url: `/api/v1/media/`,
                params: {
                    Authorization: 'Token '+token,
                }
            }),
            providesTags: result => ['Media']
        }),
        fetchLast10: build.query<Media[], string>({
            query: (token) => ({
                url: `/api/v1/media/order?ordering=-date_posted`,
                params: {
                    Authorization: 'Token '+token,
                }
            }),
            providesTags: result => ['Media']
        }),
        fetchMostPopular: build.query<Media[], string>({
            query: (token) => ({
                url: `/api/v1/media/order?ordering=-views_count`,
                params: {
                    Authorization: 'Token '+token,
                }
            }),
            providesTags: result => ['Media']
        }),
        fetchSearch: build.query<Media[], SearchService>({
            query: (searchData) => ({
                url: `/api/v1/media/search?media=${searchData.searchString}`,
                params: {
                    Authorization: 'Token '+searchData.token,
                }
            }),
            providesTags: result => ['Media']
        }),
        createMedia: build.mutation<Media, IMedia>({
            query: (media, ) => ({
                url: `/api/v1/media/`,
                params: {
                    Authorization: 'Token '+media.token,
                },
                method: 'POST',
                body: media.media
            }),
            invalidatesTags: ['Media']
        }),
        getMedia: build.query<Media, IMedia>({
            query: (media, ) => ({
                url: `/api/v1/media/${media.media.id}`,
                params: {
                    Authorization: 'Token '+media.token,
                },
            }),
            providesTags: result => ['Media']
        }),
        updateMedia: build.mutation<Media, IMedia>({
            query: (media, ) => ({
                url: `/api/v1/media/${media.media.id}`,
                params: {
                    Authorization: 'Token '+media.token,
                },
                method: 'PUT',
                body: media.media
            }),
            invalidatesTags: ['Media']
        }),
        deleteMedia: build.mutation<Media, IMedia>({
            query: (media, ) => ({
                url: `/api/v1/media/${media.media.id}`,
                params: {
                    Authorization: 'Token '+media.token,
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['Media']
        }),
    })
})