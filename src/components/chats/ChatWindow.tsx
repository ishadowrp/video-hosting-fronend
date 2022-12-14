import React, {useCallback, useEffect, useState} from 'react';
import {ChatProps} from "../../types/IChats";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useAppSelector} from "../../hooks/redux";
import './chat.css';
import {ChatHistory} from "./ChatHistory";
import {mediaAPI} from "../../services/MediaService";
import {webSocketUrl} from "../../types/constants";

export function ChatWindow(props: ChatProps) {

    const {token} = useAppSelector(state => state.userReducer)
    const {data: comments, isLoading} = mediaAPI.useGetCommentsByMediaQuery({token:token?token:'', media:String(props.media)});
    const socketUrl = webSocketUrl+'/ws/media/'+props.media+'/?token='+token;
    const [messageHistory, setMessageHistory] = useState([{
            created: '',
            message: '',
            type: '',
            current_rating: 0,
            userID: '',
            username: ''}]
    );

    useEffect(() => {
        setMessageHistory(comments?comments.map(comment => ({
                created: comment.date_posted,
                message: comment.content,
                type: '',
                current_rating: comment.current_rating,
                userID: comment.author,
                username: comment.username
            })):[{
                created: '',
                message: '',
                type: '',
                current_rating: 0,
                userID: '',
                username: ''}]
        )
    }, [comments, isLoading]);

    let [newMessage, setNewMessage] = useState('');

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            setMessageHistory((prev:any) => prev.concat(lastJsonMessage));
            setNewMessage('');
        }
    }, [lastJsonMessage, setMessageHistory]);

    const handleOnChangeNewMessage = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    }

    const handleClickSendMessage = useCallback(() => sendJsonMessage({
            type_chat: 'comment',
            message: newMessage}
        ),[newMessage, sendJsonMessage]);

    return (
        <div className='chat-wrapper'>
            <h2 className="chat-h2">Comments</h2>
            <div className='nav-bar'>
                <input type='text' value={newMessage} className='input-message' onChange={handleOnChangeNewMessage}></input>
                    <button
                        onClick={handleClickSendMessage}
                        disabled={readyState !== ReadyState.OPEN}
                        className='quick-nav-item clear-button quick-nav-item-label'
                    >
                        Send comment
                    </button>
            </div>
            <div className='chat-history-box'>
                {messageHistory && messageHistory.map((chat_props, idx) => (
                    <ChatHistory key={idx} messageProps={chat_props} />
                ))}
            </div>
        </div>
    );
}