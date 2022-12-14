import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {mediaAPI} from "../services/MediaService";
import {authAPI} from "../services/AuthService";
import userReducer from './reducers/UserSlice';
import appReducer from './reducers/AppSlice';
import profileReducer from './reducers/ProfileSlice';
import rateReducer from './reducers/RateSlice';
import mediaReducer from './reducers/MediaSlice';
import {profileAPI} from "../services/ProfileService";

const rootReducer = combineReducers({
    userReducer,
    appReducer,
    rateReducer,
    mediaReducer,
    profileReducer,
    [mediaAPI.reducerPath]: mediaAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(mediaAPI.middleware, authAPI.middleware, profileAPI.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']