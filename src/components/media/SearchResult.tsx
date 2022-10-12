import {MenuSection} from "../navigations/MenuSection";
import {useAppSelector} from "../../hooks/redux";
import {MediaUnit} from "../../types/IMedia";
import {Media} from "./Media";
import './media.css';
import {mediaAPI} from "../../services/MediaService";

export const SearchResult:React.FC = () => {

    const {token} = useAppSelector(state => state.userReducer)
    const {searchText} = useAppSelector(state => state.mediaReducer);
    const {data: medias} = mediaAPI.useFetchSearchQuery({token: token, searchString: searchText});

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
            title="Search results..."
        >
            {medias&&medias.length ===0?<h4 className='quick-nav-item-label'>No result founds!</h4>:getMedia()}
        </MenuSection>
    );
}