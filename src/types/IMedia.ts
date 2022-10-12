export type MediaUnit = {
    id?: number,
    title: string,
    description: string,
    media: string,
    author:	number,
    date_posted?: string,
    views_count?: number,
    current_rating?: number,
}

export interface SearchInitialState {
    searchText: string,
    searchResult: MediaUnit[]
}

export interface MediaFC {
    key?: number,
    media: MediaUnit,
}

export interface IMedia {
    media: MediaUnit,
    token?: string,
}

export interface MediaRating{
    media: number,
    author: number,
    rating: number,
    token?: string,
}

export interface MediaRatingRequest{
    media: number,
    author: number,
    token: string,
}

export interface CommentsRequest {
    token: string,
    media: string,
}

export interface CommentResponse {
    id: number,
    media: string,
    author: string,
    username: string,
    date_posted: string,
    current_rating: number,
    content: string

}

export interface SearchService {
    searchString: string,
    token?: string,
}

export interface SimpleMediaRequest {
    token: string,
    id: string,
}