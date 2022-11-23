import {MenuSection} from "../navigations/MenuSection";
import {useAppSelector} from "../../hooks/redux";
import {mediaAPI} from "../../services/MediaService";
import './media.css';
import GetMedia from "./getMedia";
import {Loading} from "../service/Loading";

export const Last10:React.FC = () => {

    const {token} = useAppSelector(state => state.userReducer);
    const {data: medias, isLoading} = mediaAPI.useFetchLast10Query(token?token:'');


    return (
        <MenuSection
            icon="fa-regular fa-pot-food"
            id="media-section"
            title="Last 10..."
        >
            {isLoading?
                <Loading />
                :medias?<GetMedia medias = {medias} />:""}
        </MenuSection>
    );
}