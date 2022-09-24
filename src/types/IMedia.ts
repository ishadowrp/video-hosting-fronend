export interface Media {
    id?: number,
    title: string,
    description: string,
    media: string,
    author:	number,
    date_posted?: string,
    views_count?: number,
    current_rating?: string,
}

export interface IMedia {
    media: Media,
    token?: string,
}

export interface SearchService {
    searchString: string,
    token?: string,
}
