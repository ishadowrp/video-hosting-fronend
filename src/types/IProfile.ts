export interface UsernameID {
    id: string,
    token: string,
}

export interface UserProfile {
    id: string,
    username: string,
    telephone: string,
    avatar: string,
    token?: string,
    telephone_verified: boolean,
}

export interface VerificationRequest {
    code: number,
    token: string,
}

export interface AvatarComponentProps {
    avatarUrl: string|undefined
}

export interface UploadFileType {
    preview: string
    raw: any|undefined
}

export interface ImageUploadType {
    token: string,
    data: any|undefined
}

export interface UserAvatar {
    id: string,
    username: string,
    avatar: string,
}