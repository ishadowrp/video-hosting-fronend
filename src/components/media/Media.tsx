import React from "react";
import {MediaFC} from "../../types/IMedia";
import {Link} from "react-router-dom";

export function Media(props:MediaFC) {

    return (
        <Link to={`/media/${props.media.id}`} className='movie-card'>
            <video controls width="100%" className="movie-card-unit background-image">
                <source src={props.media.media} type="video/mp4" className='restaurant-card-content-items'/>
            </video>
            <div className="movie-card-content">
                <div className="movie-card-numbers">
                    <span className="movie-card-desc">Views: {props.media.views_count}</span>
                    <span className="movie-card-desc">Rating: {props.media.current_rating && props.media.current_rating.toFixed (1)}</span>
                </div>
                <div className="movie-card-title">{props.media.title}</div>
            </div>
        </Link>
    )
}