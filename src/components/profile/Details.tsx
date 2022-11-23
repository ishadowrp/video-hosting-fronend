import React from 'react';
import {MenuSection} from "../navigations/MenuSection";
import './profile.css';
import DetailsForm from "./DetailsForm";


export const Details:React.FC = () => {

    return (
        <MenuSection
            icon="fa-regular fa-pot-food"
            id="restaurants-section"
            title="Yours profile details"
        >
            <DetailsForm />
        </MenuSection>
    );
}