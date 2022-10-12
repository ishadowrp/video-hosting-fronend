import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import App from "../components/App";
import {Pin} from "../components/Pin";
import {Menu} from "../components/navigations/Menu";
import {QuickNav} from "../components/navigations/QuickNav";
import {LoginForm} from "../components/login_registration/LoginFrom";
import LoginRegisterForm from "../components/login_registration/LoginRegisterForm";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Pin">
                <Pin/>
            </ComponentPreview>
            <ComponentPreview path="/Menu">
                <Menu/>
            </ComponentPreview>
            <ComponentPreview path="/QuickNav">
                <QuickNav/>
            </ComponentPreview>
            <ComponentPreview path="/LoginForm">
                <LoginForm/>
            </ComponentPreview>
            <ComponentPreview path="/LoginRegisterForm">
                <LoginRegisterForm/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;