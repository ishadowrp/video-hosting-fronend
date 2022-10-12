import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MediaRating} from "../../types/IMedia";


const initialState:MediaRating = {
    media: 0,
    author: 0,
    rating: 0,
}

export const rateSlice = createSlice({
    name: 'rate',
    initialState,
    reducers: {
        setMediaRatingData(state, action:PayloadAction<MediaRating>) {
            state = action.payload;
        },
        setMediaRating(state, action:PayloadAction<number>) {
            state.rating = action.payload;
        }
    },
})

export default rateSlice.reducer;