import React, {useEffect, useState} from 'react';
import uploadImg from "../../img/upload.svg";
import trashImg from "../../img/trash-fill.svg";
import personImg from "../../img/person.svg";
import {UploadFileType} from "../../types/IProfile";
import {profileAPI} from "../../services/ProfileService";
import {useAppSelector} from "../../hooks/redux";
import axios from "axios";
import {backendURL} from "../../types/constants";

const AvatarComponent = () => {
    const [image, setImage] = useState<UploadFileType>();
    const [avatarUrl, setAvatarUrl] = useState(personImg)
    const {token, details} = useAppSelector(state => state.userReducer);
    const [deleteAvatar, ] = profileAPI.useDeleteAvatarMutation();
    const requestAvatar = {
        'token': token?token:'',
        'data': '',
    }
    const {data: avatarData , isLoading} = profileAPI.useGetAvatarQuery(requestAvatar, {refetchOnMountOrArgChange:true});

    useEffect(() => {
        if (!isLoading&&avatarData) {
            setAvatarUrl(backendURL+avatarData.avatar)
        }
    }, [avatarData, isLoading]);

    const handleDeleteImage = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (avatarData&&avatarData.avatar&&token) {
            deleteAvatar(token);
            setAvatarUrl(personImg);
            setImage({
                preview: '',
                raw: ''
            });
        }
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files&&e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))

            if (image&&token) {
                const formData = new FormData();
                formData.append("username", String(details.pk));
                formData.append("avatar", image.raw);
                // uploadAvatar({token: token, data: formData});
                axios.post('http://localhost:8000/api/v1/profiles/image/', formData, {
                    headers: {
                        'authorization': 'Token ' + token,
                        'content-type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res.data);
                }).catch(err => console.log(err))
            }
        }
    };

    return (
        <div className = 'app-profile-details'>
            <label htmlFor="upload-button">
                <img src={avatarUrl} alt="avatar" width='200px' height='200px' className = 'app-profile-avatar'/>
            </label>
            <input
                type="file"
                id="upload-button"

                style={{ display: "none" }}
                onChange={handleChange}
            />
            <div className='nav-bar app-profile-avatar-buttons'>
                {/*<button className='quick-nav-item clear-button quick-nav-item-label img-buttons' onClick={handleUpload}><img src ={uploadImg} alt='upload' /></button>*/}
                <button className='quick-nav-item clear-button quick-nav-item-label img-buttons' onClick={handleDeleteImage}><img src ={trashImg} alt='delete' /></button>
            </div>
        </div>
    );
};

export default AvatarComponent;
