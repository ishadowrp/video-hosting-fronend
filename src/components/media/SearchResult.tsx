import {MenuSection} from "../navigations/MenuSection";
import {useAppSelector} from "../../hooks/redux";
import './media.css';
import {mediaAPI} from "../../services/MediaService";
import GetMedia from "./getMedia";

export const SearchResult:React.FC = () => {

    const {token} = useAppSelector(state => state.userReducer)
    const {searchText} = useAppSelector(state => state.mediaReducer);
    const {data: medias, isLoading} = mediaAPI.useFetchSearchQuery({token: token, searchString: searchText});

    if (isLoading) {
        return (
            <div>
                Searching.....
            </div>
        )
    } else {
        return (
            <MenuSection
                icon="fa-regular fa-pot-food"
                id="media-section"
                title="Search results..."
            >
                {(medias&&medias.length !== 0)?<GetMedia medias = {medias} />
                    :<h4 className='quick-nav-item-label'>No result founds!</h4>}
            </MenuSection>
        );
    }
}