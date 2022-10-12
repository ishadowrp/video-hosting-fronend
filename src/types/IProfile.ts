export interface UsernameID {
    username: string,
    token: string,
}

export interface UserProfile {
    id: string,
    username: string,
    telephone: string,
    avatar: string,
    token?: string,
}

export interface VerificationRequest {
    code: number,
    token: string,
}