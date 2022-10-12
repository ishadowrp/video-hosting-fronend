import React from 'react';
import {ChatMessageProps} from "../../types/IChats";

export function ChatHistory (props:ChatMessageProps) {
    return(
        <div className='chat-message-unit'>
            <div className='chat-message-title'>
                <span className='chat-message-date'>Created:{props.messageProps.created}</span>
                <span className='chat-message-username'>by {props.messageProps.username}</span>
            </div>
            <p className='chat-message-text'>{props.messageProps.message}</p>
        </div>
    )
}