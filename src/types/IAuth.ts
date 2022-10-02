export interface AuthReg {
    username?: string,
    email?: string,
    password1: string,
    password2: string,
}

export interface PasswordChange {
    auth_data: AuthReg,
    token: string,
}

export interface AuthLogin {
    username?: string,
    email?: string,
    password?: string,
}

export interface UserDetails{
    id?: string,
    username: string,
    email?: string,
    first_name?: string,
    last_name?: string,
}

export interface AuthUserDetails {
    details: UserDetails,
    token?: string,
}

export interface AuthDetail {
    detail: string
}

export interface AuthLogSuccess{
    key: string
}