import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {MenuSection} from "../navigations/MenuSection";

export const Profile: React.FC = () => {

    return (
        <MenuSection
            icon="fa-regular fa-pot-food"
            id="restaurants-section"
            title="Get yours information..."
        >
            <div id='profile-page'>
                <div id='app-profile-quick-nav' className='nav-bar'>
                    <div className="quick-nav-item clear-button">
                        <Link to='details' className="quick-nav-item-label">Details</Link>
                    </div>
                    <div className="quick-nav-item clear-button">
                        <Link to='my_media' className="quick-nav-item-label">My media</Link>
                    </div>
                    <div className="quick-nav-item clear-button">
                        <Link to='private_chat' className="quick-nav-item-label">Chats</Link>
                    </div>
                </div>
                <Outlet />
            </div>
        </MenuSection>
    )
}

