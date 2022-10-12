import React from "react";
import {UserStatus} from "../../types/types";
import {Info} from "../service/Info";
import {Reminder} from "../service/Reminder";
import {UserStatusButton} from "./UserStatusButton";
import {QuickNav} from "./QuickNav";
import {Outlet} from "react-router-dom";

export const Menu: React.FC = () => {
    return (
        <div id="app-menu">
            <div id="app-menu-content-wrapper">
                <div id="app-menu-content">
                    <div id="app-menu-content-header">
                        <div className="app-menu-content-header-section">
                            <Info id="app-menu-info" />
                            <Reminder />
                        </div>
                        <div className="app-menu-content-header-section">
                            <UserStatusButton
                                icon="fa-solid fa-arrow-right-from-arc"
                                id="sign-out-button"
                                userStatus={UserStatus.LoggedOut}
                            />
                        </div>
                    </div>
                    <QuickNav />
                    <Outlet />
                    {/*<Weather />*/}
                    {/*<Restaurants />*/}
                    {/*<Tools />*/}
                    {/*<Movies />*/}
                </div>
            </div>
        </div>
    );
};
