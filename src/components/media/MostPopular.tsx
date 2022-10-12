import {MenuSection} from "../navigations/MenuSection";
import {useAppSelector} from "../../hooks/redux";
import {mediaAPI} from "../../services/MediaService";
import {MediaUnit} from "../../types/IMedia";
import {Media} from "./Media";
import './media.css';

export const MostPopular:React.FC = () => {

    const {token} = useAppSelector(state => state.userReducer);
    const {data: medias} = mediaAPI.useFetchMostPopularQuery(token?token:'');

    const getMedia = (): JSX.Element => {
        return (
            <div className="movie-cards">
                {medias && medias.map((media:MediaUnit) =>
                    <Media key={media.id} media={media}/>)}
            </div>
        )
    }


    return (
        <MenuSection
            icon="fa-regular fa-pot-food"
            id="media-section"
            title="Most popular videos..."
        >
            {getMedia()}
        </MenuSection>
    );
}