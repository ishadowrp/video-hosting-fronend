import React, {useState} from 'react';
import {authAPI} from "../services/AuthService";
import {useAppDispatch} from "../hooks/redux";
import {AuthLogin} from "../types/IAuth";
import {UserStatus} from "../types/types";
import {userSlice} from "../store/reducers/UserSlice";
import {appSlice} from "../store/reducers/AppSlice";


export function LoginForm() {

    const [loginUser, {data, error}] = authAPI.useLoginUserMutation();

    let [logUsername, setUsername] = useState<string>('');
    let [logPassword, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();

    const {setToken} = userSlice.actions;
    const {setUserDetails} = userSlice.actions;
    const {setStatus} = appSlice.actions;

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
        dispatch(setStatus(UserStatus.LoggedOut));
    }

    if (data) {
        dispatch(setToken(data.key));
        dispatch(setUserDetails({username: logUsername}))
        dispatch(setStatus(UserStatus.LoggedIn));
    }

    let errorMessage = '';

    if (error) {
        // @ts-ignore
        errorMessage = error.data.non_field_errors[0];
    }

    return (
        <form className='form-login' method='post'>
            <div className="user-box">
                <input type="text" name="username" value={logUsername} onChange={handleOnChangeUsername}/>
                <label>Username</label>
            </div>
            <div className="user-box">
                <input type="password" name="password" value={logPassword} onChange={handleOnChangePassword}/>
                <label>Password</label>
            </div>

            <div className="error-box">
                {errorMessage}
            </div>
            <div className='buttons'>
                <a href="#" className='btn-log' onClick={handleOnClickLogIn}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Log in
                </a>
                <a href="#" className='btn-log' onClick={handleOnClickCancel}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Cancel
                </a>
            </div>
        </form>
    )
}