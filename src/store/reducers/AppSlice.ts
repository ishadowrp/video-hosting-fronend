import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FormStatusType, UserStatus} from "../../types/types";


const initialState:FormStatusType  = {
    status: UserStatus.LoggedOut,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setStatus(state, action:PayloadAction<UserStatus>) {
            state.status = action.payload;
        },
    },
})

export default appSlice.reducer;