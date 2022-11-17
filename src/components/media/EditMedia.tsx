import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import {mediaAPI} from "../../services/MediaService";
import {useParams} from "react-router-dom";

export const EditMedia:React.FC = () => {
    let params = useParams();

    const {token} = useAppSelector(state => state.userReducer)
    const {data: media} = mediaAPI.useGetMediaQuery(
        {
            token: (token)?token:'',
            id: (params.mediaId)?params.mediaId:'',
        }
    );

    return(
        <div className='movie-card'>
            <h2>{media && media.title}</h2>
            <video controls width="100%" className="movie-card-unit background-image">
                <source src={media?media.media:''} type="video/mp4" className='restaurant-card-content-items'/>
            </video>
            <div className="movie-card-description">
                {media && media.description && media.description}
            </div>
        </div>
    )
}