import React from "react";
import {IUserStatusButton} from "../../types/types";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {appSlice} from "../../store/reducers/AppSlice";
import {userSlice} from "../../store/reducers/UserSlice";

export const UserStatusButton: React.FC<IUserStatusButton> = (props: IUserStatusButton) => {
    const {status} = useAppSelector(state => state.appReducer)
    const dispatch = useAppDispatch();
    const {setStatus} = appSlice.actions;
    const {setToken} = userSlice.actions;
    const {setUserDetails} = userSlice.actions;

    const handleOnClick = (): void => {
        dispatch(setStatus(props.userStatus));
        dispatch(setToken(''));
        dispatch(setUserDetails({
            username:'',
            pk: 0,
            first_name: '',
            last_name: '',
            email: '',
        }))
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
