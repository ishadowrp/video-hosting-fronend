import React, {useState} from 'react';
import {MenuSection} from "../navigations/MenuSection";
import {authAPI} from "../../services/AuthService";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {userSlice} from "../../store/reducers/UserSlice";
import personImg from '../../img/person.svg';
import uploadImg from '../../img/upload.svg';
import trashImg from '../../img/trash-fill.svg';
import './profile.css';


export const Details:React.FC = () => {

    const {token} = useAppSelector(state => state.userReducer);
    const {data: details} = authAPI.useGetUserQuery(token?token:'');
    const [usrUsername, setUsername] = useState<string>(details?details.username:'')
    const [usrEmail, setEmail] = useState<string|undefined>(details?details.email:'')
    const [usrFirstName, setFirstName] = useState<string|undefined>(details?details.first_name:'')
    const [usrLastName, setLastName] = useState<string|undefined>(details?details.last_name:'')
    const [usrPhone, setPhone] = useState<string|undefined>(details?details.telephone:'')

    const dispatch = useAppDispatch();
    const {setUserDetails} = userSlice.actions;

    let avatarUrl = '';

    if (details) {
        if (details.avatarUrl) {
            avatarUrl = details.avatarUrl;
        } else {
            avatarUrl = personImg;
        }
        dispatch(setUserDetails(details))
    } else {
        avatarUrl = personImg;
    }

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
                        <div className="details-input-block">
                            <div id='pin-phone-block' className="details-input-block">
                                <label className='details-label'>Pin</label>
                                <input type="text" className='quick-nav-item clear-button new-media-input pin' name="telephone" value={usrPhone} onChange={handleOnChangeUsrPhone}/>
                            </div>
                            <div className='nav-bar verify-phone'>
                                <button className='quick-nav-item clear-button quick-nav-item-label'>Verify phone</button>
                            </div>
                        </div>
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