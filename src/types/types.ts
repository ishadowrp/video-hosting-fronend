export enum UserStatus {
    LoggedIn = "Logged In",
    LoggingIn = "Logging In",
    LoggedOut = "Logged Out",
    LogInError = "Log In Error",
    VerifyingLogIn = "Verifying Log In"
}

export enum Default {
    PIN = "1234"
}

export enum WeatherType {
    Cloudy = "Cloudy",
    Rainy = "Rainy",
    Stormy = "Stormy",
    Sunny = "Sunny"
}

export interface IPosition {
    left: number;
    x: number;
}

export interface INumberUtility {
    clamp: (min: number, value: number, max: number) => number;
    rand: (min: number, max: number) => number;
}

export interface ITimeUtility {
    format: (date: Date) => string;
    formatHours: (hours: number) => string;
    formatSegment: (segment: number) => string;
}

export interface ILogInUtility {
    verify: (pin: string) => Promise<boolean>;
}

export interface IScrollableComponentState {
    grabbing: boolean;
    position: IPosition;
}

export interface IScrollableComponentState {
    grabbing: boolean;
    position: IPosition;
}

export interface IScrollableComponentProps {
    children: any;
    className?: string;
    id?: string;
}

export interface IInfoProps {
    id?: string;
}

export interface IPinDigitProps {
    focused: boolean;
    value: string;
}

export interface IMenuSectionProps {
    children: any;
    icon: string;
    id: string;
    scrollable?: boolean;
    title: string;
}

export interface IAppContext {
    userStatus: UserStatus;
    setUserStatusTo: (status: UserStatus) => void;
}

export interface IUserStatusButton {
    icon: string;
    id: string;
    userStatus: UserStatus;
}
