export interface ChatProps {
    media: number
}

export type ChatMessage = {
    created: string,
    message: string,
    type: string,
    userID: string,
    username: string,
    current_rating: number,
}

export type ChatMessageProps = {
    key: number,
    messageProps: ChatMessage
}
