import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import App from "../components/App";
import {Pin} from "../components/Pin";
import {Menu} from "../components/Menu";
import {QuickNav} from "../components/QuickNav";

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
        </Previews>
    );
};

export default ComponentPreviews;