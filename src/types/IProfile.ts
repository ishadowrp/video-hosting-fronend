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