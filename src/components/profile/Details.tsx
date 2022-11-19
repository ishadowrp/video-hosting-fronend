import React, {useEffect, useState} from 'react';
import {MenuSection} from "../navigations/MenuSection";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {userSlice} from "../../store/reducers/UserSlice";
import personImg from '../../img/person.svg';
import uploadImg from '../../img/upload.svg';
import trashImg from '../../img/trash-fill.svg';
import './profile.css';
import {profileAPI} from "../../services/ProfileService";


export const Details:React.FC = () => {

    const {token, details} = useAppSelector(state => state.userReducer);
    let requestProfile = {
        'token': (token&&details)?token:'',
        'id': (token&&details)?String(details.pk):'',
    }
    const {data: extDetails, isLoading} = profileAPI.useUserProfileQuery(requestProfile);
    const [usrUsername, setUsername] = useState<string>(details?details.username:'')
    const [usrEmail, setEmail] = useState<string|undefined>(details?details.email:'')
    const [usrFirstName, setFirstName] = useState<string|undefined>(details?details.first_name:'')
    const [usrLastName, setLastName] = useState<string|undefined>(details?details.last_name:'')
    const [usrPhone, setPhone] = useState<string|undefined>('')
    const [usrPin, setPin] = useState<string|undefined>('')
    const [avatarUrl, setAvatarUrl] = useState<string|undefined>(personImg);
    const [verifiedPhone, setVerifiedPhone] = useState<boolean|undefined>(false);

    const dispatch = useAppDispatch();
    const {setUserDetails} = userSlice.actions;

    useEffect(() => {
        if (!isLoading) {
            setAvatarUrl(extDetails?extDetails.avatar:personImg);
            setPhone(extDetails?extDetails.telephone:'')
            setVerifiedPhone(extDetails?extDetails.telephone_verified:false)
        }
    }, [details, isLoading]);

    console.log(verifiedPhone)
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


    const getDetailsInfo = () :JSX.Element => {
        return (
            <div className = 'app-profile-details-wrapper'>
                <div className = 'app-profile-details'>
                    <img src={avatarUrl} alt="avatar" width='200px' height='200px' className = 'app-profile-avatar'/>
                    <div className='nav-bar app-profile-avatar-buttons'>
                        <button className='quick-nav-item clear-button quick-nav-item-label img-buttons'><img src ={uploadImg} alt='upload' /></button>
                        <button className='quick-nav-item clear-button quick-nav-item-label img-buttons'><img src ={trashImg} alt='delete' /></button>
                    </div>
                </div>
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
                        <button className='quick-nav-item clear-button quick-nav-item-label'>Update</button>
                        <button className='quick-nav-item clear-button quick-nav-item-label'>Change password</button>
                        <button className='quick-nav-item clear-button quick-nav-item-label'>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <MenuSection
            icon="fa-regular fa-pot-food"
            id="restaurants-section"
            title="Yours profile details"
        >
            {getDetailsInfo()}
        </MenuSection>
    );
}