import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {mediaAPI} from "../services/MediaService";
import {authAPI} from "../services/AuthService";

const rootReducer = combineReducers({
    [mediaAPI.reducerPath]: mediaAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(mediaAPI.middleware, authAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']