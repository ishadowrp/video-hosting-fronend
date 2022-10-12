import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {mediaAPI} from "../../services/MediaService";
import {MediaRating} from "../../types/IMedia";
import {Rating} from "react-simple-star-rating";
import {useParams} from "react-router-dom";
import {rateSlice} from "../../store/reducers/RateSlice";
import {ChatWindow} from "../chats/ChatWindow";

export const MediaElement:React.FC = () => {
    let params = useParams();

    const {token, details} = useAppSelector(state => state.userReducer)
    const {rating: storeRating} = useAppSelector(state => state.rateReducer)
    const [updateRatingMedia, ] = mediaAPI.useUpdateMediaRatingMutation();
    const [newRatingMedia, ] = mediaAPI.usePostMediaRatingMutation();
    const {data: media} = mediaAPI.useGetMediaQuery(
        {
            token: (token)?token:'',
            id: (params.mediaId)?params.mediaId:'',
        }
    );

    const requestRatingData = {
        token: (token)?token:'',
        media: (params.mediaId)?Number(params.mediaId):0,
        author: (details && details.pk)?details.pk:0,
    }

    const {data: ratingData} = mediaAPI.useGetMediaRatingQuery(requestRatingData);

    let [rating, setRating] = useState(storeRating);

    const dispatch = useAppDispatch();
    const {setMediaRatingData} = rateSlice.actions;

    useEffect(() => {
        // @ts-ignore
        if (ratingData && ratingData[0].rating) {
            // @ts-ignore
            dispatch(setMediaRatingData(ratingData[0].rating))
            // @ts-ignore
            setRating(ratingData[0].rating)
        } else {
            const currentRating: MediaRating = {
                media: (params.mediaId)?Number(params.mediaId):0,
                author: (details && details.pk) ? details.pk : 0,
                rating: (media && media.current_rating) ? media.current_rating : 0,
            }
            setRating((media && media.current_rating) ? media.current_rating : 0)
            dispatch(setMediaRatingData(currentRating))
        }
    },[ratingData, details, media, params.mediaId, dispatch, setMediaRatingData, setRating])
    // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate);
        const newRating:MediaRating = {
            // @ts-ignore
            id: (ratingData && ratingData[0].id)?Number(ratingData[0].id):undefined,
            media: (params.mediaId)?Number(params.mediaId):0,
            author: (details && details.pk)?details.pk:0,
            rating: rate,
            token: (token)?token:'',
        }
        if (newRating.id) {
            updateRatingMedia(newRating);
        } else {
            newRatingMedia(newRating);
        }
    }

    return(
        <div className='movie-card'>
            <h2>{media && media.title}</h2>
            <video controls width="100%" className="movie-card-unit background-image">
                <source src={media?media.media:''} type="video/mp4" className='restaurant-card-content-items'/>
            </video>
            <div className="movie-card-content">
                <div className="movie-card-numbers">
                    <span className="movie-card-desc">Views: {media && media.views_count}</span>
                    <Rating
                        onClick={handleRating}
                        initialValue={rating}
                        transition={true}
                        size={24}
                    />
                </div>
            </div>
            <div className="movie-card-description">
                {media && media.description && media.description}
            </div>
            <ChatWindow media={(params.mediaId)?Number(params.mediaId):0} />
        </div>
    )
}