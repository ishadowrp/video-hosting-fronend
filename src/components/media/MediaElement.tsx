import {useAppSelector} from "../../hooks/redux";
import {mediaAPI} from "../../services/MediaService";
import {useParams} from "react-router-dom";
import {ChatWindow} from "../chats/ChatWindow";
import RatingComponent from "./RatingComponent";

export const MediaElement:React.FC = () => {
    let params = useParams();

    const {token, details} = useAppSelector(state => state.userReducer)
    const {data: media, isLoading} = mediaAPI.useGetMediaQuery(
        {
            token: (token)?token:'',
            id: (params.mediaId)?params.mediaId:'',
        }
    );

    if (isLoading) {
        return (
            <div className='movie-card'>
                <div>Loading...</div>
            </div>
        )
    } else {
        return(
            <div className='movie-card'>
                <h2>{media && media.title}</h2>
                <video controls width="100%" className="movie-card-unit background-image">
                    <source src={media?media.media:''} type="video/mp4" className='restaurant-card-content-items'/>
                </video>
                <div className="movie-card-content">
                    <div className="movie-card-numbers">
                        <span className="movie-card-desc">Views: {media && media.views_count}</span>
                        <RatingComponent token = {token?token:''} mediaID = {media && media.id} authorID = {(details && details.pk)?details.pk:0} mediaCurrentRating={(media && media.current_rating)?media.current_rating:0}/>
                    </div>
                </div>
                <div className="movie-card-description">
                    {media && media.description && media.description}
                </div>
                <ChatWindow media={(params.mediaId)?Number(params.mediaId):0} />
            </div>
        )
    }
}