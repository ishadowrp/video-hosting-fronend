import React, {useState} from 'react';
import searchButton from '../../img/search-button.svg';
import {Link} from "react-router-dom";
import {mediaAPI} from "../../services/MediaService";
import {useAppSelector} from "../../hooks/redux";

const SearchForm: React.FC = () => {

    const {token} = useAppSelector(state => state.userReducer)
    const [searchText, setSearchText] = useState('search');
    const {data: medias} = mediaAPI.useFetchSearchQuery({token: token, searchString: searchText});

    const handleOnChangeSearchText = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }
    const handleOnClickSearch = () => {

    }

    return (
        <React.Fragment>
            <div className="search-block">
                <input id='search-media' type="search" value={searchText} onChange={handleOnChangeSearchText} className='quick-nav-item clear-button search-input'></input>
            </div>
           <div className="quick-nav-item clear-button">
                <Link to = 'search-media' className="quick-nav-item-label" onClick={handleOnClickSearch}><img src={searchButton} alt='search' height='15px' width='15px'/></Link>
            </div>
        </React.Fragment>
    );
}

export default SearchForm;