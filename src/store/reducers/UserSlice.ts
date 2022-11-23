import {AuthUserDetails, UserDetails} from "../../types/IAuth";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: AuthUserDetails = {
    details: {
        username: 'anonymous',
        pk: 0,
        email: '',
        first_name: '',
        last_name: '',
    },
    token: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken(state, action:PayloadAction<string>) {
            state.token = action.payload;
        },
        setUserDetails(state, action:PayloadAction<UserDetails>) {
            state.details = action.payload;
        }
    },
})

export default userSlice.reducer;