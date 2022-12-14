import React, {useEffect, useState} from "react";
import {ScrollableComponent} from "../tools/ScrollableComponent";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";
import useWebSocket from "react-use-websocket";
import bellIcon from '../../img/notification-bell-white.svg';
import './navigations.css';
import {toast} from "react-toastify";
import SearchForm from "./SearchForm";
import {webSocketUrl} from "../../types/constants";

export const QuickNav: React.FC = () => {

    const {token, details} = useAppSelector(state => state.userReducer)
    let [socketUrl, setSocketUrl] = useState(webSocketUrl+'/ws/notifications/anonymous'+'/?token='+token);

    useEffect(() => {
        if (details) {
            let socketStr = webSocketUrl+'/ws/notifications/'+details.username+'/?token='+token;
            setSocketUrl(socketStr);
        }
    }, [details]);

    const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl);
    const notificationBlock = document.getElementById('notifications-bell')
    const [needBells, setNeedBell] = useState(false);
    const [messageHistory, setMessageHistory] = useState([{
        message: {
            message: '',
            notification_id: 0,
            status: true,
        },
        room_id: details.username,
        type: "chat.message",
        username:''
    }]);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            setMessageHistory((prev:any) => prev.concat(lastJsonMessage));
            setNeedBell(true);
            // @ts-ignore
            toast(lastJsonMessage.message.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, [lastJsonMessage, setMessageHistory]);


    const handleReadNotification = () => {
        messageHistory.map(message => message.message.status = true)
        notificationBlock && notificationBlock.classList.add('block-off');
        setNeedBell(false)
    }

    const getItems = (): JSX.Element => {
            return (
                <React.Fragment>
                    <SearchForm />
                    <div className="quick-nav-item clear-button">
                        <Link to='weather' className="quick-nav-item-label">Weather</Link>
                    </div>
                    <div className="quick-nav-item clear-button">
                        <Link to='last10' className="quick-nav-item-label">Last 10</Link>
                    </div>
                    <div className="quick-nav-item clear-button">
                        <Link to='most_popular' className="quick-nav-item-label">Most popular</Link>
                    </div>
                   <div className="quick-nav-item clear-button">
                        <Link to='profile' className="quick-nav-item-label">Profile</Link>
                    </div>
                    <button className="quick-nav-item clear-button" onClick={handleReadNotification}>
                        <img src={bellIcon} alt = 'notifications-bell'  className="quick-nav-item-label" />
                        <div id='notifications-bell' className={needBells?'notifications-counter-wrapper block-on':'notifications-counter-wrapper block-off'}>
                            <div className="notifications-counter">{messageHistory && messageHistory.filter(message => message.message.status === false).length}</div>
                        </div>
                    </button>
                </React.Fragment>
            );
    };

    return <ScrollableComponent id="quick-nav">{getItems()}</ScrollableComponent>;
};
