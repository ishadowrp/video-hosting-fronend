import {MenuSection} from "../navigations/MenuSection";
import {useAppSelector} from "../../hooks/redux";
import {mediaAPI} from "../../services/MediaService";
import './media.css';
import GetMedia from "./getMedia";

export const MostPopular:React.FC = () => {

    const {token} = useAppSelector(state => state.userReducer);
    const {data: medias, isLoading} = mediaAPI.useFetchMostPopularQuery(token?token:'');

    if (isLoading) {
        return (
            <div>Loading.....</div>
        )
    } else {
        return (
            <MenuSection
                icon="fa-regular fa-pot-food"
                id="media-section"
                title="Most popular videos..."
            >
                {medias?<GetMedia medias = {medias} />:""}
            </MenuSection>
        );
    }
}