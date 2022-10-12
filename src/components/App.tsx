import React from 'react';
import '../css/App.css';
import {UserStatus,} from '../types/types';
import {Info} from "./service/Info";
import {Menu} from "./navigations/Menu";
import {Background} from "./tools/Background";
import {UserStatusButton} from "./navigations/UserStatusButton";
import {Loading} from "./service/Loading";
import LoginRegisterForm from "./login_registration/LoginRegisterForm";
import {useAppSelector} from "../hooks/redux";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
            <ToastContainer />
        </div>
    );
};

export default App;
