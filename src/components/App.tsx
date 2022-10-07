import React from 'react';
import '../css/App.css';
import {UserStatus,} from '../types/types';
import {Info} from "./Info";
import {Menu} from "./Menu";
import {Background} from "./Background";
import {UserStatusButton} from "./UserStatusButton";
import {Loading} from "./Loading";
import LoginRegisterForm from "./LoginRegisterForm";
import {useAppSelector} from "../hooks/redux";

const App: React.FC = () => {
    const {status} = useAppSelector(state => state.appReducer)

    const getStatusClass = (): string => {
        return status.replace(/\s+/g, "-").toLowerCase();
    };


    return (
        <div id="app" className={getStatusClass()}>
            <Info id="app-info" />
            <LoginRegisterForm />
            <Menu />
            <Background />
            <div id="sign-in-button-wrapper">
            <UserStatusButton
                icon="fa-solid fa-arrow-right-to-arc"
                id="sign-in-button"
                userStatus={UserStatus.LoggingIn}
            />
            </div>
            <Loading />
        </div>
    );
};

export default App;
