import React, {useState} from 'react';
import '../../css/Login.css'
import {LoginForm} from "./LoginFrom";
import {RegistrationFrom} from "./RegistrationForm";

function LoginRegisterForm() {

    let [signIn, setForm] = useState<boolean>(true);
    const btnSignIn = document.getElementById('btn-signIn');
    const btnSignUp = document.getElementById('btn-signUp');

    const handleOnClickSignIn = () => {
        if (btnSignIn && btnSignUp) {
            btnSignIn.classList.add('btn-form-choice-active');
            btnSignUp.classList.remove('btn-form-choice-active');
        }
        setForm(true)
    }

    const handleOnClickSignUp = () => {
        if (btnSignIn && btnSignUp) {
            btnSignIn.classList.remove('btn-form-choice-active');
            btnSignUp.classList.add('btn-form-choice-active');
        }
        setForm(false)
    }


    return (
        <div id="app-pin-wrapper">
            <div className="login-box">
                <ul className="choice-reg-box">
                    <li className='choice-item'>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <h2><a href="#" className='btn-form-choice btn-form-choice-active' id = 'btn-signIn' onClick={handleOnClickSignIn}>Sign In</a></h2>
                    </li>
                    <li className='choice-item'>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <h2><a href="#" className='btn-form-choice' id = 'btn-signUp' onClick={handleOnClickSignUp}>Sign Up</a></h2>
                    </li>
                </ul>
                {signIn ? <LoginForm /> : <RegistrationFrom />}
            </div>
        </div>
    );
}

export default LoginRegisterForm