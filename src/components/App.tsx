import React from 'react';
import '../css/App.css';
import {UserStatus,} from '../types/types';
import {AppContext} from "../types/constants";
import {Info} from "./Info";
import {Pin} from "./Pin";
import {Menu} from "./Menu";
import {Background} from "./Background";
import {UserStatusButton} from "./UserStatusButton";
import {Loading} from "./Loading";
import LoginForm from "./LoginForm";


const App: React.FC = () => {
  const [userStatus, setUserStatusTo] = React.useState<UserStatus>(
      UserStatus.LoggedOut
  );

  const getStatusClass = (): string => {
    return userStatus.replace(/\s+/g, "-").toLowerCase();
  };

  return (
      <AppContext.Provider value={{ userStatus, setUserStatusTo }}>
        <div id="app" className={getStatusClass()}>
          <Info id="app-info" />
          <LoginForm />
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
      </AppContext.Provider>
  );
};

export default App;
