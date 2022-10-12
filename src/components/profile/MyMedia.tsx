import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import {mediaAPI} from "../../services/MediaService";
import {MediaUnit} from "../../types/IMedia";
import {MenuSection} from "../navigations/MenuSection";
import {MediaByAuthor} from "./MediaByAuthor";
import {Link} from "react-router-dom";

export const MyMedia:React.FC = () => {

    const {token, details} = useAppSelector(state => state.userReducer);
    const {data: medias} = mediaAPI.useGetMediaByAuthorQuery({token: token, author: String(details.pk)});

    const getMedia = (): JSX.Element => {
        return (
            <div className="movie-cards">
                {medias && medias.map((media:MediaUnit) =>
                    <MediaByAuthor key={media.id} media={media}/>)}
            </div>
        )
    }


    return (
        <React.Fragment>
            <div className="nav-bar add-new-media-box">
                <div className='quick-nav-item clear-button'>
                    <Link to='add-new-media' className='quick-nav-item-label'>Add new media</Link>
                </div>
            </div>
            <MenuSection
                icon="fa-regular fa-pot-food"
                id="media-section"
                title="My media"
            >
                {medias&&medias.length ===0?<h4 className='quick-nav-item-label'>No result founds!</h4>:getMedia()}
            </MenuSection>

        </React.Fragment>
    );
}