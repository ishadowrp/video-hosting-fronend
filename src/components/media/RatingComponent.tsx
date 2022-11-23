import React, {useEffect, useState} from 'react';
import {Rating} from "react-simple-star-rating";
import {MediaComponentProps, MediaRating} from "../../types/IMedia";
import {mediaAPI} from "../../services/MediaService";

const RatingComponent = ({token, mediaID, authorID, mediaCurrentRating}:MediaComponentProps) => {
    let [rating, setRating] = useState(mediaCurrentRating);
    const [updateRatingMedia, ] = mediaAPI.useUpdateMediaRatingMutation();
    const [newRatingMedia, ] = mediaAPI.usePostMediaRatingMutation();

    const requestRatingData = {
        token: token,
        media: Number(mediaID),
        author: Number(authorID),
    }


    const {data: ratingData, isLoading} = mediaAPI.useGetMediaRatingQuery(requestRatingData, {refetchOnMountOrArgChange:true});
    useEffect(() => {
        if (!isLoading && ratingData) {
            setRating(ratingData[0].rating)
        }
    },[ratingData, rating, isLoading])

    const handleRating = (rate: number) => {
        setRating(rate);
        const newRating:MediaRating = {
            id: (ratingData)?Number(ratingData[0].id):undefined,
            media: Number(mediaID),
            author: Number(authorID),
            rating: rate,
            token: (token)?token:'',
        }
        if (newRating.id) {
            updateRatingMedia(newRating);
        } else {
            newRatingMedia(newRating);
        }
    }

    return (
        <Rating
            onClick={handleRating}
            initialValue={rating}
            transition={true}
            size={24}
        />
    );
};

export default RatingComponent;
