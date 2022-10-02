import React, {useState} from 'react';
import '../css/Login.css'
import {authAPI} from "../services/AuthService";
import {AuthLogin} from "../types/IAuth";
import {useAppDispatch} from "../hooks/redux";
import {userSlice} from "../store/reducers/UserSlice";

function LoginForm() {

    let [logUsername, setUsername] = useState<string>('');
    let [logPassword, setPassword] = useState<string>('');

    const [loginUser, {data, error}] = authAPI.useLoginUserMutation();
    const {setToken} = userSlice.actions;
    const {setUserDetails} = userSlice.actions;

    const dispatch = useAppDispatch();


    const handleOnChangeUsername = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleOnChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleOnClickLogIn = async () => {
        const authData:AuthLogin = {
            username: logUsername,
            password: logPassword
        }
        await loginUser(authData);
    }

    const handleOnClickCancel = () => {
    }

    if (data) {
        dispatch(setToken(data.key));
        dispatch(setUserDetails({username: logUsername}))
    }

    if (error) {
        console.log(error);
    }

    return (
        <div id="app-pin-wrapper">
            <div className="login-box">
                <ul className="choice-reg-box">
                    <li className='choice-item'>
                        <h2>Sign In</h2>
                    </li>
                    <li className='choice-item'>
                        <h2>Sign Up</h2>
                    </li>
                </ul>
                <form method='post'>
                    <div className="user-box">
                        <input type="text" name="username" value={logUsername} onChange={handleOnChangeUsername}/>
                            <label>Username</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" value={logPassword} onChange={handleOnChangePassword}/>
                            <label>Password</label>
                    </div>
                    <div className='buttons'>
                        <a href="#" onClick={handleOnClickLogIn}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Log in
                        </a>
                        <a href="#" onClick={handleOnClickCancel}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm