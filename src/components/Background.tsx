import React from "react";
import {UserStatus} from "../types/types";
import {AppContext} from "../types/constants";

export const Background: React.FC = () => {
    const { userStatus, setUserStatusTo } = React.useContext(AppContext);

    const handleOnClick = (): void => {
        if (userStatus === UserStatus.LoggedOut) {
            setUserStatusTo(UserStatus.LoggingIn);
        }
    };

    return (
        <div id="app-background" onClick={handleOnClick}>
            <div id="app-background-image" className="background-image" />
        </div>
    );
};
