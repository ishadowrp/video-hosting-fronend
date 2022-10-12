import React from "react";
import {IUserStatusButton} from "../../types/types";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {appSlice} from "../../store/reducers/AppSlice";

export const UserStatusButton: React.FC<IUserStatusButton> = (
    props: IUserStatusButton
) => {
    const {status} = useAppSelector(state => state.appReducer)
    const dispatch = useAppDispatch();
    const {setStatus} = appSlice.actions;

    const handleOnClick = (): void => {
        console.log(props.userStatus)
        dispatch(setStatus(props.userStatus));
    };

    return (
        <button
            id={props.id}
            className="user-status-button clear-button"
            disabled={status === props.userStatus}
            type="button"
            onClick={handleOnClick}
        >
            <i className={props.icon} />
        </button>
    );
};
