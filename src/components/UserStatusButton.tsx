import React from "react";
import {IUserStatusButton} from "../types/types";
import {AppContext} from "../types/constants";

export const UserStatusButton: React.FC<IUserStatusButton> = (
    props: IUserStatusButton
) => {
    const { userStatus, setUserStatusTo } = React.useContext(AppContext);

    const handleOnClick = (): void => {
        setUserStatusTo(props.userStatus);
    };

    return (
        <button
            id={props.id}
            className="user-status-button clear-button"
            disabled={userStatus === props.userStatus}
            type="button"
            onClick={handleOnClick}
        >
            <i className={props.icon} />
        </button>
    );
};
