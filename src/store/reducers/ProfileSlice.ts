import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserProfile} from "../../types/IProfile";


const initialState: UserProfile = {
    username: 'anonymous',
    id: '',
    telephone: '',
    avatar: '',
    token: '',
    telephone_verified: false
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileDetails(state, action:PayloadAction<UserProfile>) {
            state = action.payload;
        }
    },
})

export default profileSlice.reducer;