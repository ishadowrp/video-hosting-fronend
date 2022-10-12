import {MenuSection} from "../navigations/MenuSection";
import {useAppSelector} from "../../hooks/redux";
import {mediaAPI} from "../../services/MediaService";
import {MediaUnit} from "../../types/IMedia";
import {Media} from "./Media";
import './media.css';

export const Last10:React.FC = () => {

    const {token} = useAppSelector(state => state.userReducer);
    const {data: medias} = mediaAPI.useFetchLast10Query(token?token:'');

    const getMedia = (): JSX.Element => {
        return (
            <div className="movie-cards">
                {medias && medias.slice(0,9).map((media:MediaUnit) =>
                    <Media key={media.id} media={media}/>)}
            </div>
        )
    }


    return (
        <MenuSection
            icon="fa-regular fa-pot-food"
            id="media-section"
            title="Last 10..."
        >
            {getMedia()}
        </MenuSection>
    );
}