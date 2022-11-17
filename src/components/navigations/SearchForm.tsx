import React, {useState} from 'react';
import searchButton from '../../img/search-button.svg';
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {mediaSlice} from "../../store/reducers/MediaSlice";


const SearchForm: React.FC = () => {

    const [searchText, setSearchTextField] = useState('search');

    const dispatch = useAppDispatch();
    const {setSearchString} = mediaSlice.actions;

    const handleOnChangeSearchText = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchTextField(e.target.value);
        dispatch(setSearchString(searchText))
    }

    return (
        <React.Fragment>
            <div className="search-block">
                <input id='search-media' type="search" value={searchText} onChange={handleOnChangeSearchText} className='quick-nav-item clear-button search-input'></input>
            </div>
           <div className="quick-nav-item clear-button">
                <Link to = 'searchResult' className="quick-nav-item-label"><img src={searchButton} alt='search' height='15px' width='15px'/></Link>
            </div>
        </React.Fragment>
    );
}

export default SearchForm;