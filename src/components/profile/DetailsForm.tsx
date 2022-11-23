import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {profileAPI} from "../../services/ProfileService";
import {userSlice} from "../../store/reducers/UserSlice";
import {UserDetails} from "../../types/IAuth";
import AvatarComponent from "./AvatarComp";
import {Link} from "react-router-dom";

const DetailsForm = () => {

    const {token, details} = useAppSelector(state => state.userReducer);
    let requestProfile = {
        'token': token?token:'',
        'id': details?String(details.pk):'',
    }
    const {data: extDetails, isLoading} = profileAPI.useUserProfileQuery(requestProfile);
    const [usrUsername, setUsername] = useState<string>(details?details.username:'')
    const [usrEmail, setEmail] = useState<string|undefined>(details?details.email:'')
    const [usrFirstName, setFirstName] = useState<string|undefined>(details?details.first_name:'')
    const [usrLastName, setLastName] = useState<string|undefined>(details?details.last_name:'')
    const [usrPhone, setPhone] = useState<string|undefined>('')
    const [usrPin, setPin] = useState<string|undefined>('')
    const [verifiedPhone, setVerifiedPhone] = useState<boolean|undefined>(false);

    const dispatch = useAppDispatch();
    const {setUserDetails} = userSlice.actions;

    useEffect(() => {
        const userDetails:UserDetails = {
            username: usrUsername,
            pk: details.pk,
            email: usrEmail,
            first_name: usrFirstName,
            last_name: usrLastName,
        }
        dispatch(setUserDetails(userDetails));
    }, [usrUsername, usrEmail, usrFirstName, usrLastName]);

    useEffect(() => {
        if (!isLoading) {
            setPhone(extDetails?extDetails.telephone:'')
            setVerifiedPhone(extDetails?extDetails.telephone_verified:false)
        }
    }, [details, isLoading, extDetails]);

    const handleOnChangeUsrUsername = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handleOnChangeUsrEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleOnChangeUsrFirstName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }

    const handleOnChangeUsrLastName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }

    const handleOnChangeUsrPhone = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    }

    const handleOnChangeUsrPin = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPin(e.target.value);
    }

    const handleOnClickUpdateDetails = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


    }

    return (
        <div className = 'app-profile-details-wrapper'>
            <AvatarComponent />
            <form className='app-profile-info'>
                <div className="app-profile-content">
                    <div className="details-input-block">
                        <label className='details-label'>Username</label>
                        <input type="text" className='quick-nav-item clear-button new-media-input' name="username" value={usrUsername} onChange={handleOnChangeUsrUsername}/>
                    </div>
                    <div className="details-input-block">
                        <label className='details-label'>e-mail</label>
                        <input type="email" className='quick-nav-item clear-button new-media-input' name="email" value={usrEmail} onChange={handleOnChangeUsrEmail}/>
                    </div>
                </div>
                <div className="app-profile-content">
                    <div className="details-input-block">
                        <label className='details-label'>First name</label>
                        <input type="text" className='quick-nav-item clear-button new-media-input' name="first_name" value={usrFirstName} onChange={handleOnChangeUsrFirstName}/>
                    </div>
                    <div className="details-input-block">
                        <label className='details-label'>Last name</label>
                        <input type="text" className='quick-nav-item clear-button new-media-input' name="last_name" value={usrLastName} onChange={handleOnChangeUsrLastName}/>
                    </div>
                </div>
                <div className='app-profile-content'>
                    <div className="details-input-block">
                        <label className='details-label'>Phone</label>
                        <input type="text" className='quick-nav-item clear-button new-media-input' name="telephone" value={usrPhone} onChange={handleOnChangeUsrPhone}/>
                    </div>
                    {verifiedPhone?
                        '':
                        <div className="details-input-block">
                            <div id='pin-phone-block' className="details-input-block">
                                <label className='details-label'>Pin</label>
                                <input type="text" className='quick-nav-item clear-button new-media-input pin' name="telephone" value={usrPin} onChange={handleOnChangeUsrPin}/>
                            </div>
                            <div className='nav-bar verify-phone'>
                                <button className='quick-nav-item clear-button quick-nav-item-label'>Verify phone</button>
                            </div>
                        </div>
                    }
                </div>
                <div className='nav-bar app-details-buttons'>
                    <button className='quick-nav-item clear-button quick-nav-item-label' onClick = {handleOnClickUpdateDetails}>Update</button>
                    <Link to = 'change-password' className='quick-nav-item clear-button quick-nav-item-label'>Change password</Link>
                    <Link to = 'profile' className='quick-nav-item clear-button quick-nav-item-label'>Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default DetailsForm;
