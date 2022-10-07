import React from "react";
import {UserStatus} from "../types/types";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {appSlice} from "../store/reducers/AppSlice";

export const Background: React.FC = () => {
    const {status} = useAppSelector(state => state.appReducer)
    const dispatch = useAppDispatch();
    const {setStatus} = appSlice.actions;

    const handleOnClick = (): void => {
        if (status === UserStatus.LoggedOut) {
            dispatch(setStatus(UserStatus.LoggedOut));
        }
    };

    return (
        <div id="app-background" onClick={handleOnClick}>
            <div id="app-background-image" className="background-image" />
        </div>
    );
};
