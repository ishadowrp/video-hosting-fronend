import React, {useState} from 'react';
import {authAPI} from "../services/AuthService";
import {useAppDispatch} from "../hooks/redux";
import {userSlice} from "../store/reducers/UserSlice";
import {appSlice} from "../store/reducers/AppSlice";
import {UserStatus} from "../types/types";
import {AuthReg} from "../types/IAuth";

export function RegistrationFrom() {

    let [regUsername, setRegUsername] = useState<string>('');
    let [regEmail, setRegEmail] = useState<string>('');
    let [regPassword1, setRegPassword1] = useState<string>('');
    let [regPassword2, setRegPassword2] = useState<string>('');

    const [registerUser, {data, error}] = authAPI.useRegistrationUserMutation();

    const dispatch = useAppDispatch();

    const {setToken} = userSlice.actions;
    const {setUserDetails} = userSlice.actions;

    const {setStatus} = appSlice.actions;

    const handleOnChangeRegUsername = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRegUsername(e.target.value)
    }

    const handleOnChangeRegEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRegEmail(e.target.value)
    }

    const handleOnChangeRegPassword1 = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRegPassword1(e.target.value)
    }

    const handleOnChangeRegPassword2 = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRegPassword2(e.target.value)
    }

    const handleOnClickRegistration = async () => {
        const authData: AuthReg = {
            username: regUsername,
            email: regEmail,
            password1: regPassword1,
            password2: regPassword2
        }
        await registerUser(authData);
    }

    const handleOnClickCancel = () => {
        dispatch(setStatus(UserStatus.LoggedOut));
    }

    if (data) {
        dispatch(setToken(data.key));
        dispatch(setUserDetails({username: regUsername}))
        dispatch(setStatus(UserStatus.LoggedIn));
    }

    let errorMessage = '';

    if (error) {
        // @ts-ignore
        errorMessage = error.data.details;
    }

    return (
        <form className='form-login' method='post'>
            <div className="user-box">
                <input type="text" name="username" value={regUsername} onChange={handleOnChangeRegUsername}/>
                <label>Username</label>
            </div>
            <div className="user-box">
                <input type="email" name="email" value={regEmail} onChange={handleOnChangeRegEmail}/>
                <label>e-mail</label>
            </div>
            <div className="user-box">
                <input type="password" name="password1" value={regPassword1} onChange={handleOnChangeRegPassword1}/>
                <label>Password</label>
            </div>
            <div className="user-box">
                <input type="password" name="password2" value={regPassword2} onChange={handleOnChangeRegPassword2}/>
                <label>Password</label>
            </div>
            <div className="error-box">
                {errorMessage}
            </div>
            <div className='buttons'>
                <a href="#" className='btn-log' onClick={handleOnClickRegistration}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Register
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