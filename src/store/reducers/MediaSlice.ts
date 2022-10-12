import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MediaUnit, SearchInitialState} from "../../types/IMedia";


const initialState:SearchInitialState = {
    searchText: '',
    searchResult: [{
        id: 0,
        title: '',
        description: '',
        media: '',
        author: 0,
        date_posted: '',
        views_count: 0,
        current_rating: 0
    },]
}

export const mediaSlice = createSlice({
    name: 'searchResult',
    initialState,
    reducers: {
        setSearchResult(state, action:PayloadAction<MediaUnit[]|undefined>) {
            if (action.payload) {
                state.searchResult = action.payload;
            }
        },
        setSearchString(state, action:PayloadAction<string>) {
            state.searchText = action.payload;
        }
    },
})

export default mediaSlice.reducer;