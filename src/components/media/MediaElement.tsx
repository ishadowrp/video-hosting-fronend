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
    const [updateRatingMedia, {data: dataUpdate}] = mediaAPI.useUpdateMediaRatingMutation();
    const [newRatingMedia, {data: dataNew}] = mediaAPI.usePostMediaRatingMutation();
    const {data: media} = mediaAPI.useGetMediaQuery(
        {
            token: (token)?token:'',
            id: (params.mediaId)?params.mediaId:'',
        }
    );
    const {data: ratingData} = mediaAPI.useGetMediaRatingQuery(
        {
            token: (token)?token:'',
            media: (media && media.id)?media.id:0,
            author: (details && details.pk)?details.pk:0,
        }
    );




    let [rating, setRating] = useState(storeRating);

    const dispatch = useAppDispatch();
    const {setMediaRatingData} = rateSlice.actions;

    useEffect(() => {
        if (ratingData) {
            dispatch(setMediaRatingData(ratingData))
            setRating(ratingData.rating)
        } else {
            const currentRating: MediaRating = {
                media: (media && media.id) ? media.id : 0,
                author: (details && details.pk) ? details.pk : 0,
                rating: (media && media.current_rating) ? media.current_rating : 0,
            }
            setRating((media && media.current_rating) ? media.current_rating : 0)
            dispatch(setMediaRatingData(currentRating))
        }
    })
    // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate);
        const newRating:MediaRating = {
            media: (media && media.id)?media.id:0,
            author: (details && details.pk)?details.pk:0,
            rating: rate,
            token: (token)?token:'',
        }
        try {
            newRatingMedia(newRating);
        } catch {
            updateRatingMedia(newRating);
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
            <ChatWindow media={(media && media.id)? media.id : 0} />
        </div>
    )
}