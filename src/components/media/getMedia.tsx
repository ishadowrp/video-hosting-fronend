import React from 'react';
import {MediasProps, MediaUnit} from "../../types/IMedia";
import {Media} from "./Media";

const GetMedia = (props: MediasProps): JSX.Element => {
    return (
        <div className="movie-cards">
            {props.medias && props.medias.map((media:MediaUnit) =>
                <Media key={media.id} media={media}/>)}
        </div>
    )
}

export default GetMedia;
